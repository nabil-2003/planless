'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Input, PasswordInput, Button, Label, Alert } from '../ui'
import useLogin from '@/app/hooks/useLogin'
import { useRouter } from 'next/navigation'
import { isUserInSession } from '@/utils'
function Login() {
    // State management
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const [validationError, setValidationError] = useState<string>('')
    const {logIn , loading , error  , resetErr, user , resetAll}   = useLogin()
    const navigate = useRouter()
    
    // Load saved credentials on mount
    useEffect(() => {
        try {
            const savedEmail = localStorage.getItem('rememberedEmail')
            const savedRememberMe = localStorage.getItem('rememberMe')
            
            if (savedRememberMe === 'true' && savedEmail) {
                setEmail(savedEmail)
                setRememberMe(true)
            }
        } catch (error) {
            console.error('Error loading saved credentials:', error)
        }
    }, [])
    
   useEffect(() => { 
            const i = setTimeout(()=>{
              resetErr()
              setValidationError('')
            }, 4000)
            return () => clearTimeout(i)
        }, [error, validationError])
    useEffect(()=>{
      resetAll()
    },[navigate])


    useEffect(()=>{

        if(user !== null || isUserInSession()){
            navigate.push('/admin-panel/dashboard')
        }
    },[user])
    // Event handlers
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value.trim())
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setValidationError('')
        
        if (!email || !password) {
            setValidationError('Vul alle velden in')
            return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setValidationError('Voer een geldig e-mailadres in')
            return
        }
     
        try {
            // Handle remember me functionality (only save email for security)
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email)
                localStorage.setItem('rememberMe', 'true')
            } else {
                localStorage.removeItem('rememberedEmail')
                localStorage.removeItem('rememberMe')
            }
            
            await logIn(email, password)
            // Inputs will reset naturally when component unmounts after successful navigation
        } catch (error) {
            console.error('Login error:', error)
        } 
    }

    // Form validation
    const isFormValid = (): boolean => {
        return email.trim() !== '' && password !== ''
    }

    return (
        <div className='flex flex-col w-full sm:w-[80%] md:w-[70%] max-w-md'>
            {/* Page header */}
            <header className='mb-8'>
                <h1 className='text-3xl font-bold mb-3 text-black'>
                    Inloggen
                </h1>
                <p className='text-base text-gray-600'>
                    Voer je accountgegevens in om je aan te melden bij je Planles account
                </p>
            </header>

            {/* Login form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Email input */}
                <div className='form-group'>
                    <Label htmlFor="email" className='text-sm font-normal text-black mb-2'>
                        Werk e-mailadres
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="info@achieve.nl"
                        required
                        autoComplete="email"
                        className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm"
                        disabled={loading}
                    />
                </div>

                {/* Password input */}
                <div className='form-group'>
                    <Label htmlFor="password" className='text-sm font-normal text-black mb-2'>
                        Wachtwoord
                    </Label>
                    <PasswordInput
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        autoComplete="current-password"
                        className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm"
                        disabled={loading}
                    />
                </div>

                {/* Remember me checkbox */}
                <div className='flex items-center mb-2'>
                    <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="remember" className='ml-2 text-sm text-black cursor-pointer'>
                        Onthoud gegevens
                    </label>
                </div>

                {/* Forgot password link */}
                <div className='mb-6'>
                    <Link 
                        href='/auth/forget-password' 
                        className='text-dark-blue font-semibold text-sm hover:underline transition-all duration-200'
                    >
                        Wachtwoord vergeten?
                    </Link>
                </div>

                {/* Submit button */}
                <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    loading={loading}
                    disabled={!isFormValid()}
                    className="w-full outline-none flex justify-center items-center py-3 bg-dark-blue hover:bg-blue-700 text-white rounded-md font-medium text-base transition-all duration-200"
                >
                    {loading ? 'Inloggen...' : 'Inloggen'}
                </Button>
            </form>
           {(error || validationError) && <Alert message={error || validationError} type="error" />}
        </div>
    )
}

export default Login
