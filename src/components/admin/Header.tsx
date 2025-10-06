"use client"

// ================================
// HEADER COMPONENT
// ================================
// Main header component for admin dashboard
// Features: Logo, page title, navigation, logout button

import React from 'react'
import Logo2 from '../svgs/logo2'

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
    return (
        <header className='h-[10vh] py-4 bg-white flex justify-between items-center w-full px-8 border-b border-b-gray-200'>
            {/* Left Section - Logo and Title */}
            <div className='flex justify-between ml-4 h-[10vh] w-[35vw] gap-10 items-center'>
                {/* Company Logo */}
                <Logo2 className='bg-dark self-center' width={150} height={"100%"} />
                
                {/* Page Title */}
                <h1 className='title-page capitalize text-black'>
                    {title}
                </h1>
            </div>
            
            {/* Right Section - Navigation */}
            <nav className='flex h-[100%] items-center justify-between gap-4'>
                {/* Notification Icons Placeholder */}
                <div className="flex items-center gap-4">
                    {/* Future: Add notification icons here */}
                </div>
                
                {/* Logout Button */}
                <button className='bg-transparent text-[var(--dark-blue)] border border-[var(--dark-blue)] px-4 py-2 rounded-md hover:bg-[var(--dark-blue)] hover:text-white transition-all duration-200 btn-text'>
                    Uitloggen
                </button>
            </nav>
        </header>
    )
}
