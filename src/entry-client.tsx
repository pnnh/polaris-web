
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './styles/index.scss'
import './components/controls'
import { HomeClientPage } from './client/pages/home-client'


const App = () => {
  return <Router>
    <Routes>
      <Route path="/" element={<HomeClientPage />} />
    </Routes>
  </Router>
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.render(<App />, rootElement)
}