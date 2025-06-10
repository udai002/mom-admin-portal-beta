import './App.css'
import { Route, Routes } from 'react-router'
import CustomizedTables from './components/customisedtable';
import MedicinesCategory from './pages/MedicinesCategory'
import Category from './pages/Categores/CustomizedTables'
import SubCategory from './pages/Categores/sub'


function App() {
  return (
    <Routes>
      <Route path='/' Component={CustomizedTables} />
      <Route path='/medicines' Component={MedicinesCategory} />
      <Route path='/category' Component={Category} />
      <Route path='/subCategory' Component={SubCategory} />

    </Routes>
  )
}

export default App
