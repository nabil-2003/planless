'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Input, PasswordInput, Button, Label } from './ui'

function Login() {
    // State management
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Mount effect for hydration safety
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Event handlers
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value.trim())
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (!email || !password) {
            alert('Please fill in all fields')
            return
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address')
            return
        }
        
        setIsLoading(true)
        
        try {
            console.log('Login attempt:', { email, password: '[REDACTED]' })
            await new Promise(resolve => setTimeout(resolve, 1000))
            alert('Login successful!')
        } catch (error) {
            console.error('Login error:', error)
            alert('Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // Form validation
    const isFormValid = (): boolean => {
        return email.trim() !== '' && password !== '' && isMounted
    }

    return (
        <div className='flex flex-col w-[70%]'>
            {/* Page header */}
            <header className='mb-6'>
                <h1 className='text-3xl font-bold mb-4'>
                    Inloggen
                </h1>
                <p className='text-lg text-gray-600'>
                    Voer je accountgegevens in om je aan te melden bij je planles account
                </p>
            </header>

            {/* Login form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Email input */}
                <div className='form-group'>
                    <Label htmlFor="email" required>
                        E-mailadres
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="typ hier je e-mailadres"
                        required
                        autoComplete="email"
                        className="w-full mb-3"
                        disabled={isLoading}
                    />
                </div>

                {/* Password input */}
                <div className='form-group'>
                    <Label htmlFor="password" required>
                        Wachtwoord
                    </Label>
                    <PasswordInput
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        autoComplete="current-password"
                        className="mb-4"
                        disabled={isLoading}
                        showToggle={isMounted}
                    />
                </div>

                {/* Form actions */}
                <div className='mb-6'>
                    <Link 
                        href='/reset' 
                        className='text-dark-blue font-bold text-md hover:underline transition-all duration-200'
                    >
                        Wachtwoord vergeten?
                    </Link>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    loading={isLoading}
                    disabled={!isFormValid()}
                    className="w-auto"
                >
                    {isLoading ? 'Inloggen...' : 'Inloggen'}
                </Button>
            </form>
        </div>
    )
}

export default Login
