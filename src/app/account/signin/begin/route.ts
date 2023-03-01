import { makeAssertionOptions } from '@/models/account'
import { NextRequest, NextResponse } from 'next/server'


export async function POST (request: NextRequest) { 
  
  const formData = await request.formData()
  
  const result = await makeAssertionOptions(formData)
  console.debug('signin begin result:', result)
  
  return NextResponse.json(result)

}
