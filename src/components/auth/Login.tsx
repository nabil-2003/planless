'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Input, PasswordInput, Button, Label } from '../ui'
import useLogin from '@/app/hooks/useLogin'
import { useRouter } from 'next/navigation'
import { isUserInSession } from '@/store/userSlice'
function Login() {
    // State management
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loginErr , setLoginErr]= useState<boolean>(false)
    const {logIn , loading , error  , resetErr, user , resetAll}   = useLogin()
    const navigate = useRouter()
   useEffect(() => { 
            const i = setTimeout(()=>{
              resetErr()
            }, 4000)
            return () => clearTimeout(i)
        }, [error])
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
        
        if (!email || !password) {
            alert('Please fill in all fields')
            return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address')
            return
        }
     
        try {
               
             await logIn(email, password) 




            // Reset form
            setEmail('')
            setPassword('')
        } catch (error) {
            console.error('Login error:', error)
            alert('Login failed. Please try again.')
        } 
    }

    // Form validation
    const isFormValid = (): boolean => {
        return email.trim() !== '' && password !== ''
    }

    return (
        <div className='flex flex-col w-full sm:w-[80%] md:w-[70%] max-w-md'>
            {/* Page header */}
            <header className='mb-6'>
                <h1 className='text-2xl md:text-3xl font-bold mb-4'>
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
                        placeholder="typ hier"
                        required
                        autoComplete="email"
                        className="w-full mb-3"
                        disabled={loading}
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
                        className="mb-4  input-bg text-black "
                        disabled={loading}
                      

                       
                    />
                </div>

                {/* Form actions */}
                <div className='mb-6'>
                    <Link 
                        href='/auth/forget-password' 
                        className='text-dark-blue font-bold text-md hover:underline transition-all duration-200'
                    >
                        Wachtwoord vergeten?
                    </Link>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    loading={loading}
                    disabled={!isFormValid()}
                    className="w-auto outline-none  flex justify-center  p-3 bg-dark-blue hover:bg-blue-700 text-white cursor-pointer "
                >
                    {loading ? 'Inloggen...' : 'Inloggen'}
                </Button>
            </form>
           {error && <p className='w-max mx-auto p-3 rounded-lg bg-red-500 text-white ' >{error}</p>}
        </div>
    )
}

export default Login
