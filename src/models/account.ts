
import { coerceToArrayBuffer, coerceToBase64Url } from '@/utils/webauthn' 

//document.getElementById('register').addEventListener('submit', handleRegisterSubmit)

export async function handleRegisterSubmit (username: string, displayName: string) { 

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

export async function fetchMakeCredentialOptions (formData) {
  const response = await fetch('/restful/account/makeCredentialOptions', {
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
export async function registerNewCredential (newCredential: unknown) {
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

export async function registerCredentialWithServer (formData: unknown) {
  const response = await fetch('/restful/account/makeCredential', {
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
