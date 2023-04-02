'use client'
import { Spinner } from './components/Spinner'

export default function loading() {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
        <p>Cargando...</p>
        <Spinner/>
    </div>
  )
}
