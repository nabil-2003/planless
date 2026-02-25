"use client"
import React, { useState, useRef, useEffect } from "react";
import InputForOtp, { InputForOtpRef } from "./InputForOtp";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import useLogin from "@/app/hooks/useLogin";
import { useRouter } from "next/navigation";

export default function OTPForm() {
  const { loading, sentOtp, otpCode: otpKey, error, resetErr } = useLogin();
  const router = useRouter()
  // State management
  const [otp, setOtp] = useState<string[]>(() => Array(6).fill(""));
  const [isMounted, setIsMounted] = useState(false);
  const inputRefs = useRef<(InputForOtpRef | null)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFormValid, setFormStatus] = useState<boolean>(false)
  const [validationError, setValidationError] = useState<string>('')
  
  // Component initialization
  useEffect(() => {
    inputRefs.current = Array(6).fill(null);
    setIsMounted(true);
  }, []);

  // Auto-dismiss errors after 4 seconds
  useEffect(() => {
    if (error || validationError) {
      const timer = setTimeout(() => {
        resetErr();
        setValidationError('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, validationError, resetErr]);

  // Redirect to next page when OTP is submitted
  useEffect(() => {
    if (otpKey) {
      setOtp(Array(6).fill("")); // Reset OTP inputs
      router.push('/auth/new-password');
    }
  }, [otpKey, router])
  

  // Event handlers
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Check if all 6 digits are filled
      const otpCode = newOtp.join("");
      if(otpCode.length === 6){
        setFormStatus(true);
      } else {
        setFormStatus(false);
      }

      if (value && index < 5 && isMounted && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && isMounted && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Update form validation when backspace is used
    const currentOtp = otp.join("");
    if (e.key === "Backspace") {
      if (currentOtp.length <= 6) {
        setFormStatus(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError('');
    const otpCode = otp.join("");
    
    if (otpCode.length !== 6) {
      setValidationError('Voer alle 6 cijfers in');
      return;
    }
    
    
    try {
      // Simulate OTP verification process
          sentOtp(otpCode);
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setInputRef = (ref: InputForOtpRef | null, index: number) => {
    if (inputRefs.current) {
      inputRefs.current[index] = ref;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* OTP input fields */}
      <div className="flex gap-2 mb-6">
        {otp.map((digit, i) => (
          <InputForOtp
            digit={digit}
            i={i}
            key={`otp-input-${i}`}
            handleOtpChange={handleOtpChange}
            handleOtpKeyDown={handleOtpKeyDown}
            ref={(ref) => setInputRef(ref, i)}
          />
        ))}
      </div>
      
      {/* Resend code link */}
      <div className="mb-6">
        <button
          type="button"
          className="text-dark-blue font-semibold text-sm hover:underline transition-all duration-200"
          onClick={() => {
            // TODO: Implement resend code functionality
            console.log('Resend code');
          }}
        >
          Code opnieuw verzenden
        </button>
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        variant="primary"
        size="medium"
        loading={loading}
        disabled={!isFormValid || isLoading}
        className="w-full outline-none flex justify-center items-center py-3 bg-dark-blue hover:bg-blue-700 text-white rounded-md font-medium text-base transition-all duration-200"
      >
        {isLoading ? 'Verifiëren...' : 'Verifiëren'}
      </Button>
      
      {/* Error message */}
      {(validationError || error) && (
        <Alert message={validationError || error || ''} type="error" />
      )}
    </form>
  );
}
