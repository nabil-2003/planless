'use client'
import React from 'react'
import { 
  FaUsers, 
  FaUserTie, 
  FaDollarSign, 
  FaCog,
  FaTh,
  FaFileAlt
} from 'react-icons/fa';
import Logo2 from '../svgs/logo2'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LeftSide({ className }: { className?: string }) {
    const classes = `flex flex-col   ${className}`
    const pathname = usePathname()
    
    // Helper function to determine if a menu item is active
    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(path + '/')
    }
    
    // Helper function to get menu item classes
    const getMenuItemClasses = (path: string) => {
        const baseClasses = 'flex items-center gap-3 w-[85%] px-3 py-4 rounded-lg transition-colors'
        const activeClasses = 'text-[var(--dark-blue)] bg-blue-50'
        const inactiveClasses = 'hover-side-nav hover:text-[var(--dark-blue)] text-gray-500'
        
        return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`
    }
  return (
    <div className={classes}  >
      <header className="flex justify-center items-center p-4 ">
      </header>
     
        <ul className='flex items-center flex-col w-[100%] mt-4 cursor-pointer justify-center capitalize'>
            <Link href='/admin-panel/dashboard' className={getMenuItemClasses('/admin-panel/dashboard')}>
                <FaTh className='scale-150'/>
                dashboard   
            </Link>
            <Link href='/admin-panel/driving-lessons' className={getMenuItemClasses('/admin-panel/driving-lessons')}> 
                <FaFileAlt className='scale-150'/>
                 Rijlessen
            </Link>
            <Link href='/admin-panel/students' className={getMenuItemClasses('/admin-panel/students')}>
                <FaUsers className='scale-150' />
                studenten
            </Link>
            <Link href='/admin-panel/instructors' className={getMenuItemClasses('/admin-panel/instructors')}>
                <FaUserTie className='scale-150'/>
                instructeurs
            </Link>
            <Link href='/admin-panel/finances' className={getMenuItemClasses('/admin-panel/finances')}>
                  <FaDollarSign className='scale-150' /> 
                  Financiën
            </Link>
            <Link href='/admin-panel/settings' className={getMenuItemClasses('/admin-panel/settings')}>
                    <FaCog className='scale-150'/> 
                    Instellingen
            </Link>
        </ul>

    </div>
  )
}
