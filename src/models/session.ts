
import { coerceToBase64Url } from '@/utils/webauthn' 

import { RestfulAddress } from '@/utils/config'
import axios from 'axios'
import { CommonReslut } from './common-result'

export class UserModel {
  username = ''
}

export async function tokenIntrospection (token: string): Promise<UserModel> {
  const response = await axios.get<CommonReslut<UserModel>>(RestfulAddress.ArticleService + '/session/introspection',
    {params: {token}})
  return response.data.data
}


export async function handleSignInSubmit (username: string) { 
  // prepare form post data
  const formData = new FormData()
  formData.append('username', username)
  
  const res = await fetch('/restful/session/assertionOptions', {
    method: 'POST', // or 'PUT'
    body: formData, // data can be `string` or {object}!
    headers: {
      Accept: 'application/json'
    }
  })
  const fetchResult = await res.json() 
  if (fetchResult.code !== 200 || !fetchResult.data) {
    console.log('Error creating assertion options')
    console.error('fetchResult.message', fetchResult.message)
    return
  }

  const makeAssertionOptions = fetchResult.data.options
  
  console.log('Assertion Options Object', makeAssertionOptions)
  
  // todo: switch this to coercebase64
  const challenge = makeAssertionOptions.challenge.replace(/-/g, '+').replace(/_/g, '/')
  makeAssertionOptions.challenge = Uint8Array.from(atob(challenge), c => c.charCodeAt(0))
  
  // fix escaping. Change this to coerce
  makeAssertionOptions.allowCredentials.forEach(function (listItem) {
    const fixedId = listItem.id.replace(/\_/g, '/').replace(/\-/g, '+')
    listItem.id = Uint8Array.from(atob(fixedId), c => c.charCodeAt(0))
  })
  
  console.log('Assertion options', makeAssertionOptions)
  
  console.log({
    title: 'Logging In...',
    text: 'Tap your security key to login.',
    imageUrl: '/images/securitykey.min.svg',
    showCancelButton: true,
    showConfirmButton: false,
    focusConfirm: false,
    focusCancel: false
  })
  
  // ask browser for credentials (browser will ask connected authenticators)
  let credential
  try {
    credential = await navigator.credentials.get({ publicKey: makeAssertionOptions })
  } catch (err) {
    console.error(err.message ? err.message : err)
  }
  
  try {
    await verifyAssertionWithServer(fetchResult.data.session, credential)
  } catch (e) {
    console.error('Could not verify assertion', e)
  }
}
  
/**
  * Sends the credential to the the FIDO2 server for assertion
  * @param {any} assertedCredential
  */
export async function verifyAssertionWithServer (session: string, assertedCredential: unknown) {
  
  // Move data into Arrays incase it is super long
  const authData = new Uint8Array(assertedCredential.response.authenticatorData)
  const clientDataJSON = new Uint8Array(assertedCredential.response.clientDataJSON)
  const rawId = new Uint8Array(assertedCredential.rawId)
  const sig = new Uint8Array(assertedCredential.response.signature)
  const userHandle = new Uint8Array(assertedCredential.response.userHandle)
  const data = {
    id: assertedCredential.id,
    rawId: coerceToBase64Url(rawId),
    type: assertedCredential.type,
    extensions: assertedCredential.getClientExtensionResults(),
    response: {
      authenticatorData: coerceToBase64Url(authData),
      clientDataJSON: coerceToBase64Url(clientDataJSON),
      userHandle: userHandle !== null ? coerceToBase64Url(userHandle): null,
      signature: coerceToBase64Url(sig)
    }
  }
  const formData = {
    session,
    credential: data
  }
  
  let response
  try {
    const res = await fetch('/restful/session/makeAssertion', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(formData), // data can be `string` or {object}!
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  
    response = await res.json()
  } catch (e) {
    console.error('Request to server failed', e)
    throw e
  }
  
  console.log('Assertion Object', response)
  
  // show error
  if (response.code !== 200) {
    console.log('Error doing assertion')
    console.log(response.errorMessage)
    console.error(response.errorMessage)
    return
  }
  
  // show success message
  console.log({
    title: 'Logged In!',
    text: 'You\'re logged in successfully.',
    type: 'success',
    timer: 2000
  })
  
  // redirect?
  //window.location.href = "/dashboard/" + state.user.displayName;
}
  
