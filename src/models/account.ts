
import { RestfulAddress } from '@/utils/config'
import axios from 'axios'
import { CommonReslut } from './common-result'
  

export class AccountModel {
  pk = '' 
  createat: Date = new Date()
  updateat: Date = new Date()
  account = ''
  image = ''
  description = ''
  mail = ''
  nickname = ''
  
}

export async function getAccountModel (token: string): Promise<AccountModel | null> {
  const response = await axios.post<CommonReslut<AccountModel>>(RestfulAddress.ServerUrl + '/account/userinfo',
    {},
    {
      params: {}, 
      headers: {Authorization: token},
      withCredentials: true,
    }).catch((error) => {
    console.error('tokenIntrospection', error)
    return null
  })
  console.error('response?.status', response?.status)
  if (response?.status !== 200) {
    return null
  }
  console.log('getAccountModel', response.data)
  return response.data.data
}


export async function makeCredentialOptions (formData: unknown): Promise<unknown | null> {
  const response = await axios.post<CommonReslut<unknown>>(RestfulAddress.ServerUrl + '/account/makeCredentialOptions',
    formData,
    { 
      headers: {},
    }).catch((error) => {
    console.error('makeCredentialOptions', error)
    return null
  }) 
  if (response?.status !== 200) {
    return null
  }
  console.error('makeCredentialOptions', response.data.data)
  return response.data
}

export async function makeCredential (formData: unknown): Promise<unknown | null> {
  const response = await axios.post<CommonReslut<unknown>>(RestfulAddress.ServerUrl + '/account/makeCredential',
    formData,
    { 
      headers: {
        'Content-Type': 'application/json'
      },
    }).catch((error) => {
    console.error('makeCredential', error)
    return null
  })
  if (response?.status !== 200) {
    return null
  }
  console.error('makeCredential', response.data.data)
  return response.data
}


export async function makeAssertionOptions (formData: unknown): Promise<unknown | null> {
  const response = await axios.post<CommonReslut<unknown>>(RestfulAddress.ServerUrl + '/session/assertionOptions',
    formData,
    { 
      headers: {},
    }).catch((error) => {
    console.error('makeAssertionOptions', error)
    return null
  }) 
  if (response?.status !== 200) {
    return null
  }
  console.error('makeAssertionOptions2', response.data.data)
  return response.data
}

export interface makeAssertionResult {
  authorization: string
}

export async function makeAssertion (formData: unknown): Promise<CommonReslut<makeAssertionResult> | null> {
  const response = await axios.post<CommonReslut<makeAssertionResult>>(RestfulAddress.ServerUrl + '/session/makeAssertion',
    formData,
    { 
      headers: {
        'Content-Type': 'application/json'
      },
    }).catch((error) => {
    console.error('makeAssertion', error)
    return null
  })
  if (response?.status !== 200) {
    return null
  }
  console.error('makeAssertion2', response.data.data)
  return response.data
}
