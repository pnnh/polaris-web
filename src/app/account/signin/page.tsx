'use client'

import React, { useState } from 'react'  
import styles from './page.module.css'
import { PSCard } from '@/components/client/controls'
import Link from 'next/link'
import { handleSignInSubmit } from '@/models/session'

export default function Home () { 
  const [username, setUsername] = useState('') 
  return <PSCard>
    <div className={styles.loginContainer}>  
            <div className={styles.selfBox}>
            <div className="control has-icons-left has-icons-right">
                            <input className="input" type="text" placeholder="Larry" name="username"
                                value={username} onChange={(event) => {
                                  setUsername(event.target.value)
                                }}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
              <div className={styles.actionRow}>
                <button onClick={()=> {
                  handleSignInSubmit(username)
                }}>点击登录</button>
              </div>    
            </div> 
            <div className={styles.otherBox}>
                <LoginByMultiverse/>
            </div> 
  </div>
  </PSCard>
}

function LoginByMultiverse () {
  const authUrl = 'https://debug.multiverse.direct/server/oauth2/auth?client_id=pwa&redirect_uri=https%3A%2F%2Fdebug.polaris.direct%2Fserver%2Foauth2%2Fcode&response_type=code&scope=openid&state=some-random-state-foobar&nonce=some-random-nonce'
  return <Link href={authUrl}>通过Multiverse登录</Link> 
}
