import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Orders from './pages/Orders/orders'
import { Dashboard } from './pages/Dashboard/dashboard'
import UserFeedbackTable from './pages/Feedback/UserFeedback'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' Component={Orders} />
      <Route path='/dash' Component={Dashboard} />
      <Route path='/feed' Component={UserFeedbackTable} />
    </Routes>
  )
}

export default App
