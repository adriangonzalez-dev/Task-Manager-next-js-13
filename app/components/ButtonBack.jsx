'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const handleBack = (cb) => {
    cb.push('/')
  }

export default function ButtonBack() {
    const router = useRouter()
    
  return (
    <button className="btn" onClick={()=>handleBack(router)}>Volver</button>
  )
}

