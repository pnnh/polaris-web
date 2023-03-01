import { makeAssertion } from '@/models/account'
import { NextRequest, NextResponse } from 'next/server'


export async function POST (request: NextRequest) { 
  const formData = await request.json()
  const result = await makeAssertion(formData)
  console.debug('signin finish result:', result)
    
  return NextResponse.json(result)

}
