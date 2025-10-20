'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Input, PasswordInput, Button, Label } from '../ui'
import LeftArrowIcon from '../svgs/LeftArrowIcon'
import PasswordRules from './PasswordRules'
import useLogin from '@/app/hooks/useLogin'
import { useRouter } from 'next/navigation'

function NewpassPage() {
    const {resetEmail , newPass ,error ,  otpCode  , resetAll ,resetErr, loading , isPasswordChanged } = useLogin() 
    const router = useRouter()
    // State management
    const [password, setPassword] = useState<string>('')
    const [isValidPassword, setIsValidPassword] = useState<boolean>(false)
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')
    const [isMounted, setIsMounted] = useState<boolean>(false)
      useEffect(() => { 
                const i = setTimeout(()=>{
                  resetErr()
                }, 4000)
                return () => clearTimeout(i)
            }, [error])

        useEffect(()=>{
            if(!isPasswordChanged)
                 return 
                 const i = setTimeout(()=>{
                  router.push('/auth/login')
                  resetAll()
                 },4000)
         return () => clearTimeout(i)
            
        } ,[isPasswordChanged])
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
        if( otpCode  == null && resetEmail == null) return

        await newPass(resetEmail! , password , otpCode!)

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
                    href='/auth/login' 
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
                        disabled={loading}
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
                        disabled={loading}
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
                    loading ={loading}
                    className="w-auto outline-none flex justify-center p-3 bg-dark-blue hover:bg-blue-700 text-white cursor-pointer "
                >
                    {loading ? 'Bevestigen...' : 'Bevestigen'}
                </Button>
            </form>
            {
                isPasswordChanged && <div className='p-3  mx-auto mt-4 rounded-lg w-max text-white  bg-green-500 '>
                         password changed successfully 
                      
                </div>
            }
              {
                error && <div className='p-3  mx-auto mt-4 rounded-lg w-max text-white  bg-red-500 '>
                         {error} 
                      
                        
                </div>
            }
        </div>
    )
}

export default NewpassPage 
