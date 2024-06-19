import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Web3ModalProvider } from './connect.jsx'
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Web3ModalProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>   
    </Web3ModalProvider>
</React.StrictMode>
)
