import './App.css'
import { Route, Routes } from 'react-router'

import Orders from './pages/Orders/orders'
import Feedback from './pages/Feedback/UserFeedback'
import {Dashboard} from './pages/DashBoard/Dashboard'


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
