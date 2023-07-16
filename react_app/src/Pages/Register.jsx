import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom"
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated} = useContext(Context)

  const submitHandler = async(e)=>{
      try {
        e.preventDefault();
      const {data} = await axios.post(`${server}/users/new`, 
            {name, email, password},
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
            <input placeholder="Name" type="text" value={name} onChange={(e)=>setName(e.target.value)} required/>
            <input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            <button type="submit">Sign Up</button>
            <h3>OR</h3>
            <Link to="/login" className="signup">Login</Link>
        </form>
      </section>
    </div>
  )
}

export default Register