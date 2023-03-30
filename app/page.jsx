'use client'

import { useTasks } from './hooks/useTasks'
import TaskCard from './components/Task';

export default function Home() {
  const {tasks} = useTasks();
  return (
    <main >

      {
        tasks.length === 0 && <div className='flex flex-col items-center justify-center h-full'>
          <h4 className='text-xl my-2'>NO PENDING TASKS</h4>
        </div>
      }
      {
        tasks.map(task => <TaskCard 
        key={task._id} 
        id={task._id}
        title={task.title}
        description={task.description}
        />)
      }
    </main>
  )
}
