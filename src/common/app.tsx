import { LoadHomePage } from '@/server'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Routes } from 'react-router-dom'

export default async function loadApp() {

  const homePage = await LoadHomePage()
  return  <Routes>
      <Route path="/" element={homePage} />
    </Routes> 
}