'use client'

import { Spinner } from '@/app/components/Spinner';
import { errorAlert, successAlert } from '@/app/tasks/components/Alerts';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function page() {
    const {handleSubmit, formState:{errors}, register, getValues} = useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const recoveryPassword = async (data) => {
        setLoading(true);
        const {password2, password} = data;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/auth/reset`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({
                    password,
                })
            })
            const dataResponse = await response.json();
            if(response.status !== 200){
                setLoading(false);
                errorAlert(dataResponse.message)
                return;
            }
            successAlert(dataResponse.message);
            router.push('/');
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);

        }
    }


    useEffect(() => {
        if(!token){
            return router.push('/')
        }
    },[token])
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
        <form  
        onSubmit={handleSubmit(recoveryPassword)}
        className='bg-white w-72 p-4 shadow-xl rounded mx-auto mt-4 flex flex-col gap-4'>
        <h4 className='text-xl font-semibold text-center'>Change Password</h4>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor="">Nueva contraseña</label>
                <input 
                type="password" 
                className='input'
                {...register('password', {
                    required: 'La contraseña es requerida',
                    minLength: {
                        value: 6,
                        message: 'La contraseña debe tener al menos 6 caracteres'
                    }
                })}
                />
                { errors.password && <span className='error-message'>{errors.password.message}</span> }
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor="">Confirmar contraseña</label>
                <input 
                type="password" 
                className='input'
                {...register('password2', {
                    required: 'La confirmación es requerida',
                    minLength: {
                        value: 6,
                        message: 'La contraseña debe tener al menos 6 caracteres'
                    },
                    validate: {
                        matchesPreviousPassword: (value) => {
                            const { password } = getValues();
                            return password === value || "Las contraseñas no coinciden";
                        }
                    }
                })}
                />
                {
                    errors.password2 && <span className='error-message'>{errors.password2.message}</span>
                }
            </div>
            <button type='submit' className='btn'>Change</button>
        </form>
    </div>
  )
}
