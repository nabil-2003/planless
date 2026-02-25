'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Input, PasswordInput, Button, Label, Alert } from '../ui'
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
    const [validationError, setValidationError] = useState<string>('')
      useEffect(() => { 
                const i = setTimeout(()=>{
                  resetErr()
                  setValidationError('')
                }, 4000)
                return () => clearTimeout(i)
            }, [error, validationError])

        useEffect(()=>{
            if(!isPasswordChanged)
                 return 
                 // Reset inputs after successful password change
                 setPassword('')
                 setPasswordConfirm('')
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
        setValidationError('')

        if (!password || !passwordConfirm) {
            setValidationError('Vul alle velden in')
            return
        }

        if (password !== passwordConfirm) {
            setValidationError('Wachtwoorden komen niet overeen')
            return
        }

        if (!isValidPassword) {
            setValidationError('Wachtwoord voldoet niet aan de vereisten')
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
        <div className='flex flex-col w-full sm:w-[80%] md:w-[70%] max-w-md px-4 md:px-0'>
            {/* Page header */}
            <header className='mb-8'>
                 <nav className='mb-6'>
                <Link 
                    href='/auth/login' 
                    className='text-black font-normal flex items-center hover:underline transition-all duration-200'
                >
                    <LeftArrowIcon className='inline-block scale-75 mr-2' />
                    <span className='text-xl font-bold'>Wachtwoord opnieuw instellen</span>
                </Link>
            </nav>
               
            </header>

            {/* Login form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
                {/* New password input */}
                <div className='form-group'>
                    <Label htmlFor="new-password" className='text-sm font-normal text-black mb-2'>
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
                        className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm"
                    />

                    <PasswordRules password={password} checkPassStrength={checkPasswordStrength} isValidPassword={isValidPassword} />
                   
                </div>

                {/* Confirm password input */}
                <div className='form-group'>
                    <Label htmlFor="confirm-password" className='text-sm font-normal text-black mb-2'>
                        Bevestig nieuw wachtwoord
                    </Label>
                    <PasswordInput
                        id="confirm-password"
                        name="confirm-password"
                        value={passwordConfirm}
                        onChange={handlePasswordChangeConfirm}
                        required
                        autoComplete="new-password"
                        className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm"
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
                    loading={loading}
                    disabled={!isFormValid()}
                    className="w-full outline-none flex justify-center items-center py-3 bg-dark-blue hover:bg-blue-700 text-white rounded-md font-medium text-base transition-all duration-200"
                >
                    {loading ? 'Bevestigen...' : 'Bevestigen'}
                </Button>
            </form>
            {
                isPasswordChanged && <Alert message="Wachtwoord succesvol gewijzigd" type="success" />
            }
              {
                (error || validationError) && <Alert message={error || validationError || ''} type="error" />
            }
        </div>
    )
}

export default NewpassPage 
