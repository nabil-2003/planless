"use client"
import React, { useState, useRef, useEffect } from "react";
import InputForOtp, { InputForOtpRef } from "./InputForOtp";
import Button from "./ui/Button";

export default function OTPForm() {
  // State management
  const [otp, setOtp] = useState<string[]>(() => Array(6).fill(""));
  const [isMounted, setIsMounted] = useState(false);
  const inputRefs = useRef<(InputForOtpRef | null)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFormValid, setFormStatus] = useState<boolean>(false)
  // Component initialization
  useEffect(() => {
    inputRefs.current = Array(6).fill(null);
    setIsMounted(true);
  }, []);

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
    const otpCode = otp.join("");
    
    if (otpCode.length !== 6) {
      alert('Please enter all 6 digits');
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("OTP submitted:", otpCode);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('OTP verified successfully!');
    } catch (error) {
      console.error('OTP verification error:', error);
      alert('OTP verification failed. Please try again.');
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
      
      {/* Submit button */}
      <Button
        type="submit"
        variant="primary"
        size="medium"
        loading={isLoading}
        disabled={!isFormValid || isLoading}
        className="w-auto"
      >
        {isLoading ? 'Volgende...' : 'Volgende'}
      </Button>
    </form>
  );
}
