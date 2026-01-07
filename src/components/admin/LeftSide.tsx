'use client'
import React from 'react'
import { 
  FaUsers, 
  FaUserTie, 
  FaDollarSign, 
  FaCog,
  FaTh,
  FaFileAlt,
  FaHashtag,
  FaPaperPlane,
  FaCapsules,
  FaGraduationCap
} from 'react-icons/fa';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from './ui/SidebarContext';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/userSlice';
import { useRouter } from 'next/navigation';

export default function LeftSide({ className }: { className?: string }) {
  const classes = `hidden md:flex flex-col ${className || ''}`
    const pathname = usePathname()
  const { isOpen, close } = useSidebar()
  const dispatch = useAppDispatch()
  const navigate = useRouter()
    
    // Helper function to determine if a menu item is active
    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(path + '/')
    }
    
    // Helper function to get menu item classes
  const getMenuItemClasses = (path: string) => {
    const baseClasses = 'flex items-center gap-3 w-full sm:w-[85%] px-3 py-4 rounded-lg transition-colors'
        const activeClasses = 'text-[var(--dark-blue)] bg-blue-50'
        const inactiveClasses = 'hover-side-nav hover:text-[var(--dark-blue)] text-gray-500'
        
        return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`
    }
  const NavList = (
    <ul className='flex items-center flex-col w-full mt-4 cursor-pointer justify-center capitalize'>
      <Link href='/admin-panel/dashboard' className={getMenuItemClasses('/admin-panel/dashboard')} onClick={close}>
          <FaTh className='scale-150'/>
          dashboard   
      </Link>
      <Link href='/admin-panel/driving-lessons' className={getMenuItemClasses('/admin-panel/driving-lessons')}> 
          <FaFileAlt className='scale-150'/>
           Rijlessen
      </Link>
      <Link href='/admin-panel/students' className={getMenuItemClasses('/admin-panel/students')} onClick={close}>
          <FaUsers className='scale-150' />
          studenten
      </Link>
      <Link href='/admin-panel/instructors' className={getMenuItemClasses('/admin-panel/instructors')} onClick={close}>
          <FaUserTie className='scale-150'/>
          instructeurs
      </Link>
      <Link href='/admin-panel/cards' className={getMenuItemClasses('/admin-panel/cards')} onClick={close}>
          <FaGraduationCap className='scale-150'/>
          Leskaarten
      </Link>
      <Link href='/admin-panel/finances' className={getMenuItemClasses('/admin-panel/finances')} onClick={close}>
            <FaDollarSign className='scale-150' /> 
            Financiën
      </Link>
      <Link href='/admin-panel/settings' className={getMenuItemClasses('/admin-panel/settings')} onClick={close}>
              <FaCog className='scale-150'/> 
              Instellingen
      </Link>
    </ul>
  )

  return (
    <>
      {/* Desktop static sidebar */}
      <div className={classes}>
        <header className="flex justify-center items-center p-4 "></header>
        {NavList}
      </div>

      {/* Mobile overlay drawer */}
      {isOpen && (
        <div className='md:hidden fixed inset-0 z-50'>
          {/* Backdrop */}
          <div className='absolute inset-0 bg-black/40' onClick={close} />
          {/* Panel */}
          <div className='absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-white shadow-xl border-r border-gray-200 p-4 overflow-y-auto flex flex-col'>
            {/* Brand/Header space (optional) */}
            <div className='mb-2'></div>
            <div className='flex-1'>
              {NavList}
            </div>
            {/* Mobile Logout */}
            <div className='pt-3 border-t border-gray-200'>
              <button
                onClick={() => {
                  dispatch(logout());
                  navigate.push('/auth/login');
                  close();
                }}
                className='w-full text-left px-3 py-2 rounded-lg border border-[#EAECF0] text-[var(--dark-blue)] hover:bg-blue-50 font-semibold'
              >
                Uitloggen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
