import React from 'react'
import Image from 'next/image'

export default function LogoPart() {
  return (
    <div className='flex md:w-[50vw] md:h-full h-[30%] items-center bg-blue w-[100vw] justify-center'>
      {/* Company logo */}
      <Image src={'/logo.png'} width={200} height={200} alt='logo' />   
    </div>
  )
}
