import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Header from "./components/Header"
import Register from "./Pages/Register"
import Profile from "./Pages/Profile"
import Login from "./Pages/Login"
import {Toaster} from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import { Context, server } from "./main"

function App() {

  const [setUser, setIsAuthenticated] = useContext(Context);

  useEffect(()=>{
    axios.get(`${server}/users/me`,
    {
      Credential: true
    }).then(res => {
        setIsAuthenticated(true);
        setUser(res.data.user);
      })
      .catch((error)=>{
        console.log(error);
        setUser({});
        setIsAuthenticated(false);
      })
  },)

  return ( 
   <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <Toaster/>
   </Router>
  )
}

export default App
