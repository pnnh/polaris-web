import { tokenIntrospection } from '@/models/session'
import { parseAuthorizationHeader } from 'http-auth-utils'
import { cookies, headers } from 'next/headers'  

export async function checkAuth () {

  const headersList = headers()
  let proxyAuthorization = headersList.get('Authorization')

  if (!proxyAuthorization) {
    const cookieStore = cookies()
    const cookie = cookieStore.get('Authorization')
    if (cookie) {
      proxyAuthorization = cookie.value
    }
  }
  return await parseAuthorization(proxyAuthorization)
}

async function parseAuthorization (authorization: string | null) {
  if (!authorization) {
    return null
  }
  console.debug('parseAuthorization', authorization)
 
  const info = parseAuthorizationHeader(authorization)
  console.debug('info:', info)
  if (!info) {
    return null
  }
  const result = await tokenIntrospection(info.data.hash)
  console.debug('result:', result)
  return result
}
