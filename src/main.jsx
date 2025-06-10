import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { MedicineProvider } from './context/MedicineContext/Medicine.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MedicineProvider>
        <App />
      </MedicineProvider>
    </BrowserRouter>
  </StrictMode>,
)
