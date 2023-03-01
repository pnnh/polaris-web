import { makeCredentialOptions } from '@/models/account'
import { NextRequest, NextResponse } from 'next/server'


export async function POST (request: NextRequest) { 
  const formData = await request.formData()
  
  const result = await makeCredentialOptions(formData)
  console.debug('signup begin result:', result)
  
  return NextResponse.json(result)

}
