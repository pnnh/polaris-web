import Link from 'next/link' 
import React from 'react'
import { checkAuth } from '@/services/auth'
import styles from './nav.module.css'
import { PSLinkButton } from './client/controls'
 
export async function loadHeaderNav () { 
  const auth = await checkAuth()
  console.log('auth:', auth)
  let helloElement: JSX.Element
  if (auth) { 
    helloElement = <div>{'欢迎：' + auth.username}</div>
  } else {
    helloElement = <PSLinkButton href={'/account/signin'} className={styles.loginLink}>登录</PSLinkButton>
  }
  return <nav className={styles.navHeader}> 
        <div className={styles.headerRow}>
        <div className={styles.headerMenu}>
        <div className={styles.headerLeft}>
            <Link className={styles.navLink} href='/'>首页</Link>&nbsp;
            <Link className={styles.navLink} href='/'>文章</Link>
        </div>
        <div className={styles.headerRight}>
            {helloElement}
        </div>
        </div>
    </div>
    </nav> 
}
