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
            return state.map(task => task.id === action.payload.id ? action.payload : task)
        }
            
        case 'DELETE_TASK':{
            return state.filter(task => task.id !== action.payload)
        }
        default:
            return state;
    }
}

const initialState = []

export function TaskProvider({children}) {

    const [tasks, tasksReducer] = useReducer(reducer, initialState);

    const getTasks = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tasks`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        tasksReducer({
            type: 'GET_TASKS',
            payload: data.tasks
        })
    }

    useEffect(() => {
        getTasks();
    },[])

    useEffect(() => {
    },[tasks])

  return (
    <TaskContext.Provider value={{tasks, tasksReducer}}>
        {children}
    </TaskContext.Provider>
  )
}

export default TaskContext;
