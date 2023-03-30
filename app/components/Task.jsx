'use client'

import Link from "next/link"
import Swal from "sweetalert2"
import { useTasks } from "../hooks/useTasks"

export default function TaskCard({id, title, description}){

  const {tasksReducer} = useTasks()

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
          await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tasks/${id}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const action = {
            type: 'DELETE_TASK',
            payload: id
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
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div className="mb-4">
        <p className="text-gray-700 text-base">
          {title}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray-600 text-xs italic">{description}</p>
        <div className="flex items-center">
          <Link href={`edit/${id}`} className="text-indigo-500 inline-flex items-center">
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
  )
}