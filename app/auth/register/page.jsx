'use client'

import { errorAlert, successAlert } from '@/app/tasks/components/Alerts';
import { useState } from 'react';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import { Spinner } from '@/app/components/Spinner';
import Link from 'next/link';


export default function page() {
    const [loading, setLoading] = useState(false);
    const {handleSubmit, formState:{errors}, getValues ,register} = useForm();
    const router = useRouter();
    

    const onSubmit = async (data) => {
        setLoading(true);
        const {password2, ...newData} = data;
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/auth/register`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            })
            const dataResponse = await response.json();
            if(response.status !== 200){
                return errorAlert(dataResponse.message)
            }
            successAlert(dataResponse.message)
            router.push('/');
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false);
        }
    }


  return (
    <div className='w-full h-full flex items-center justify-center'>
        <form 
        className='bg-white w-80 md:w-96 p-4 shadow-xl rounded mx-auto mt-4 flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}>
            <h4 className='text-xl font-semibold text-center'>REGISTER</h4>
            <div className='flex flex-col gap-1'>
                <label htmlFor="">Name</label>
                <input 
                type="text" 
                className='input'
                {...register('name', {
                    required: 'The name is required',
                    minLength: {
                        value: 3,
                        message: 'The name must have at least 3 characters'
                    }
                })}
                />
                {
                    errors.name && <span className='error-message'>{errors.name.message}</span>
                }
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="">Last Name</label>
                <input 
                type="text" 
                className='input'
                {...register('lastName', {
                    required: 'The last name is required',
                    minLength: {
                        value: 3,
                        message: 'the last name must have at least 3 characters'
                    }
                })}
                />
                {
                    errors.lastName && <span className='error-message'>{errors.lastName.message}</span>
                }
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="">Email</label>
                <input 
                type="text" 
                className='input'
                {...register('email', {
                    required: 'The email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email is not valid'
                    },
                    minLength: {
                        value: 3,
                        message: 'The email must have at least 3 characters'
                    }
                })}
                />
                {
                    errors.email && <span className='error-message'>{errors.email.message}</span>
                }
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="">Password</label>
                <input 
                type="password" 
                className='input'
                {...register('password', {
                    required: 'The password is required',
                    minLength: {
                        value: 6,
                        message: 'The password must have at least 6 characters'
                    }
                })}
                />
                {
                    errors.password && <span className='error-message'>{errors.password.message}</span>
                }
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="">Confirm password</label>
                <input 
                type="password" 
                className='input'
                {...register('password2', {
                    required: 'The password is required',
                    minLength: {
                        value: 6,
                        message: 'The password must have at least 6 characters'
                    },
                    validate: {
                        matchesPreviousPassword: (value) => {
                            const { password } = getValues();
                            return password === value || 'Passwords should match!';
                        }
                    }   
                })}
                />
                {
                    errors.password2 && <span className='error-message'>{errors.password2.message}</span>
                }
            </div>
            <button className='btn' type='submit'>
            {
                loading ? <Spinner/> : 'Register'
            }
            </button>
            <Link href='/' className='text-sm text-center'>Login with your account</Link>
        </form>
    </div>
  )
}
