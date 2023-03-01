
import { RestfulAddress } from '@/utils/config'
import axios from 'axios'
import { CommonReslut } from './common-result'
  

export class UserModel {
  username = ''
}

export async function tokenIntrospection (token: string): Promise<UserModel | null> {
  const response = await axios.get<CommonReslut<UserModel>>(RestfulAddress.ArticleService + '/account/userinfo',
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
  return response.data.data
}


export async function makeCredentialOptions (formData: unknown): Promise<unknown | null> {
  const response = await axios.post<CommonReslut<unknown>>(RestfulAddress.ArticleService + '/account/makeCredentialOptions',
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
  const response = await axios.post<CommonReslut<unknown>>(RestfulAddress.ArticleService + '/account/makeCredential',
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
  const response = await axios.post<CommonReslut<unknown>>(RestfulAddress.ArticleService + '/session/assertionOptions',
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

export async function makeAssertion (formData: unknown): Promise<unknown | null> {
  const response = await axios.post<CommonReslut<unknown>>(RestfulAddress.ArticleService + '/session/makeAssertion',
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
