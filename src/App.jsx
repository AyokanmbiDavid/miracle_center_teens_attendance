import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
const App = () => {
  return (
    <>
      <Navbar/>
      <div className="mt-15 px-3">
        <Routes>
          <Route path='/' element={<HomePage/>} />
        </Routes>
      </div>
    </>
  )
}

export default App