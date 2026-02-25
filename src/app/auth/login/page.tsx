'use client'
import React from 'react'
import Login from '@/components/auth/Login'

export default function page() {
  return (
    <div className='w-full md:w-[50vw] h-full md:h-full flex justify-center items-center px-4 md:px-0'>
      <Login />
    </div>
  )
}
