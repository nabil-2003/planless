"use client"
import React from 'react'
import { FaBell, FaUserCog, FaFolder } from 'react-icons/fa'
export default function Header({title }:{title?:string}) {
  return (
    <header className='h-[8vh]   bg-white flex justify-between items-center w-full px-8  border-b border-b-gray-200 '>

    <h1 className='title font-bold text-2xl text-dark'>
        {title}
    </h1>
    <nav className=' flex h-[100%]  items-center justify-between gap-4 '>
        {/* Notification Icons */}
        <div className="flex items-center gap-4">
          {/* Bell notification with badge */}
          <div className="relative cursor-pointer" onClick={() => console.log('Bell notifications clicked')}>
            <FaBell className="text-gray-400 text-lg hover:text-gray-600 transition-colors duration-200" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px] hover:bg-red-600 transition-colors duration-200">
              3
            </span>
          </div>
          
          {/* User settings */}
          <div className="relative cursor-pointer" onClick={() => console.log('User settings clicked')}>
            <FaUserCog className="text-gray-400 text-lg hover:text-gray-600 transition-colors duration-200" />
          </div>
          
          {/* Folder with badge */}
          <div className="relative cursor-pointer" onClick={() => console.log('Folder notifications clicked')}>
            <FaFolder className="text-gray-400 text-lg hover:text-gray-600 transition-colors duration-200" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px] hover:bg-red-600 transition-colors duration-200">
              17
            </span>
          </div>
        </div>
        
        {/* Logout Button */}
        <button className='bg-transparent text-[var(--dark-blue)] border border-[var(--dark-blue)] px-4 py-2 rounded-md hover:bg-[var(--dark-blue)] hover:text-white transition-all duration-200 font-medium text-sm'>
            Uitloggen
        </button>
    </nav>

         </header>
  )
}
