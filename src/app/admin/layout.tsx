'use client'

import React from 'react'  
import Link from 'next/link' 
import styles from './layout.module.css'
 
function AdminNav () { 
  return <nav className={styles.navHeader}> 
        <div className={styles.headerRow}>
        <div className={styles.headerMenu}>
        <div className={styles.headerLeft}>
            <Link className={styles.navLink} href='/'>首页</Link>
        </div>
        <div className={styles.headerRight}>
            你好: admin
        </div>
        </div>
    </div>
    </nav> 
}


export default function AdminLayout ({
  children,
}: {
  children: React.ReactNode
}) {  
  return ( 
    <>
    <AdminNav></AdminNav>
        <main><div className='admin-page'>
        {children}  
       </div></main> 
        <footer></footer>
    </>
    
  )
} 



