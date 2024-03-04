import { create } from "zustand";


export const useTodoStore = create((set, get)=>({
    tasks : JSON.parse(localStorage.getItem('tasks')) || [],
    addTask : (newTask)=>{
        const updatedTasks = [...get().tasks, newTask].slice(0).reverse()
        
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
        set({tasks: updatedTasks})
    }, 
    deleteTask : (id)=>{  
        const existingTasks = (get().tasks)
        const updatedTasks = existingTasks.filter((task,i)=>i != id)
        set({tasks: updatedTasks})
        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
        
    }, 
    updateTask : (id, updatedTask)=>{
        const existingTasks = get().tasks
       const updated = existingTasks.map((task,i)=>{
            if (id === i) {
              return  ({...task,content:updatedTask.content, status:updatedTask.status, date:updatedTask.date});
            }
            return task
        })
        set({tasks:updated})
        localStorage.setItem('tasks', JSON.stringify(updated))
    }





}))
