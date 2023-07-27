const TaskItem = ({title, discription, isCompleted, updateHandler, deleteHandler, id}) => {
  return (

    <div className='todo'>
        <div>
            <h4>{title}</h4>
            <p>{discription}</p>
        </div>
        <div>
          <input onChange={()=>updateHandler(id)} type="checkbox" checked={isCompleted}/>
          <button onClick={()=>deleteHandler(id)} className="btn">Delete</button>
        </div>
    </div>
  )
}

export default TaskItem