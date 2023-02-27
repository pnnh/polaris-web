import { loadHeaderNav } from '@/components/nav'
import React from 'react' 
import styles from './layout.module.css'

export default async function AccountLayout ({
  children,
}: {
  children: React.ReactNode
}) { 
  const headerNav = await loadHeaderNav()
  return ( 
     <><header></header> 
     {headerNav}
     <main className={styles.accountPage}> 
     {children}  
     </main> </>
  )
} 
