import React, { useState } from 'react'
import { useTodoStore } from '../store/useTodoStore'

export default function TodoContainer() {
    const todos = useTodoStore(state=>state.tasks)
    const addTask = useTodoStore(state=>state.addTask)
    const remove = useTodoStore(state=>state.deleteTask)
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

  return (
    <div className='p-5'>

    <div className="rounded-md shadow-lg lg:w-1/2 xl:w-1/2 md:w-1/2 m-auto space-y-1 p-2 mt-10 border border-purple-300 font-[popins] h-96 overflow-y-hidden">

        <h1 className='font-semibold text-2xl  text-center text-purple-400'>TODO List</h1>
        <div className='space-y-2 p-2'>
        <input  value={task.content} onChange={handleChange} className='border-b-2 w-full p-2 focus:outline-none' type="text" placeholder='what would you like to add? ' name="content" id="" />
        <input hidden value={task.status} className='' onChange={handleChange}  type="text" name="status" id="" />
        <input hidden value={task.date} className='' onChange={handleChange}  type="text" name="date" id="" />

        <button onClick={handleClick} className='px-6 py-1 rounded-lg shadow-md border border-green-500 hover:text-white hover:bg-green-400'>Add</button>
        </div>


{todos.map((todo,i)=>{
    return <div key={i} className='rounded p-3 border cursor-pointer border-purple-200 bg-gray-100'>
        <h1 className='capitalize text-lg flex text-purple-800 font-medium justify-between '>{todo.content}
        <span onClick={()=>deleteTask(i)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-trash3 cursor-pointer inline-block text-red-500" viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
        </svg>

             {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-square-fill inline-block" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
            </svg> */}

        </span>  
        </h1>
        <p className='text-gray-600 text-sm'>{todo.date}</p>
        {/* <p className='text-gray-600 text-md capitalize'>{todo.status}</p> */}
        </div>
})}

    </div>




    </div>
  )
}
