"use client"

// ================================
// HEADER COMPONENT
// ================================
// Main header component for admin dashboard
// Features: Logo, page title, navigation, logout button

import React from 'react'
import Logo2 from '../svgs/logo2'
import { useSidebar } from './ui/SidebarContext'
import { useAppDispatch } from '@/store/hooks'
import { logout } from '@/store/userSlice'
import { useRouter } from 'next/navigation'
import { FaBars, FaTimes } from 'react-icons/fa'

/**
 * Header Component Props
 */
interface HeaderProps {
    title?: string
}

/**
 * Header Component
 * Displays the main header with logo, page title, and navigation
 */
export default function Header({ title }: HeaderProps) {
    const dispatch = useAppDispatch()
    const navigate = useRouter()
        const { toggle, isOpen } = useSidebar()
    return (
        <header className='bg-white w-full border-b border-b-gray-200 h-auto md:h-[10vh] px-4 md:px-8 py-3 md:py-4 flex flex-wrap items-center justify-between gap-3'>
            {/* Left Section - Logo and Title */}
            <div className='flex items-center ml-0 md:ml-4 h-auto md:h-[10vh] gap-3 md:gap-10'>
                {/* Mobile menu toggle */}
                <button
                  className='md:hidden p-2 rounded-md border border-gray-200 text-[var(--dark-blue)]'
                  aria-label='Open menu'
                  onClick={toggle}
                >
                                    {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
                {/* Company Logo */}
                <div className='flex-shrink-0'>
                    <Logo2 className='bg-dark self-center' width={140} height={'100%'} />
                </div>
                
                {/* Page Title */}
                <h1 className='title-page ml-0 first-letter:uppercase text-black text-lg md:text-xl lg:text-2xl'>
                    { title}
                </h1>
            </div>
            
            {/* Right Section - Navigation */}
            <nav className='flex h-auto md:h-[100%] items-center justify-between gap-3 md:gap-4'>
                {/* Notification Icons Placeholder */}
                <div className="flex items-center gap-4">
                    {/* Future: Add notification icons here */}
                </div>
                
                {/* Logout Button */}
                <button 
                  className='bg-transparent cursor-pointer text-[var(--dark-blue)] border border-[var(--dark-blue)] px-3 md:px-4 py-2 rounded-lg hover:bg-[var(--dark-blue)] hover:text-white transition-all duration-200 btn-text hidden md:inline-flex'
                  onClick={() => {
                    // Future: Add logout functionality here
                    dispatch(logout())
                    navigate.push('/auth/login')
                    
                  }}
                >
                    Uitloggen
                </button>
            </nav>
        </header>
    )
}
