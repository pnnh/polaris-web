import { tokenIntrospection } from '@/models/account' 
import { decryptAes } from '@/utils/aes' 
import { cookies, headers } from 'next/headers'  

export async function checkAuth () {
  const cookieStore = cookies()
  const token = cookieStore.get('a') 
 
  console.debug('proxyAuthorization:', token)
  //return await parseAuthorization('proxyAuthorization')
  // if (!authorization) {
  //   return null
  // }
  // console.debug('parseAuthorization', authorization)
 
  // const info = parseAuthorizationHeader(authorization)
  // console.debug('info:', info)
  // if (!info) {
  //   return null
  // }
  if (!token || !token.value) {
    return null
  }
  let auth =decryptAes(token.value) 
  if (!auth) {
    return null
  }
  auth = 'Bearer ' + auth
  const result = await tokenIntrospection(auth)
  console.debug('result222:', result)
  return result
}
