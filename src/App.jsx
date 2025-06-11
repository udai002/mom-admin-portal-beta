import './App.css'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Orders from './pages/Orders/orders'
import Feedback from './pages/Feedback/UserFeedback'
import { Dashboard } from './pages/DashBoard/Dashboard'
import ViewDetail from './components/Orders/ViewDetail'
import ResolveDetail from './pages/Feedback/ResolveDetail'
import BloodDonarReport from './pages/Feedback/BloodDonarReport'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' Component={Dashboard} />
        <Route path='/dashboard' Component={Dashboard} />
        <Route path='/orders' Component={Orders} />
        <Route path='/orders/:orderId' Component={ViewDetail} />
        <Route path='/feedback' Component={Feedback} />
        <Route path='/ResolveDetail/:userId/:username/:email/:suggestionType/:createdAt/:suggestion' Component={ResolveDetail} />
        <Route path='/donarreport' element={<BloodDonarReport />} />
      </Routes>
    </Router>
  )
}

export default App