'use client'

import Link from "next/link"
import Swal from "sweetalert2"
import { useTasks } from "../hooks/useTasks"

export default function TaskCard({task}){

  const {tasksReducer} = useTasks();

  const stylePriority = ()=>{
    if(task.priority === 'baja'){
      return 'bg-success-100 text-success-700'
    }else if(task.priority === 'media'){
      return 'bg-warning-100 text-warning-700'
    }else{
      return 'bg-danger-100 text-danger-700'
    }
  }

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
    <div className="flex justify-center">
      <div
        className="block w-60 md:w-96 rounded-lg bg-white text-center shadow-lg">
        <div
          className={`relative border-b-2 py-3 px-6 rounded-md ${task.done ? 'bg-success-100 border-success-200 text-success-700' : 'bg-danger-100 border-danger-200 text-danger-700'}`}>
          <span>{task.done ? 'Done' : 'Pending'}</span>
          <span className="text-neutral-800 font-medium absolute right-2 top-1">
          <button 
          className="border-danger-200 bg-danger-100 text-danger-700 rounded-md outline-danger-200 p-2"
          onClick={handleDelete}
          >X</button>
          </span>
        </div>
        <div className="p-6">
          <h5
            className="mb-2 text-xl font-medium leading-tight text-neutral-800">
            {task.title}
          </h5>
          <p className="mb-4 text-base text-neutral-600">
            {task.title}
          </p>
          <div className="flex items-center justify-center gap-2 mb-2">
            <label htmlFor="check" className={task.done ? 'text-success-700' : 'text-danger-700'}>
              Completed
            </label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={handleDone}
                id="check"
              />
          </div>
          <div
            className={`mb-4 rounded-lg p-2 text-base ${stylePriority()}`}
            role="alert">
            Priority: {task.priority}
          </div>
          <Link href={`/tasks/edit/${task._id}`}
            type="button"
            className="btn">
            EDIT
          </Link>
        </div>
        <div
          className="border-t-2 border-neutral-100 py-3 px-6  ">
          Created at {task.createdAt.split('T')[0]}
        </div>
      </div>
    </div>
  )
}


