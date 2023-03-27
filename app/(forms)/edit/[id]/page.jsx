'use client'

import { successAlert } from '@/app/components/Alerts';
import { useTasks } from '@/app/hooks/useTasks';
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/navigation'

export default function EditForm({params}) {
  const [task, setTask] = useState();
  const {handleSubmit, formState:{errors}, register} = useForm();
  const {tasks, tasksReducer} = useTasks();
  const {id} = params;
  const router = useRouter();

  const getTask = (idTask) => {
    const task = tasks.find(task => +task.id === +idTask);
    setTask(task);
  }

  useEffect(() => {
    getTask(id);
  }, [id])


  const onSubmit = (data) => {
    const action = {
      type:'UPDATE_TASK',
      payload: {
        ...task,
        ...data
      }
    }
    tasksReducer(action);
    successAlert('Task updated successfully')
    router.push('/');
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
          required: {
            value: true,
            message: 'Title is required'
          },
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
          required: {
            value:true,
            message: 'Description is required'
          },
          minLength: {
            value: 3,
            message: 'Min length is 3'
          }
        })}></textarea>
        {
          errors.description && <span className='error-message'>{errors.description.message}</span>
        }
      </div>
      <button type="submit" className='btn'>Edit</button>
      <button 
      onClick={handleBack}
      className="btn">Back to tasks</button>
    </form>

  )
}

