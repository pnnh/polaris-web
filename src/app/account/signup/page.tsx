'use client'

import { coerceToArrayBuffer, coerceToBase64Url } from '@/utils/webauthn'
import React, { useState } from 'react' 

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
                            <input className="input" type="text" placeholder="abergs" name="username" required 
                                 value={username} onChange={(event) => {
                                   setUsername(event.target.value)
                                 }}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Display name</label>
                        <div className="control has-icons-left has-icons-right">
                            <input className="input" type="text" placeholder="Anders Åberg" name="displayName"
                                value={displayName} onChange={(event) => {
                                  setDisplayName(event.target.value)
                                }}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button className="button is-link" onClick={(event) => {
                              handleRegisterSubmit(username, displayName)
                            }}>Register user</button>
                        </div>
                    </div> 
            </div> 
        </div>
    </div>
</div>
        
    </div>
}



//document.getElementById('register').addEventListener('submit', handleRegisterSubmit)

async function handleRegisterSubmit (username: string, displayName: string) { 

  // possible values: none, direct, indirect
  const attestation_type = 'none'
  // possible values: <empty>, platform, cross-platform
  const authenticator_attachment = ''

  // possible values: preferred, required, discouraged
  const user_verification = 'preferred'

  // possible values: true,false
  const require_resident_key = 'false'



  // prepare form post data
  const data = new FormData()
  data.append('username', username)
  data.append('displayName', displayName)
  data.append('attType', attestation_type)
  data.append('authType', authenticator_attachment)
  data.append('userVerification', user_verification)
  data.append('requireResidentKey', require_resident_key)

  // send to server for registering
  let makeCredentialOptions
  try {
    makeCredentialOptions = await fetchMakeCredentialOptions(data)

  } catch (e) {
    console.error(e)
    const msg = "Something wen't really wrong"
    console.error(msg)
  }


  console.log('Credential Options Object', makeCredentialOptions)

  if (makeCredentialOptions.status !== 'ok') {
    console.log('Error creating credential options')
    console.log(makeCredentialOptions.errorMessage)
    console.error(makeCredentialOptions.errorMessage)
    return
  }

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
    console.error(msg, e)
  }


  console.log('PublicKeyCredential Created', newCredential)

  try {
    registerNewCredential(newCredential)

  } catch (e) {
    console.error(err.message ? err.message : err)
  }
}

async function fetchMakeCredentialOptions (formData) {
  const response = await fetch('/server/makeCredentialOptions', {
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
async function registerNewCredential (newCredential: unknown) {
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

  let response
  try {
    response = await registerCredentialWithServer(data)
  } catch (e) {
    console.error(e)
  }

  console.log('Credential Object', response)

  // show error
  if (response.status !== 'ok') {
    console.log('Error creating credential')
    console.log(response.errorMessage)
    console.error(response.errorMessage)
    return
  }

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

async function registerCredentialWithServer (formData: unknown) {
  const response = await fetch('/server/makeCredential', {
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
