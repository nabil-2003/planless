import React from 'react'
import Image from 'next/image'

export default function LogoPart() {
  return (
    <div className='flex w-full md:w-[50vw] h-48 md:h-full items-center bg-blue justify-center'>
      {/* Company logo */}
      <Image 
        src={'/logo.png'} 
        width={200} 
        height={200} 
        alt='logo' 
        className='w-[120px] h-[120px] md:w-[200px] md:h-[200px] object-contain' 
      />   
    </div>
  )
}
