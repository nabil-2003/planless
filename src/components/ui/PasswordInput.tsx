'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface PasswordInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  autoComplete?: string
  maxLength?: number
  showToggle?: boolean
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = '•••••••••' ,
  required = false,
  disabled = false,
  className = '',
  id,
  name,
  autoComplete = 'current-password',
  maxLength,
  showToggle = true
}) => {
  // Component state
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  // Mount effect for hydration safety
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    if (isMounted) {
      setIsPasswordVisible(prev => !prev)
    }
  }

  // Styling
  const baseInputClasses = ' placeholder:text-gray-400   placeholder:text-2xl  placeholder:translate-y-2 placeholder:top-0  w-full rounded-lg outline-none  py-3 px-3 pr-12 transition-colors focus:outline-[#024089] focus:outline-2'
  const finalInputClasses = `${baseInputClasses} ${className}`

  return (
    <div className="relative h-max w-full placeholder:text-5xl">
      {/* Password input field */}
      <input
      
        type={isPasswordVisible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={finalInputClasses}
        id={id}
        name={name}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={required && !value ? 'true' : 'false'}
        aria-describedby={showToggle ? `${id}-toggle` : undefined}
      />
      
      {/* Visibility toggle button */}
      {showToggle && isMounted && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3  top-4 cursor-pointer hover:opacity-70 transition-opacity"
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          id={`${id}-toggle`}
          tabIndex={0}
        >
          <Image 
            src={isPasswordVisible ? '/view.png' : '/hide.png'} 
            width={20} 
            height={20} 
            alt={isPasswordVisible ? '' : ''}
            draggable={false}
          />
        </button>
      )}
    </div>
  )
}

export default PasswordInput
