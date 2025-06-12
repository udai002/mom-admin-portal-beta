import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login/Login'
import DeliveryBoyDetails from './pages/Deliveryboy/Deliverboy'
import SideBar from './components/Sidebar/SideBar'
import MainLayout from './components/Layouts/Layout'
import { AdminProvider } from './context/AdminAuth'
// import ProtectedRoute from './components/NavigationsComponents/ProtectedRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AdminProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<MainLayout />} >
          <Route path='/' element={<Home />} />
          <Route path='/deliveryboys' element={<DeliveryBoyDetails />} />
        </Route>
      </Routes>
    </AdminProvider>
  )
}

export default App
