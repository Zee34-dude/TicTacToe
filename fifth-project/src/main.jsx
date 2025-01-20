import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 
import App from './App.jsx'
import { XOAPP } from './TicTacToe/TicTacToe.jsx'

createRoot(document.getElementById('root')).render(

    // <App />
    <XOAPP/>
)
