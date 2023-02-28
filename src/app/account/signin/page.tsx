'use client'

import { coerceToBase64Url } from '@/utils/webauthn' 
import React from 'react'  
import styles from './page.module.css'
import { PSCard } from '@/components/client/controls'
import Link from 'next/link'

export default function Home () { 
  return <PSCard>
    <div className={styles.loginContainer}>  
            <div className={styles.selfBox}>
              <div className={styles.actionRow}>
                <button onClick={()=> {
                  handleSignInSubmit('')
                }}>点击登录</button>
              </div>    
            </div> 
            <div className={styles.otherBox}>
                <LoginByMultiverse/>
            </div> 
  </div>
  </PSCard>
}

function LoginByMultiverse () {
  const authUrl = 'https://debug.multiverse.direct/server/oauth2/auth?client_id=pwa&redirect_uri=https%3A%2F%2Fdebug.polaris.direct%2Fserver%2Foauth2%2Fcode&response_type=code&scope=openid&state=some-random-state-foobar&nonce=some-random-nonce'
  return <Link href={authUrl}>通过Multiverse登录</Link> 
}

async function handleSignInSubmit (username: string) { 
  // prepare form post data
  const formData = new FormData()
  formData.append('username', username)

  // send to server for registering
  let makeAssertionOptions
  try {
    const res = await fetch('/restful/assertionOptions', {
      method: 'POST', // or 'PUT'
      body: formData, // data can be `string` or {object}!
      headers: {
        Accept: 'application/json'
      }
    })

    makeAssertionOptions = await res.json()
  } catch (e) {
    console.error('Request to server failed', e)
  }

  console.log('Assertion Options Object', makeAssertionOptions)

  // show options error to user
  if (makeAssertionOptions.status !== 'ok') {
    console.log('Error creating assertion options')
    console.log(makeAssertionOptions.errorMessage)
    console.error(makeAssertionOptions.errorMessage)
    return
  }

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
    await verifyAssertionWithServer(credential)
  } catch (e) {
    console.error('Could not verify assertion', e)
  }
}

/**
* Sends the credential to the the FIDO2 server for assertion
* @param {any} assertedCredential
*/
async function verifyAssertionWithServer (assertedCredential) {

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

  let response
  try {
    const res = await fetch('/restful/makeAssertion', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
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
  if (response.status !== 'ok') {
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
