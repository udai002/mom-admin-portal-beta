import './App.css'
import { Route, Routes } from 'react-router'
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
    <div className="min-h-screen bg-teal-700 flex items-center justify-center p-20">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-4 min-h-[80vh] overflow-auto">
        <Routes>
          <Route path='/' Component={CustomizedTables} />
          <Route path='/medicines' Component={MedicinesCategory} />
          <Route path='/category' Component={Category} />
          <Route path='/subCategory' Component={SubCategory} />
          <Route path='forms' Component={Forms} />
          <Route path='/medicineform' Component={MedicineForm} />
          <Route path='/sub-forms' Component={SubForms} />
          <Route path='/Updatedform/:id' Component={UpdatedForm} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
