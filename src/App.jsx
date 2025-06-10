import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Orders from './pages/Orders/orders'
import { Dashboard } from './pages/Dashboard/dashboard'
import UserFeedbackTable from './pages/Feedback/UserFeedback'

function App() {

  return (
    <Routes>
      <Route path='/' Component={Orders} />
      <Route path='/dash' Component={Dashboard} />
      <Route path='/feed' Component={UserFeedbackTable} />
    </Routes>
  )
}

export default App
