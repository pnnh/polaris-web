'use client'

import { loadHeaderNav } from '@/components/nav'
import React from 'react' 

export default async function AccountLayout ({
  children,
}: {
  children: React.ReactNode
}) { 
  const headerNav = await loadHeaderNav()
  return ( 
    
     <><header></header> 
     {headerNav}
     <main><div className='account-page'>
     {children}  
    </div></main> </>
  )
} 
