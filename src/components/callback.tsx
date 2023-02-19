'use client'

import { loginFinish } from '@/services/oauth2'
import { url } from 'inspector'
import { useEffect } from 'react'
import queryString from 'query-string'
export function OAuth2Callback () {
  useEffect(() => {
    const parsed = queryString.parse(location.search)
    console.log('parsed', parsed)
    console.log('OAuth2Callback', window.location.href) 
    
    loginFinish(parsed.code).then((res) => {
      console.log('loginFinish', res)
    })
  }, [])
  return <div>
        回调详情页面
    </div> 
}
