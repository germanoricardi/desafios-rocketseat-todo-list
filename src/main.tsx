import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const RootElement = document.getElementById('root')

if (RootElement)
  ReactDOM.createRoot(RootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
