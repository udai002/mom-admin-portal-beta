import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'

import Orders from './pages/Orders/orders'
import UserFeedbackTable from './pages/Feedback/UserFeedback'
import { Dashboard } from './pages/Dashboard/Dashboard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>

      <Route path='/orders' Component={Orders} />
      <Route path="/user-feedback" element={<UserFeedbackTable />}/>
      <Route path="/" element={<Dashboard />}/>


    </Routes>
  )
}

export default App
