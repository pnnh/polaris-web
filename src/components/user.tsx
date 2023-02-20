'use client'

import React, { useEffect, useState } from 'react' 
import Link from 'next/link'
import { checkLogined, UserModel } from '@/models/account'

export function UserNav () {
  const [user, setUser] = useState<UserModel>()
  useEffect(() => {
    checkLogined().then((model) => {
      setUser(model)
    })
  }, [])
  console.log('user', user)
  if (user && user.nickname !== '') { 
    return <div>欢迎：{user.nickname}</div>
  }
  const authUrl = 'https://debug.multiverse.direct/server/oauth2/auth?client_id=pwa&redirect_uri=https%3A%2F%2Fdebug.polaris.direct%2Fserver%2Foauth2%2Fcode&response_type=code&scope=openid&state=some-random-state-foobar&nonce=some-random-nonce'
  return <Link href={authUrl}>登录</Link>
}
