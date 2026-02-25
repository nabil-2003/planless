'use client'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import LeftArrowIcon from '../svgs/LeftArrowIcon'
// Import our reusable UI components
import { Input, Button, Label, Alert } from '../ui'
import useLogin from '@/app/hooks/useLogin'
import { useRouter } from 'next/navigation'


/**
 * Password Reset Component
 *
 */
function Reset() {
    // =========================================================================
    // STATE DECLARATIONS
    // =========================================================================
    const { reset, loading, error, otpSended, resetOtp, resetAll , resetErr } = useLogin()
    const navigate = useRouter()
    
    /** User's email address for password reset */
    const [email, setEmail] = useState<string>('')
    
    /** Form submission loading state */
    
    
    /** Success state after email is sent */
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false)
    const [validationError, setValidationError] = useState<string>('')

    // =========================================================================
    // CALLBACKS
    // =========================================================================
    const emailSended = useCallback(() => {
        setTimeout(() => {
            navigate.push('/auth/otp-code')
            resetOtp()
        }, 1500)
    }, [])
    
    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => { 
          const i = setTimeout(()=>{
            resetErr()
            setValidationError('')
          }, 4000)
          return () => clearTimeout(i)
      }, [error, validationError])

    useEffect(() => {
        if (otpSended) {
            setEmail('') // Reset email after successful submission
            emailSended()
        }
    }, [otpSended])

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
        setValidationError('')

        // Basic validation
        if (!email) {
            setValidationError('Voer je e-mailadres in')
            return
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setValidationError('Voer een geldig e-mailadres in')
            return
        }
        try {
            await reset(email)
        } catch (error) {
            console.error('Password reset error:', error)
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
        <div className='flex flex-col w-full sm:w-[80%] md:w-[70%] max-w-md'>
            {/* ============================= */}
            {/* NAVIGATION */}
            {/* ============================= */}
            <nav className='mb-6'>
                <Link
                    href='/auth/login'
                    className='text-black font-normal flex items-center hover:underline transition-all duration-200'
                >
                    <LeftArrowIcon className='inline-block scale-75 mr-2' />
                    <span className='text-xl font-bold'>Wachtwoord vergeten?</span>
                </Link>
            </nav>

            {/* ============================= */}
            {/* PAGE HEADER */}
            {/* ============================= */}
            <header className='mb-8'>
                <p className='text-base text-gray-600'>
                    Voer het e-mailadres in dat aan uw account is gekoppeld om de instructie te ontvangen.
                </p>
            </header>
            <form onSubmit={handleSubmit} className='space-y-4'>

                {/* Email Input Section */}
                <div className='form-group'>
                    <Label
                        htmlFor="reset-email"
                        className='text-sm font-normal text-black mb-2'
                    >
                        E-mailadres
                    </Label>
                    <Input
                        id="reset-email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Type hier"
                        required
                        autoComplete="email"
                        className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm"
                        disabled={loading}
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    disabled={!isFormValid() || loading}
                    className="w-full outline-none flex justify-center items-center py-3 bg-dark-blue hover:bg-blue-700 text-white rounded-md font-medium text-base transition-all duration-200 mt-6"
                >
                    {loading ? 'Verzenden...' : 'Inloggen'}
                </Button>
            </form>
            {(error || validationError) && <Alert message={error || validationError} type="error" />}
            {otpSended && <Alert message="OTP-code succesvol verzonden" type="success" />}

        </div>
    )
}

export default Reset
