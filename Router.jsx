import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignupPage from '../components/Signup'
import LoginPage from '../components/Login'
import TaskHistory from '../pages/TaskHistory'
function ReactRoute() {
  return (
    <div>
      <Routes>
       
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<TaskHistory />} />
      </Routes>
    </div>
  )
}

export default ReactRoute