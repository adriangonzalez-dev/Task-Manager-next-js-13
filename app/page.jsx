'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form'
import useAuth from './tasks/hooks/useAuth';
import { Spinner } from './components/Spinner';
import Modal from './tasks/components/Modal';

export default function Login() {
  const {handleSubmit, formState:{errors}, register} = useForm();
  const {user, userDispatch} = useAuth();
  const [backErrors, setBackErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
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
        setLoading(false);
        return;
      }
      setBackErrors(null);
      localStorage.setItem('token', JSON.stringify(dataResponse.token));
  
      userDispatch({
        type: 'LOGIN',
        payload: dataResponse.user
      })
      router.push('/tasks');
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user){
      router.push('/tasks');
    }
  }, [user])

  return (
    <div className='h-full w-full flex items-center justify-center'>
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
        <button className='btn'>{loading ? <Spinner/> :'LOGIN'}</button>
        <div className='flex justify-between w-full text-xs'>
          <button 
          type='button'
          data-te-toggle="modal"
          data-te-target="#staticBackdrop"
          data-te-ripple-init
          data-te-ripple-color="light">Recuperar contraseña</button>
          <Link href='auth/register'>Registrarse</Link>
        </div>
        
    </form>
      {/* <!-- Modal --> */}
      <Modal/>
    </div>
  )
}
