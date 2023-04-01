'use client'

import {createContext, useEffect, useReducer, useState} from 'react'

const TaskContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_TASKS': {
            return action.payload;
        }
        case 'ADD_TASK': {
            return [...state, action.payload]

        }
        case 'UPDATE_TASK': {
            
            const updatedTasks = state.map(task => {
                if(task._id === action.payload._id){
                    return action.payload
                }
                return task
            })
            return updatedTasks
        }
            
        case 'DELETE_TASK':{
            return state.filter(task => task._id !== action.payload)
        }

        case 'DONE_TASK':{
            const updatedTasks = state.map(task => {
                if(task._id === action.payload){
                    task.done = true;
                    return task
                }
                return task
            })
            return updatedTasks
        }
        default:
            return state;
    }
}

const initialState = []

export function TaskProvider({children}) {

    const [tasks, tasksReducer] = useReducer(reducer, initialState);

  return (
    <TaskContext.Provider value={{tasks, tasksReducer}}>
        {children}
    </TaskContext.Provider>
  )
}

export default TaskContext;
