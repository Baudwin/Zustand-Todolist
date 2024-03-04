import { create } from "zustand";


export const useTodoStore = create((set, get)=>({
    tasks : JSON.parse(localStorage.getItem('tasks')) || [],
    addTask : (newTask)=>{
        const updatedTasks = [...get().tasks, newTask]
        
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
        set({tasks: updatedTasks})
    }, 
    deleteTask : (id)=>{  
        const existingTasks = (get().tasks)
        const updatedTasks = existingTasks.filter((task,i)=>i != id)
        set({tasks: updatedTasks})
        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
        
    }
}))
