'use client'

import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/navigation'
import { useTasks } from '@/app/tasks/hooks/useTasks';
import { successAlert } from '@/app/tasks/components/Alerts';
import { Spinner } from '@/app/components/Spinner';

export default function EditForm({params}) {
  const [task, setTask] = useState();
  const {handleSubmit, formState:{errors}, register} = useForm();
  const {tasks, tasksReducer} = useTasks();
  const [loading, setLoading] = useState(false);
  const {id} = params;
  const router = useRouter();

  const getTask = async (idTask) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tasks/${idTask}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    const task = data.task;
    setTask(task);
  }

  useEffect(() => {
    getTask(id);
  }, [id])


  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tasks/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': JSON.parse(localStorage.getItem('token'))
        },
        body: JSON.stringify(data)
      })
      const dataResponse = await response.json();

      const task = dataResponse.task;
      const action = {
        type:'UPDATE_TASK',
        payload: task
      }
      tasksReducer(action);
      successAlert('Task updated successfully')
      setLoading(false);
      router.push('tasks');
    } catch (error) {
      console.log(error)
    }
    
  }

  const handleBack = () => {
    router.push('/');
  }

  return (

    <form 
    className='flex flex-col gap-2 w-full'
    onSubmit={handleSubmit(onSubmit)}>
    <h4 className='text-xl font-semibold text-center'>EDIT TASK</h4>
      <div className='flex flex-col gap-1'>
        <label className='text-gray-900'>Title</label>
        <input 
        defaultValue={task?.title}
        type="text" 
        className='input'
        {...register('title',{
          minLength: {
            value: 3,
            message: 'Min length is 3'
          }
        }
        )}
        />
        {
          errors.title && <span className='error-message'>{errors.title.message}</span>
        }
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-gray-900'>Description</label>
        <textarea 
        defaultValue={task?.description}
        className='input' 
        cols="30" 
        rows="5"
        {...register('description',{
          minLength: {
            value: 3,
            message: 'Min length is 3'
          }
        })}></textarea>
        {
          errors.description && <span className='error-message'>{errors.description.message}</span>
        }
      </div>
      <div className='flex flex-col gap-1'>
        <label className='text-gray-900'>Prioridad</label>
        <select 
        name="" 
        id="" 
        defaultValue={task?.priority}
        className='input'
        {...register('priority')}>
          <option value="" hidden>Selecciona la prioridad</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        {
          errors.priority && <span className='error-message'>{errors.priority.message}</span>
        }
      </div>
      <button type="submit" className='btn'>{loading ? <Spinner/> : 'EDIT'}</button>
      <button 
      onClick={handleBack}
      className="btn">Back to tasks</button>
    </form>

  )
}

