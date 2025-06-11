import './App.css'
import { Route, Routes } from 'react-router'
import CustomizedTables from './components/customisedtable';
import MedicinesCategory from './pages/MedicinesCategory'
import Category from './pages/Categores/CustomizedTables'
import SubCategory from './pages/Categores/sub'
import Forms from './pages/Categores/forms'
import MedicineForm from './pages/MedicineForm'
import SubForms from './pages/Categores/SubForms'

function App() {
  return (
    <Routes>
      <Route path='/' Component={CustomizedTables} />
      <Route path='/medicines' Component={MedicinesCategory} />
      <Route path='/category' Component={Category} />
      <Route path='/subCategory' Component={SubCategory} />
      <Route path='forms' Component={Forms}/>
      <Route path='/medicineform' Component={MedicineForm}  />
      <Route path='/sub-forms' Component={SubForms}/>

    </Routes>
  )
}

export default App
