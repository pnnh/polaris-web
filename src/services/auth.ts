import { getAccountModel } from '@/models/account' 
import { decryptAes } from '@/utils/aes' 
import { cookies } from 'next/headers'  

export async function checkAuth () {
  const cookieStore = cookies()
  const token = cookieStore.get('a') 
 
  console.debug('proxyAuthorization:', token) 
  if (!token || !token.value) {
    return null
  }
  let auth =decryptAes(token.value) 
  if (!auth) {
    return null
  }
  auth = 'Bearer ' + auth
  const result = await getAccountModel(auth)
  console.debug('result222:', result)
  return result
}
