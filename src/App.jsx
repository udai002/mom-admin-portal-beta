import './App.css'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Orders from './pages/Orders/orders'
import Feedback from './pages/Feedback/UserFeedback'
import { Dashboard } from './pages/DashBoard/Dashboard'
import ViewDetail from './components/Orders/ViewDetail'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' Component={Dashboard} />
        <Route path='/dashboard' Component={Dashboard} />
        <Route path='/orders' Component={Orders} />
        <Route path='/orders/:orderId' Component={ViewDetail} />
        <Route path='/feedback' Component={Feedback} />
      </Routes>
    </Router>
  )
}

export default App
