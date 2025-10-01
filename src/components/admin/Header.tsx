"use client"
import React from 'react'
import Logo2 from '../svgs/logo2'
import { FaBell, FaUserCog, FaFolder } from 'react-icons/fa'
export default function Header({title }:{title?:string}) {
  return (
    <header className='h-[10vh] py-4   bg-white flex justify-between items-center w-full px-8  border-b border-b-gray-200 '>
   <div className='flex justify-between ml-4 h-[10vh] w-[35vw]    gap-10  items-center  '>
     <Logo2 className='bg-dark   self-center' width={150} height={"100%"} />
    <h1 className='title    capitalize font-bold text-2xl text-dark'>

        {title}
    </h1>
   </div>
    <nav className=' flex h-[100%]  items-center justify-between gap-4 '>
        {/* Notification Icons */}
        <div className="flex items-center gap-4">
  
          

    
        </div>
        
        {/* Logout Button */}
        <button className='bg-transparent text-[var(--dark-blue)] border border-[var(--dark-blue)] px-4 py-2 rounded-md hover:bg-[var(--dark-blue)] hover:text-white transition-all duration-200 font-medium text-sm'>
            Uitloggen
        </button>
    </nav>

         </header>
  )
}
