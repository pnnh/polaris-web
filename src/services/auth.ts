import { tokenIntrospection } from '@/models/account' 
import { headers } from 'next/headers'  

export async function checkAuth () {
  const headersList = headers()
  const proxyAuthorization = headersList.get('Authorization')
 
  console.debug('proxyAuthorization:', proxyAuthorization) 
  const result = await tokenIntrospection(proxyAuthorization??'')
  console.debug('result:', result)
  return result
}
