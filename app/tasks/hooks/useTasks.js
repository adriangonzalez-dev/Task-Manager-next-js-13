
import TaskContext from '@/context/TaskContext'
import { useContext } from 'react'

export const useTasks = () => {
  return useContext(TaskContext)
}
