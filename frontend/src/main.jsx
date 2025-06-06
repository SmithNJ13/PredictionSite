// import React from "react"
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from "react-router-dom"
import App from './App.jsx'
import { AuthProvider } from './Auth/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
)
