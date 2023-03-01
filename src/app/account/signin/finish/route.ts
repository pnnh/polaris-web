import { makeAssertion } from '@/models/account'
import { NextRequest, NextResponse } from 'next/server' 
import { encryptAes } from '@/utils/aes'

export async function POST (request: NextRequest) { 
  const formData = await request.json()
  const result = await makeAssertion(formData)
  console.debug('signin finish result:', result)

  // show error
  if (result.code !== 200) {
    console.log('Error doing assertion') 
    console.error('signin finish error: ', result.message)
    return
  }  

  const response = NextResponse.json(result)
  const token = encryptAes(result.data.authorization)
  response.cookies.set('a', token)

  return response
}
