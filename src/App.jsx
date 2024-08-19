import React, { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'

const App = () => {
  const {user} =useContext(AuthContext)
  return (
    <>
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
    </>
  )
}

export default App