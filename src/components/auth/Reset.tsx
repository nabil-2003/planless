'use client'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import LeftArrowIcon from '../svgs/LeftArrowIcon'
// Import our reusable UI components
import { Input, Button, Label } from '../ui'
import useLogin from '@/app/hooks/useLogin'
import { useRouter } from 'next/navigation'


/**
 * Password Reset Component
 *
 */
function Reset() {
    // =========================================================================
    const { reset, loading, error, otpSended, resetOtp, resetAll , resetErr } = useLogin()
    const navigate = useRouter()


    const emailSended = useCallback(() => {

        setTimeout(() => {
            navigate.push('/auth/otp-code')
            resetOtp()
        }, 1500)
    }, [])
    useEffect(() => { 
          const i = setTimeout(()=>{
            resetErr()
          }, 4000)
          return () => clearTimeout(i)
      }, [error])

    useEffect(() => {
        if (otpSended) {
            emailSended()
        }
    }, [otpSended])
    /** User's email address for password reset */
    const [email, setEmail] = useState<string>('')

    /** Form submission loading state */


    /** Success state after email is sent */
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false)



    //navigate to otp page if otp sended

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
        try {
            // TODO: Replace with actual API call
            console.log('Password reset request for:', email)

            // Simulate API call
            await reset(email)

            // Mark as successful


            // TODO: Handle successful request (show success message, etc.)

        } catch (error) {
            console.error('Password reset error:', error)
            // TODO: Handle error (show error message, etc.)
            alert('Failed to send reset email. Please try again.') // TODO: Replace with proper error handling
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
                        disabled={loading}
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    disabled={!isFormValid() || loading}
                    className="w-auto outline-none grid place-content-center p-3 bg-dark-blue hover:bg-blue-700 text-white cursor-pointer "
                >

                    Inloggen
                    {
                        loading &&
                        <span className=' w-[15px]  h-[15px] border-2 border-current border-t-transparent rounded-full animate-spin inline-block ml-2' />

                    }

                </Button>
            </form>
            {error && <p className='w-max mx-auto p-3 rounded-lg bg-red-500 text-white '>{error}</p>}
            {otpSended && <p className='w-max mx-auto p-3 rounded-lg bg-green-500 text-white '> otp code was  sended successfully </p>}

        </div>
    )
}

export default Reset
