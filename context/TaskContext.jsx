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
    const [lastId, setLastId] = useState(0)

    const getLastId = () => {
        const id =  tasks.length > 0 ? tasks[tasks.length - 1].id : 0;
        setLastId(id);
    }

    const getTasks = () => {
        const localTasks = localStorage.getItem('tasks');
        if(localTasks){
            return JSON.parse(localTasks);
        }
        return [];
    }

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    useEffect(() => {
        const localTasks = getTasks();
        if(localTasks.length > 0){
            tasksReducer({
                type: 'GET_TASKS',
                payload: localTasks
            })
        }
    },[])

    useEffect(() => {
        saveTasks();
        getLastId();
    },[tasks])

  return (
    <TaskContext.Provider value={{tasks, tasksReducer, lastId}}>
        {children}
    </TaskContext.Provider>
  )
}

export default TaskContext;
