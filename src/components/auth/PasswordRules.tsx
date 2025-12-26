'use client'
import React, { useState, useEffect } from 'react'
export default function PasswordRules({ password, checkPassStrength, } : 
    { password: string, checkPassStrength: (result: boolean) => void, isValidPassword: boolean }) {
    const [hasUppercase, setHasUppercase] = useState(false)
    const [hasNumber, setHasNumber] = useState(false)
    const [hasMinLength, setHasMinLength] = useState(false)
   const checkPassword = (password: string) => {
       const minLength = password.length >= 8;
       const hasUpper = /[A-Z]/.test(password);
       const hasNum = /[0-9]/.test(password);
       
       setHasMinLength(minLength);
       setHasUppercase(hasUpper);
       setHasNumber(hasNum);
       
       const isValid = minLength && hasUpper && hasNum;
       checkPassStrength(isValid);
   }
    useEffect(() => {
       checkPassword(password)
   }, [password, hasMinLength, hasUppercase, hasNumber])

  return (
    <div className='mt-2 text-sm text-gray-600'>
     

      <span className={hasMinLength? "text-green-500": "text-red-500"}>{hasMinLength ? '✓' : '✗'} Minimaal 8 tekens. </span> <br />
      <span className={hasUppercase? "text-green-500": "text-red-500"}>{hasUppercase ? '✓' : '✗'} Bevat klein en hoofdletters</span> <br />
      <span className={hasNumber? "text-green-500": "text-red-500"}>{hasNumber ? '✓' : '✗'} Bevat cijfers </span><br />

    </div>
   
  )
}
