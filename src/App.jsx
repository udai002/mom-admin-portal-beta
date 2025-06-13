import './App.css'

import { Route, Routes, BrowserRouter as Router } from 'react-router'
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
// import { Route, Routes } from 'react-router'
import CustomizedTables from './components/customisedtable';
import MedicinesCategory from './pages/Medicine/MedicinesCategory'
import Category from './pages/Categores/CustomizedTables'
import SubCategory from './pages/Categores/sub'
import Forms from './pages/Categores/forms'
import MedicineForm from './pages/Medicine/MedicineForm'
import SubForms from './pages/Categores/SubForms'
import UpdatedForm from './pages/Medicine/Updatedform'


function App() {

  return (

    <AdminProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        {/* <Route element={<MainLayout />} > */}
          <Route path='/' element={<Home />}
          <Route path='/deliveryboys' element={<DeliveryBoyDetails />} />
          <Route path='/dashboard' Component={Dashboard} />
          <Route path='/orders' Component={Orders} />
          <Route path='/orders/:orderId' Component={ViewDetail} />
          <Route path='/feedback' Component={Feedback} />
          <Route path='/ResolveDetail/:userId/:username/:email/:suggestionType/:createdAt/:suggestion' Component={ResolveDetail} />
          <Route path='/donarreport' element={<BloodDonarReport />} />

          <Route path='/users' Component={CustomizedTables} />
          <Route path='/medicines' Component={MedicinesCategory} />
          <Route path='/category' Component={Category} />
          <Route path='/subCategory' Component={SubCategory} />
          <Route path='forms' Component={Forms} />
          <Route path='/medicineform' Component={MedicineForm} />
          <Route path='/sub-forms' Component={SubForms} />
          <Route path='/Updatedform/:id' Component={UpdatedForm} />

        {/* </Route> */}
      </Routes>
    </AdminProvider>
  )
}

export default App

