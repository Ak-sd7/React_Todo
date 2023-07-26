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

  const {setUser, setIsAuthenticated, setLoading} = useContext(Context);

  useEffect(()=>{
    setLoading(true);
    axios
    .get(`${server}/users/me`,{
      withCredentials: true,
    })
    .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
    })
    .catch((error)=>{
        console.log(error.response.data.message);
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
    })
  },[])

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
