'use client'

import Header from './components/Header';
import TaskCard from './components/Task';
import useAuth from './hooks/useAuth';
import { useTasks } from './hooks/useTasks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const {tasks,tasksReducer} = useTasks();
  const {user} = useAuth();
  
  useEffect(() => {
      const getTasks = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tasks`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': JSON.parse(localStorage.getItem('token'))
          }
        })
        const data = await response.json();
        tasksReducer({
            type: 'GET_TASKS',
            payload: data.tasks
          })
        }
      getTasks();
    },[])
    useEffect(() => {
      if(!user){
        router.push('/')
      }
    },[user])

    return (
    <>
    <Header/>
    <main className='p-2 flex flex-wrap items-center justify-center gap-2'>
      {
        tasks.length === 0 && <div className='flex flex-col items-center justify-center h-full'>
          <h4 className='text-xl my-2'>NO PENDING TASKS</h4>
        </div>
      }
      {
        tasks.map(task => <TaskCard 
        key={task._id} 
        task={task}
        />)
      }
    </main>
    </>

  )
}
