'use client'

import React from 'react'
import { RestfulAddress } from '@/utils/config'   
import Link from 'next/link'

export function UserNav () {
//   return <button onClick={() => {
//     console.log('登录')
//     const redirect = window.location.href
//     window.location.href = RestfulAddress.AuthUrl + '?redirect=' + encodeURIComponent(redirect)
//   }}>登录</button>
  const authUrl = 'https://debug.multiverse.direct/server/oauth2/auth?client_id=pwa&redirect_uri=https%3A%2F%2Fdebug.polaris.direct%2Flogin%2Fcallback&response_type=token%20id_token&scope=fosite%20openid&state=some-random-state-foobar&nonce=some-random-nonce'
  return <Link href={authUrl}>登录</Link>
}
