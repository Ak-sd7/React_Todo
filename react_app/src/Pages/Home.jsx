import axios from "axios";
import { useState } from "react"
import {server} from "../main"
import { toast } from "react-hot-toast";

const Home = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async(e)=>{
      e.preventDefault();
      try {
        setLoading(true);
        const {data} = await axios.post(`${server}/tasks/new`,{
          title,
          description
        },{
          withCredentials: true,
          headers: {
            "Content-Type":"application/json"
          }
        })
        toast.success(data.message)
        setLoading(false);
      } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
      }
  }

  return (
    <div className="container">
      <div className="login">
        <section>
        <form onSubmit={submitHandler}>
              <input placeholder="Title" type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
              <input placeholder="Description" type="text" value={description} onChange={(e)=>setDescription(e.target.value)} required/>
              <button disabled={loading} type="submit">Add Task</button>
          </form>
        <section className="todosContainer">
        
        </section>
      </section>
    </div>
    </div>
  )
}

export default Home