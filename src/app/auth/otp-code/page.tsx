"use client"
import React from 'react'
import Link from 'next/link'
import LeftArrowIcon from '@/components/svgs/LeftArrowIcon'
import OTPForm from '@/components/auth/OTPForm'

export default function page() {
  return (
    <div className='w-full md:w-[50vw] h-full flex justify-center items-center px-4 md:px-0'>
    <div className="flex flex-col w-full sm:w-[80%] md:w-[70%] max-w-md">
      <Link href="/auth/forget-password" className="mb-6 text-black font-normal flex items-center hover:underline transition-all">
        <LeftArrowIcon className="inline-block scale-75 mr-2" />
        <span className='text-xl font-bold'>Wachtwoord opnieuw instellen</span>
      </Link>

      <p className="text-base text-gray-600 mb-8">
        Voer de 6-cijferige verificatiecode in die naar je e-mail is verzonden om je wachtwoord te wijzigen.
      </p>
      <OTPForm />
     
    </div>
    </div>
  )
}
