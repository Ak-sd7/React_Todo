import axios from "axios";
import { useContext, useEffect, useState } from "react"
import {Context, server} from "../main"
import { toast } from "react-hot-toast";
import TaskItem from "../components/TaskItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [discription, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const {isAuthenticated} = useContext(Context)

  const updateHandler = async(id)=>{
    try {
      const {data} = await axios.put(`${server}/tasks/${id}`,{},{
        withCredentials: true
      })
      toast.success(data.message);
      setRefresh(prev=>!prev);
    } catch (error) {
      toast.error(error.response.data.message);
      // toast.error(id);
    }
  }

  const deleteHandler = async(id)=>{
    try {
      const {data} = await axios.delete(`${server}/tasks/${id}`,{
        withCredentials: true
      })
      toast.success(data.message);
      setRefresh(prev=>!prev);
    } catch (error) {
      toast.error(error.response.data.message);
      toast.error(id);
    }
  }

  const submitHandler = async(e)=>{
      e.preventDefault();
      try {
        setLoading(true);
        const {data} = await axios.post(`${server}/tasks/new`,{
          title,
          discription
        },{
          withCredentials: true,
          headers: {
            "Content-Type":"application/json"
          }
        })
        setTitle("");
        setDescription("");
        toast.success(data.message)
        setLoading(false);
        setRefresh(prev=>!prev);
      } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
      }
  }

  useEffect(()=>{
    axios
      .get(`${server}/tasks/my`, {
        withCredentials: true
      })
      .then((res)=>{
        setTask(res.data.tasks);
      })
      .catch((e)=>{
          toast.error(e.response.data.message);
      })
  },[refresh])

  if(!isAuthenticated){
    return <Navigate to={"/login"}/>
  }

  return (
    <div className="container">
      <div className="login">
        <section>
        <form onSubmit={submitHandler}>
              <input placeholder="Title" type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
              <input placeholder="Description" type="text" value={discription} onChange={(e)=>setDescription(e.target.value)} required/>
              <button disabled={loading} type="submit">Add Task</button>
          </form>
        <section className="todosContainer">
          {
            task.map((i)=>(
              <TaskItem
                key={i._id}
                id={i._id}
                title = {i.title}
                discription = {i.discription}
                isCompleted = {i.isCompleted}
                updateHandler={updateHandler}
                deleteHandler={deleteHandler}
              />
            ))
          }
        </section>
      </section>
    </div>
    </div>
  )
}

export default Home