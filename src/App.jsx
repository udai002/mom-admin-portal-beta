import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/login' Component={Login} />
    </Routes>
  )
}

export default App
