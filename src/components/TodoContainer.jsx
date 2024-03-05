import React, { useState } from 'react'
import { useTodoStore } from '../store/useTodoStore'

export default function TodoContainer() {
    let todos = useTodoStore(state=>state.tasks)
    const addTask = useTodoStore(state=>state.addTask)
    const remove = useTodoStore(state=>state.deleteTask)
    const updateTask = useTodoStore(state=>state.updateTask)
    const [editing, setEditing] = useState(false)
    const [taskID, setTaskID]= useState(null)

    let date = new Date()
    const today =`${date.toLocaleDateString()}, ${date.toLocaleTimeString()} `


    const [task,setTask] = useState({
        content: "", 
        status : "pending",
        date : today,
    })

    const handleChange = (e)=>{
        const {name, value} = e.target
       setTask({...task, [name]:value})
    }

    const handleClick = ()=>{
        if (task.content === "") {
         return  alert("task content cannot be empty")
        }
        addTask(task)
        setTask({
            content:"",
            status : "pending",
            date : today
        })
    }

    const deleteTask = (id)=>{
        remove(id)
    }

    const editTask =(id, content)=>{
        setEditing(true)
        setTaskID(id)
        setTask({
            content:content,
            status : "pending",
            date : today
        })
    }

    const cancelEdit = ()=>{
        setEditing(false)
        setTask({
            content:"",
            status : "pending",
            date : today
        })
    }

    const update = ()=>{
        if (task.content === "") {
            return  alert("task content cannot be empty")
           }
        updateTask(taskID, task)
        setTask({
            content:"",
            status : "pending",
            date : today
        })
        setEditing(false)
    }

  return (
    <div className='p-5  bg-[url("/images/bg2.jpg")] min-h-screen bg-center bg-no-repeat bg-gray-900 bg-cover'>
        <h1 className='font-semibold text-3xl text-center text-black font-mono '><span className='underline'>TO</span> <span className='underline'>DO</span>  LIST</h1>

    <div  className=" lg:w-1/2 xl:w-1/2 md:w-1/2 m-auto space-y-4 p-1 mt-7 font-[popins]  ">

        <div className='space-y-2 p-2'>
        <input  value={task.content} onChange={handleChange} className='border-b-2 rounded-lg shadow-sm w-full p-4 focus:outline-none' type="text" placeholder='what would you like to add? ' name="content" id="" />
        <input hidden value={task.status} className='' onChange={handleChange}  type="text" name="status" id="" />
        <input hidden value={task.date} className='' onChange={handleChange}  type="text" name="date" id="" />

        <button  onClick={editing ? update : handleClick} className='px-9 py-2 rounded-lg shadow-md border border-purple-500 hover:text-white hover:bg-purple-400'> {editing ? 'Update' : "Add"}</button>
       {editing ?<button onClick={cancelEdit} className='px-9 py-2 rounded-lg shadow-md border border-red-500 hover:text-white ml-2 hover:bg-red-400'> Cancel</button>:null } 
        </div>

    <div style={{height:'500px'}} className='no-scrollbar space-y-1.5 overflow-y-scroll'>
{todos.map((todo,i)=>{
  return  <div key={i} className='rounded-lg p-3 border shadow-xl cursor-pointer border-purple-200 bg-gray-100'>
     <h1 className=' text-lg flex text-purple-800 font-medium justify-between '>{todo.content}
        <span className='space-x-2' >

<div onClick={()=>editTask(i,todo.content)}  className=' inline-block'>
    <svg  xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
        </svg>
</div>
   
<div onClick={()=>deleteTask(i)} className='inline-block'>
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className={`bi bi-trash3 cursor-pointer text-red-500 ${editing?'hidden':null}`} viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
        </svg>
</div>

        </span>  
        </h1>
        <div className=''>
        <p className='text-gray-600 text-sm '>{todo.date}</p>
        </div>
        </div>
})}

</div>

    </div>




    </div>
  )
}
