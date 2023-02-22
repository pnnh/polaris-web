'use client'

import React from 'react';
import { FluentProvider, teamsLightTheme  } from '@fluentui/react-components';


export default function AccountLayout ({
  children,
}: {
  children: React.ReactNode
}) { 
  return (
     
     <FluentProvider theme={teamsLightTheme}>
     {children} 
   </FluentProvider>
  )
} 
