import React from 'react'
import LogoPart from '@/components/auth/LogoPart'
export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='w-full flex flex-col md:flex-row justify-center min-h-screen h-auto md:h-screen overflow-x-hidden'>
        <LogoPart  />
      {children}
    </div>
  )
}
