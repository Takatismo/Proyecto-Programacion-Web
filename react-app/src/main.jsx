
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Carta from './carta.jsx'

const rutaActual = window.location.pathname

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {rutaActual === '/carta.html' || rutaActual === '/carta'
            ? <Carta />
            : <App />}
    </StrictMode>
)

