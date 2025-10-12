'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import LeftArrowIcon from '../svgs/LeftArrowIcon'
// Import our reusable UI components
import { Input, Button, Label } from '../ui'

/**
 * Password Reset Component
 *
 */
function Reset() {

    
    /** User's email address for password reset */
    const [email, setEmail] = useState<string>('')
    
    /** Form submission loading state */
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    /** Success state after email is sent */
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false)

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    
    /**
     * Handle email input change
     * Updates the email state and clears any previous success state
     * 
     * @param e - React change event from the email input
     */
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value.trim())
        // Clear success state if user starts typing again
        if (isEmailSent) {
            setIsEmailSent(false)
        }
    }

    /**
     * Handle form submission
     * Validates email and sends password reset request
     * 
     * @param e - React form event
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        // Basic validation
        if (!email) {
            alert('Please enter your email address') //  to replace with modal 
        }
        
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address') //  to replace with modal 
            return
        }
        
        setIsLoading(true)
        
        try {
            // TODO: Replace with actual API call
            console.log('Password reset request for:', email)
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            // Mark as successful
            setIsEmailSent(true)
            
            // TODO: Handle successful request (show success message, etc.)
            
        } catch (error) {
            console.error('Password reset error:', error)
            // TODO: Handle error (show error message, etc.)
            alert('Failed to send reset email. Please try again.') // TODO: Replace with proper error handling
        } finally {
            setIsLoading(false)
        }
    }

    // =========================================================================
    // FORM VALIDATION HELPERS
    // =========================================================================
    
    /**
     * Check if form is valid for submission
     * @returns boolean indicating if form can be submitted
     */
    const isFormValid = (): boolean => {
        return email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    // =========================================================================
    // RENDER
    // =========================================================================
    
    return (
        <div className='flex flex-col w-[70%]'>
            {/* ============================= */}
            {/* NAVIGATION */}
            {/* ============================= */}
            <nav className='mb-4'>
                <Link 
                    href='/auth/login' 
                    className='text-dark-blue font-bold flex items-center hover:underline transition-all duration-200'
                >
                    <LeftArrowIcon className='inline-block scale-75 mr-2' />
                    Terug
                </Link>
            </nav>
            
            {/* ============================= */}
            {/* PAGE HEADER */}
            {/* ============================= */}
            <header className='mb-6'>
                <h1 className='text-3xl font-bold mb-4'>
                    Wachtwoord vergeten?
                </h1>
                <p className='text-lg text-gray-600'>
                    Voer het e-mailadres in dat aan je account is gekoppeld om de resetlink te ontvangen.
                </p>
            </header>

            {/* ============================= */}
            {/* SUCCESS MESSAGE just if kareem confime it ????  */}
            {/* ============================= */}
          {/*   {isEmailSent && (
                <div className='bg-green-50 border border-green-200 rounded-lg p-4 mb-6'>
                    <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                            <svg className='h-5 w-5 text-green-400' viewBox='0 0 20 20' fill='currentColor'>
                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                            </svg>
                        </div>
                        <div className='ml-3'>
                            <h3 className='text-sm font-medium text-green-800'>
                                E-mail verzonden!
                            </h3>
                            <div className='mt-2 text-sm text-green-700'>
                                <p>
                                    We hebben een resetlink naar <strong>{email}</strong> verzonden. 
                                    Controleer je inbox en volg de instructies in de e-mail.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}

            {/* ============================= */}
            {/* RESET FORM */}
            {/* ============================= */}
            <form onSubmit={handleSubmit} className='space-y-4'>
                
                {/* Email Input Section */}
                <div className='form-group'>
                    <Label 
                        htmlFor="reset-email" 
                        required
                    >
                        E-mailadres
                    </Label>
                    <Input
                        id="reset-email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="typ hier je e-mailadres"
                        required
                        autoComplete="email"
                        className="w-full mb-6"
                        disabled={isLoading}
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    loading={isLoading}
                    disabled={!isFormValid() || isLoading}
                    className="w-auto"
                >
                    Inloggen
                </Button>
            </form>

         
        </div>
    )
}

export default Reset
