import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom"
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import axios from "axios";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated} = useContext(Context)

  const submitHandler = async(e)=>{
    try {
        e.preventDefault();
        const {data} = await axios.post(`${server}/users/login`, 
          {email, password},
        {
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials: true 
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
        // toast.error("error");
        console.log(error);
        toast.error(error.response.data.message);
        setIsAuthenticated(false);
    }
  }
  if(isAuthenticated){
    return <Navigate to={"/"}/>
  }

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
            <input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            <button type="submit">Login</button>
            <h3>OR</h3>
            <Link to={"/register"} className="signup">Sign Up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login