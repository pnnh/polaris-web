import React from 'react'   
import styles from './layout.module.css'
import { ConsoleLeftNav, ConsoleTopNav } from './nav'
 

export default function ConsoleLayout ({
  children,
}: {
  children: React.ReactNode
}) {  
  return ( 
    <>
    <ConsoleTopNav></ConsoleTopNav>
        <main>
       
        <div className={styles.pageContainer}>
    <div className={styles.leftNav}><ConsoleLeftNav></ConsoleLeftNav></div>
    
    <div className={styles.rightBody}>
    {children}  
    </div>
  </div> </main> 
        <footer></footer>
    </>
    
  )
} 



