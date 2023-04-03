'use client'

import {createContext, useEffect, useReducer, useState} from 'react'

const AuthContext = createContext();


const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': {
            return action.payload;
        }
        case 'LOGOUT': {
            return null;
        }
        default:
            return state;
    }
}

const initialState = null;

export const AuthProvider = ({children}) => {
    const [user, userDispatch] = useReducer(reducer, initialState);

    const getUser = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/auth/user`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem('token'))
            },
            credentials: 'include'
        })
        const data = await response.json();
        userDispatch({
            type: 'LOGIN',
            payload: data.user
        })
    }
    
    useEffect(() => {
        getUser()
    }, [])
    

    return (
        <AuthContext.Provider value={{user, userDispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;