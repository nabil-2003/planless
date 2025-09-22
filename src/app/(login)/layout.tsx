import React from 'react'
import LogoPart from '@/components/LogoPart'
export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='w-full  md:flex-row flex-col  flex justify-center h-[100vh] '>
        <LogoPart  />
      {children}
    </div>
  )
}
