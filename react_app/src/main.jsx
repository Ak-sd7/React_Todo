import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss'
import { createContext } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const server = "https://auth-todo.onrender.com/api/v1";

export const Context = createContext({isAuthenticated: false})

const AppWrapper = ()=>{

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return(
    <Context.Provider value={{
        isAuthenticated, 
        setIsAuthenticated
      }}>
      <App/>
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
)