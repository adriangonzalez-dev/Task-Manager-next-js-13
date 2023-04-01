'use client'

import Link from "next/link"
import Swal from "sweetalert2"
import { useTasks } from "../hooks/useTasks"

export default function TaskCard({task}){

  const {tasksReducer} = useTasks();

  const handleDone = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tasks/${task._id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': JSON.parse(localStorage.getItem('token'))
        }
      })
      const data = await response.json();
      const action = {
        type: 'DONE_TASK',
        payload: task._id
      }
      tasksReducer(action);
    } catch (error) {
      console.log(error)
    }
  }



  const handleDelete = async () => {
    try {

      Swal.fire({
        title: 'Are you sure to delete this task?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        background: '#fff',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tasks/${task._id}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': JSON.parse(localStorage.getItem('token'))
            }
          })
          const action = {
            type: 'DELETE_TASK',
            payload: task._id
          }
          tasksReducer(action);
          Swal.fire(
            'Deleted!',
            'Your task has been deleted.',
            'success'
          )
        }
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-white">
    <div className={`h-6 rounded-t-md mt-2 ${task.done ? 'bg-green-600' : 'bg-red-600'}`}></div>
    <div className="bg-white shadow-md rounded px-4 pt-4 pb-4 mb-2 flex flex-col my-2">
      <div className="mb-4 flex justify-between">
        <p className="text-gray-700 text-base">
          {task.title}
        </p>

        <button 
        className={`p-2 rounded duration-300 ease-in-out 
        ${task.done ? 'bg-green-600' : 'bg-red-600 text-slate-50'}`}
        onClick={handleDone}>
        {task.done ? 'Finalizado': 'Pendiente'}</button>

      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray-600 text-xs italic">{task.description}</p>
        <div className="flex items-center">
          <Link href={`tasks/edit/${task._id}`} className="text-indigo-500 inline-flex items-center">
              Edit
          </Link>
          <button 
          className="text-red-500 inline-flex items-center ml-3"
          onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}