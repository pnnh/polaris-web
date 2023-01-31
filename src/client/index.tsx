
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import '../components/controls' 
 

export function HomeClientPage() {
    return <div>
        <h1>Home Client Page</h1>
    </div>
    }

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