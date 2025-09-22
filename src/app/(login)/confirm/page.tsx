"use client"
import React from 'react'
import Link from 'next/link'
import LeftArrowIcon from '@/components/svgs/LeftArrowIcon'
import OTPForm from '@/components/OTPForm'

export default function page() {
  return (
    <div className=' md:w-[50vw] md:h-full h-[70%]  flex w-[100vw]  justify-center items-center'>
    <div className="flex flex-col w-[70%]">
      <Link href="/reset" className="mb-4 text-dark-blue font-bold flex items-center">
        <LeftArrowIcon className="inline-block scale-75 mr-2" /> Terug
      </Link>

      <h1 className="text-3xl font-bold mb-6">Wachtwoord opnieuw instellen?</h1>
      <p className="text-lg mb-4">
  voer de 6-cijfrige verificatiecode in die naar je e-mail is verzonden om je wachtwoord te wijzigen.
      </p>
      <OTPForm />
     
    </div>
    </div>
  )
}
