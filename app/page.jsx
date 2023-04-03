'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form'
import useAuth from './tasks/hooks/useAuth';
import { Spinner } from './components/Spinner';
import Modal from './tasks/components/Modal';
import { useSocialLogin } from './services/useSocialLogin';

export default function Login() {
  const {handleSubmit, formState:{errors}, register} = useForm();
  const {user, userDispatch} = useAuth();
  const [backErrors, setBackErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const {loginWithGoogle} = useSocialLogin();

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
                    message: 'The email is required'
                },
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email is not valid'
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
                    message: 'The password is required'
                },
                minLength: {
                    value: 6,
                    message: 'The password must be at least 6 characters'
                }
            })}
            />
            {
              errors.password && <span className='error-message'>{errors.password.message}</span>
            }
        </div>
        <button onClick={loginWithGoogle} type="button" className="btn flex items-center justify-center">
          <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
          Sign in with Google
        </button>
        <button className='btn'>{loading ? <Spinner/> :'LOGIN'}</button>
        <div className='flex justify-between w-full text-xs'>
          <button 
          type='button'
          data-te-toggle="modal"
          data-te-target="#staticBackdrop"
          data-te-ripple-init
          data-te-ripple-color="light">Recovery account</button>
          <Link href='auth/register'>Register</Link>
        </div>
        
    </form>
      {/* <!-- Modal --> */}
      <Modal/>
    </div>
  )
}
