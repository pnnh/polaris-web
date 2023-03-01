'use client'

  
import React, { useState } from 'react'  
import { coerceToArrayBuffer, coerceToBase64Url } from '@/utils/webauthn' 
 

export default function Home () { 
  const [username, setUsername] = useState('') 
  const [displayName, setDisplayName] = useState('') 
  return <div>
        <h1>注册页面</h1>
        <div className="section">
    <div className="container">
        <div className="columns">
            <div className="column is-4">
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control has-icons-left has-icons-right">
                            <input className="input" type="text" placeholder="Larry" name="username"
                                value={username} onChange={(event) => {
                                  setUsername(event.target.value)
                                }}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                        <label className="label">Display name</label>
                        <div className="control has-icons-left has-icons-right">
                            <input className="input" type="text" placeholder="Larry Zhang" name="displayName"
                                value={displayName} onChange={(event) => {
                                  setDisplayName(event.target.value)
                                }}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>

                    <div className="field"> 
                        <button onClick={(event) => {
                          handleRegisterSubmit(username, displayName)
                        }}>注册用户</button>
                    </div> 
            </div> 
        </div>
    </div>
</div>
         
    </div>
}



export async function handleRegisterSubmit (username: string, displayName: string) { 
  if (!username) {
    console.error('Username is required')
    return
  }
  // possible values: none, direct, indirect
  const attestationType = 'none'
  // possible values: <empty>, platform, cross-platform
  const authenticatorAttachment = ''
  
  // possible values: preferred, required, discouraged
  const userVerification = 'preferred'
  
  // possible values: true,false
  const requireResidentKey = 'false'
  
  
  
  // prepare form post data
  const data = new FormData()
  data.append('username', username)
  data.append('displayName', displayName)
  data.append('attType', attestationType)
  data.append('authType', authenticatorAttachment)
  data.append('userVerification', userVerification)
  data.append('requireResidentKey', requireResidentKey)
   
  const fetchResult = await fetchMakeCredentialOptions(data)
  console.log('fetchResult', fetchResult)
  if (fetchResult.code !== 200 || !fetchResult.data || !fetchResult.data.options) {
    console.log('Error creating credential options') 
    console.error('fetchResult.message5', fetchResult.message)
    return
  }
  
  const makeCredentialOptions =fetchResult.data.options
  
  console.log('Credential Options Object', makeCredentialOptions)
  
  // Turn the challenge back into the accepted format of padded base64
  makeCredentialOptions.challenge = coerceToArrayBuffer(makeCredentialOptions.challenge)
  // Turn ID into a UInt8Array Buffer for some reason
  makeCredentialOptions.user.id = coerceToArrayBuffer(makeCredentialOptions.user.id)
  
  makeCredentialOptions.excludeCredentials = makeCredentialOptions.excludeCredentials.map((c) => {
    c.id = coerceToArrayBuffer(c.id)
    return c
  })
  
  if (makeCredentialOptions.authenticatorSelection.authenticatorAttachment === null) makeCredentialOptions.authenticatorSelection.authenticatorAttachment = undefined
  
  console.log('Credential Options Formatted', makeCredentialOptions)
  
  console.log({
    title: 'Registering...',
    text: 'Tap your security key to finish registration.',
    imageUrl: '/images/securitykey.min.svg',
    showCancelButton: true,
    showConfirmButton: false,
    focusConfirm: false,
    focusCancel: false
  })
  
  
  console.log('Creating PublicKeyCredential...')
  
  let newCredential
  try {
    newCredential = await navigator.credentials.create({
      publicKey: makeCredentialOptions
    })
  } catch (e) {
    const msg = 'Could not create credentials in browser. Probably because the username is already registered with your authenticator. Please change username or authenticator.'
    console.error(msg, e)
  }
  
  
  console.log('PublicKeyCredential Created', newCredential)
  
  try {
    registerNewCredential(fetchResult.data.session, newCredential)
  
  } catch (e) {
    console.error(err.message ? err.message : err)
  }
}
  
export async function fetchMakeCredentialOptions (formData) {
  const response = await fetch('/account/signup/begin', {
    method: 'POST', // or 'PUT'
    body: formData, // data can be `string` or {object}!
    headers: {
      Accept: 'application/json'
    }
  })
  
  const data = await response.json()
  
  return data
}
  
  
// This should be used to verify the auth data with the server
export async function registerNewCredential (session: string, newCredential: unknown) {
  // Move data into Arrays incase it is super long
  const attestationObject = new Uint8Array(newCredential.response.attestationObject)
  const clientDataJSON = new Uint8Array(newCredential.response.clientDataJSON)
  const rawId = new Uint8Array(newCredential.rawId)
  
  const data = {
    id: newCredential.id,
    rawId: coerceToBase64Url(rawId),
    type: newCredential.type,
    extensions: newCredential.getClientExtensionResults(),
    response: {
      AttestationObject: coerceToBase64Url(attestationObject),
      clientDataJson: coerceToBase64Url(clientDataJSON)
    }
  }
  const formData = {
    session,
    credential: data
  }
  
  
  const registerResult = await registerCredentialWithServer(formData) 
  if (registerResult.code !== 200 || !registerResult.data) {
    console.log('Error creating credential')
    console.error('registerResult.message', registerResult.message)
    return
  }
  
  const response = registerResult.data
    
  console.log('Credential Object', response)
  
  // show success 
  console.log({
    title: 'Registration Successful!',
    text: 'You\'ve registered successfully.',
    type: 'success',
    timer: 2000
  })
  
  // redirect to dashboard?
  //window.location.href = "/dashboard/" + state.user.displayName;
}
  
export async function registerCredentialWithServer (formData: unknown) {
  const response = await fetch('/account/signup/finish', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(formData), // data can be `string` or {object}!
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  
  const data = await response.json()
  
  return data
}
  
