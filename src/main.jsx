
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Landing from './pages/Landing.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <AuthContextProvider>
    <App/>
  </AuthContextProvider>
  </BrowserRouter>
 
)
