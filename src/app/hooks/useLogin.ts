import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { login, newPassword, otpSent, resetErrors ,  resetOtpStatus, resetPassword  , resetAll as rs} from '@/store/userSlice'
import React from 'react'

export default function useLogin() {
  const dispatch = useAppDispatch()
  const selector = useAppSelector((state) => state.user)
   selector.error

  const logIn = async (email: string, password: string) => {
    try {
        dispatch(login({ email, password }))
    } catch (error) {
        alert('An error occurred during login.')
    }
  }

  const reset = async (email : string)  => {
    try {
    
        // Future: implement reset functionality
           dispatch(resetPassword({ email }))
    } catch (error) {
        alert('An error occurred during password reset.')
    }
  }
  const resetOtp = () => { 
    dispatch(resetOtpStatus())
   }
   const sentOtp = async (otpCode: string) => {
      console.log("Setting OTP code:", otpCode);
      dispatch(otpSent(otpCode));
   }
   const newPass = async (email: string , password : string , otp : string) => {
        dispatch(newPassword({ email , password , otp }))
   }
   const resetAll = () => {
    dispatch( rs() )
   }
   const resetErr= () => {
    dispatch( resetErrors() )
   }

  return { logIn, ...selector , reset , resetOtp , sentOtp , newPass , resetAll , resetErr }}