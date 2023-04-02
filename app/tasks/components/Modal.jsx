import {useForm} from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { errorAlert, successAlert } from './Alerts';
import { useState } from 'react';
import { Spinner } from '@/app/components/Spinner';

export default function Modal() {
    const router = useRouter()
    const {handleSubmit, formState:{errors}, register} = useForm();
    const [loading, setLoading] = useState(false);
    
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/auth/recovery`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const dataResponse = await response.json();
            if(response.status !== 200){
                errorAlert(dataResponse.message)
                setLoading(false);
                return;
            }

            successAlert('Check your email to reset your password');
            router.push('/');
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div
      data-te-modal-init
      className="fixed top-20 left-0 z-[1055] hidden h-full w-full outline-none"
      id="staticBackdrop"
      data-te-backdrop="static"
      data-te-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <form
        data-te-modal-dialog-ref
        className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 ">
            <h5
              className="text-xl font-medium leading-normal text-slate-800"
              id="exampleModalLabel"
            >
              Recovery password
            </h5>
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-te-modal-dismiss
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div data-te-modal-body-ref className="relative p-4 flex flex-col gap-2">
            
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700"
                >
                    Ingrese su email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="input w-full"
                    {...register('email',{
                        required: 'El email es requerido',
                        pattern: {
                            value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message:'El email no es válido'
                    }
                    })}
                />
                {
                    errors.email && <span className="error-message">{errors.email.message}</span>
                }

          </div>
          <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4">
            <button
              type="button"
              className="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
              data-te-modal-dismiss
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
                {loading ? <Spinner /> : 'Recovery'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
