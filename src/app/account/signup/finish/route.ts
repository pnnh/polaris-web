import { makeCredential } from '@/models/account'
import { NextRequest, NextResponse } from 'next/server'


export async function POST (request: NextRequest) { 
  const formData = await request.json()
  const result = await makeCredential(formData)
  console.debug('signup begin result:', result)
    
  return NextResponse.json(result)
}
