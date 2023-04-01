'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import useAuth from './tasks/hooks/useAuth';

export default function Login() {
  const {handleSubmit, formState:{errors}, register} = useForm();
  const {user, userDispatch} = useAuth();
  const [backErrors, setBackErrors] = useState(null);

  const router = useRouter();

  const onSubmit = async (data) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/auth/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const dataResponse = await response.json();

    if(dataResponse.message){
      setBackErrors(dataResponse.message);
      return;
    }
    setBackErrors(null);
    localStorage.setItem('token', JSON.stringify(dataResponse.token));

    userDispatch({
      type: 'LOGIN',
      payload: dataResponse.user
    })

    router.push('/tasks');
  }

  if(user){
    return router.push('/tasks');
  }

  return (
    <form 
    className='bg-white w-72 p-4 shadow-xl rounded mx-auto mt-4 flex flex-col gap-4'
    onSubmit={handleSubmit(onSubmit)}>
    <h4 className='text-xl font-semibold text-center'>LOGIN</h4>
      {backErrors && <span className='error-message'>{backErrors}</span>}
        <div className='flex flex-col gap-1'> 
            <label htmlFor="email" className='text-gray-900'>Email</label>
            <input 
            type="text" 
            id="email" 
            className='input'
            {...register('email',{
                required: {
                    value: true,
                    message: 'El email es obligatorio'
                },
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'No es un email válido'
                } 
            })}
                
            />
            {
              errors.email && <span className='error-message'>{errors.email.message}</span>
            }
        </div>
        <div className='flex flex-col gap-1'>
            <label htmlFor="password" className='text-gray-900'>Password</label>
            <input 
            type="password" 
            id="password" 
            className='input'
            {...register('password',{
                required: {
                    value: true,
                    message: 'El password es obligatorio'
                },
                minLength: {
                    value: 6,
                    message: 'El password debe tener al menos 6 caracteres'
                }
            })}
            />
            {
              errors.password && <span className='error-message'>{errors.password.message}</span>
            }
        </div>
        <button className='btn'>LOGIN</button>
        <div className='flex justify-between w-full text-xs'>
          <Link href='auth/recovery'>Recuperar contraseña</Link>
          <Link href='auth/register'>Registrarse</Link>
        </div>
    </form>
  )
}
