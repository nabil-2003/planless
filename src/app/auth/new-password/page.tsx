import NewpassPage from '@/components/auth/NewPassPage'
import Reset from '@/components/auth/Reset'
import React from 'react'

export default function page() {



  return (
     <div className=' md:w-[50vw] md:h-full h-[70%]  flex w-[100vw]  justify-center items-center'>
       {/* <Reset /> new pass */}
       <NewpassPage />
    </div>
  )
}
