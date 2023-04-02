'use client'

import { errorAlert, successAlert } from '@/app/tasks/components/Alerts';
import { useState } from 'react';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import { Spinner } from '@/app/components/Spinner';
const avatars =[
    'Peanut','Simon','Abby','Rascal','Sasha','Boo','Lola','Sophie','Cuddles','Spooky',
    'Max','Lilly','Tiger','Molly','Kitty','Mimi','Milo','Luna','Snowball','Leo'
]

export default function page() {
    const [loading, setLoading] = useState(false);
    const {handleSubmit, formState:{errors}, getValues ,register} = useForm();
    const router = useRouter();
    const randomAvatar = () => {
        const randomIndex = Math.floor(Math.random() * avatars.length);

        return avatars[randomIndex];
    }

    const onSubmit = async (data) => {
        setLoading(true);
        data.avatar = randomAvatar();
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
                <label htmlFor="">Nombre</label>
                <input 
                type="text" 
                className='input'
                {...register('name', {
                    required: 'El nombre es requerido',
                    minLength: {
                        value: 3,
                        message: 'El nombre debe tener al menos 3 caracteres'
                    }
                })}
                />
                {
                    errors.name && <span className='error-message'>{errors.name.message}</span>
                }
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="">Apellido</label>
                <input 
                type="text" 
                className='input'
                {...register('lastName', {
                    required: 'El apellido es requerido',
                    minLength: {
                        value: 3,
                        message: 'El apellido debe tener al menos 3 caracteres'
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
                    required: 'El email es requerido',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'No es un email válido'
                    },
                    minLength: {
                        value: 3,
                        message: 'El email debe tener al menos 3 caracteres'
                    }
                })}
                />
                {
                    errors.email && <span className='error-message'>{errors.email.message}</span>
                }
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="">Contraseña</label>
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
                {
                    errors.password && <span className='error-message'>{errors.password.message}</span>
                }
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="">Repite tu contraseña</label>
                <input 
                type="password" 
                className='input'
                {...register('password2', {
                    required: 'La contraseña es requerida',
                    minLength: {
                        value: 6,
                        message: 'La contraseña debe tener al menos 6 caracteres'
                    },
                    validate: {
                        matchesPreviousPassword: (value) => {
                            const { password } = getValues();
                            return password === value || 'Las contraseñas no coinciden';
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
        </form>
    </div>
  )
}
