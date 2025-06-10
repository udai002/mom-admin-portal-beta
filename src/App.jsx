import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'

import Orders from './pages/Orders/orders'
import { Dashboard } from './pages/Dashboard/dashboard'
import UserFeedbackTable from './pages/Feedback/UserFeedback'


function App() {

  return (
    <Routes>

      <Route path='/dashboard' Component={Dashboard} />
      <Route path='/orders' Component={Orders} />
      <Route path='/feedback' Component={Feedback} />
      </Routes>


  )
}

export default App
