import './App.css'

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Orders from './pages/Orders/orders'
import Feedback from './pages/Feedback/UserFeedback'
import { Dashboard } from './pages/DashBoard/Dashboard'
import ViewDetail from './components/Orders/ViewDetail'
import ResolveDetail from './pages/Feedback/ResolveDetail'
import BloodDonarReport from './pages/Feedback/BloodDonarReport'
import Home from './pages/Home'
import Login from './pages/Login/Login'
import DeliveryBoyDetails from './pages/Deliveryboy/Deliverboy'
import SideBar from './components/Sidebar/SideBar'
import MainLayout from './components/Layouts/Layout'
import { AdminProvider } from './context/AdminAuth'


function App() {

  return (

    <AdminProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<MainLayout />} >
          <Route path='/' element={<Home />} />
          <Route path='/deliveryboys' element={<DeliveryBoyDetails />} />
              <Route path='/dashboard' Component={Dashboard} />
        <Route path='/orders' Component={Orders} />
        <Route path='/orders/:orderId' Component={ViewDetail} />
        <Route path='/feedback' Component={Feedback} />
        <Route path='/ResolveDetail/:userId/:username/:email/:suggestionType/:createdAt/:suggestion' Component={ResolveDetail} />
        <Route path='/donarreport' element={<BloodDonarReport />} />
        </Route>
      </Routes>
    </AdminProvider>
  )
}

export default App