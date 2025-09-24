import LeftSide from '@/components/admin/LeftSide'
import React from 'react'

export default function layout({ children, }: { children: React.ReactNode }) {
  return (
    <div className='flex w-full h-screen ' >
          <LeftSide  className='w-[15%] h-full fixed   ' />
       
            {children}
          
    </div>

  )
}
