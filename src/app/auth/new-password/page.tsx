import NewpassPage from '@/components/auth/NewPassPage'
import Reset from '@/components/auth/Reset'
import React from 'react'

export default function page() {



  return (
     <div className='w-full md:w-[50vw] h-full flex justify-center items-center px-4 md:px-0'>
       {/* <Reset /> new pass */}
       <NewpassPage />
    </div>
  )
}
