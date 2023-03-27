'use client'
import {useRouter} from 'next/navigation'
import { successAlert } from '@/app/components/Alerts';
import { useTasks } from '@/app/hooks/useTasks'
import { useForm } from 'react-hook-form'

export default function TaskForm() {
  const {handleSubmit, formState:{errors}, register, reset} = useForm();
  const {tasksReducer,lastId} = useTasks();
  const router = useRouter();
  const createTask = async (data) => {
    const action = {
      type: 'ADD_TASK',
      payload: {
        id: lastId + 1,
        title: data.title,
        description: data.description
      }
    }

    tasksReducer(action);
    successAlert('Task created successfully');
    router.push('/');
  }

  const handleBack = () => {
    router.push('/');
  }
  return (
    <form 
    onSubmit={handleSubmit(createTask)}
    className='flex flex-col gap-2 w-full '>
    <h4 className='text-xl font-semibold text-center'>ADD NEW TASK</h4>
      <div className='flex flex-col gap-1'>
        <label className='text-gray-900'>Title</label>
        <input 
        type="text" className='input'
        {...register('title',{
          required: {
            value: true,
            message: 'Title is required'
          },
          minLength: {
            value: 3,
            message: 'Min length is 3'
          }
        })}
        />
        {
          errors.title && <span className='error-message'>{errors.title.message}</span>
        }
      </div>
      <div className='flex flex-col gap-1'>
        <label className='text-gray-900'>Description</label>
        <textarea 
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
      <button type="submit" className='btn'>Save</button>
      <button 
      onClick={handleBack}
      className="btn">Back to tasks</button>
    </form>
  )
}
