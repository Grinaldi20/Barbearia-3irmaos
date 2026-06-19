import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './Barbearia.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
