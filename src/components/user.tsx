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
  return <Link href={'/account/signin'}>登录</Link>
}
