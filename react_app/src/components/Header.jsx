import { useContext } from "react"
import { Link } from "react-router-dom"
import { Context, server } from "../main"
import { toast } from "react-hot-toast"
import axios from "axios"

const Header = () => {
  // const {isAuthenticated} = useContext(Context)
  const {isAuthenticated, setIsAuthenticated} = useContext(Context)

  const logoutHandler = async()=>{
    try {
        await axios.get(`${server}/users/logout`, 
        {
          withCredentials: true 
        }
      );
      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
    } catch (error) {
        // toast.error("error");
        console.log(error);
        toast.error(error.response.data.message);
        setIsAuthenticated(true);
    }
  }
  // if(isAuthenticated){
  //   return <Navigate to={"/"}/>
  // }

  return (
    <nav className="header">
        <div>
            <h2>To Do</h2>
        </div> 
        <article>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            { isAuthenticated ? <button onClick={logoutHandler} className = "btn">LogOut</button> : <Link to={"/login"}>Login</Link> }
            
        </article>
    </nav> 
  )
}

export default Header
