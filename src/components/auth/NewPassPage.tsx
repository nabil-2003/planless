'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Input, PasswordInput, Button, Label } from '../ui'
import LeftArrowIcon from '../svgs/LeftArrowIcon'
import PasswordRules from './PasswordRules'

function NewpassPage() {
    // State management
    const [password, setPassword] = useState<string>('')
    const [isValidPassword, setIsValidPassword] = useState<boolean>(false)
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Mount effect for hydration safety
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Event handlers
   

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handlePasswordChangeConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(e.target.value)
    }

    const checkPasswordStrength = (result : boolean ): void => {
        setIsValidPassword(result)
        console.log('is valid password:', isValidPassword)
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!password || !passwordConfirm) {
            alert('Vul alle velden in')
            return
        }

        if (password !== passwordConfirm) {
            alert('Wachtwoorden komen niet overeen')
            return
        }

        if (!isValidPassword) {
            alert('Wachtwoord voldoet niet aan de vereisten')
            return
        }
        
        setIsLoading(true)
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            alert('Wachtwoord succesvol gewijzigd!')
        } catch (error) {
            console.error('Password change error:', error)
            alert('Wachtwoord wijzigen mislukt')
        } finally {
            setIsLoading(false)
        }
    }

    // Form validation
    const isFormValid = (): boolean => {
        return passwordConfirm !== '' &&
         password !== '' && 
         isMounted &&
         isValidPassword &&
         (password === passwordConfirm)
    }

    return (
        <div className='flex flex-col w-[70%]'>
            {/* Page header */}
            <header className='mb-6'>
                 <nav className='mb-4'>
                <Link 
                    href='/login' 
                    className='text-dark-blue font-bold flex items-center hover:underline transition-all duration-200'
                >
                    <LeftArrowIcon className='inline-block scale-75 mr-2' />
                    Terug
                </Link>
            </nav>
                <h1 className='text-3xl font-bold '>
                    Wachtwoord opnieuw <br/>Instellen
                </h1>
               
            </header>

            {/* Login form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
                {/* New password input */}
                <div className='form-group'>
                    <Label htmlFor="new-password" required>
                        Nieuw wachtwoord
                    </Label>
                    <PasswordInput 
                        id="new-password"
                        name="new-password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        autoComplete="new-password"
                        disabled={isLoading}
                        showToggle={isMounted}
                    />

                    <PasswordRules password={password} checkPassStrength={checkPasswordStrength} isValidPassword={isValidPassword} />
                   
                </div>

                {/* Confirm password input */}
                <div className='form-group'>
                    <Label htmlFor="confirm-password" required>
                        Bevestig nieuw wachtwoord
                    </Label>
                    <PasswordInput
                        id="confirm-password"
                        name="confirm-password"
                        value={passwordConfirm}
                        onChange={handlePasswordChangeConfirm}
                        required
                        autoComplete="new-password"
                        className="mb-4"
                        disabled={isLoading}
                        showToggle={isMounted}
                    />
                    
                    {/* Password match indicator */}
                    {passwordConfirm && (
                        <div className={`text-sm mt-1 ${password === passwordConfirm ? 'text-green-500' : 'text-red-500'}`}>
                            {password === passwordConfirm ? '✓ Wachtwoorden komen overeen' : '✗ Wachtwoorden komen niet overeen'}
                        </div>
                    )}
                </div>

                {/* Form actions */}
                <div className='mb-6'>
                
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    loading={isLoading}
                    disabled={!isFormValid() || isLoading}
                    className="w-auto"
                >
                    {isLoading ? 'Bevestigen...' : 'Bevestigen'}
                </Button>
            </form>
        </div>
    )
}

export default NewpassPage 
