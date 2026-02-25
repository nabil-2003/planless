'use client'
import React from 'react'

interface InputProps {
  type?: 'text' | 'email' | 'number' | 'tel' | 'url'
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
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  className = '',
  id,
  name,
  autoComplete,
  maxLength
}) => {
  // Styling
  const baseClasses = 'input-bg rounded-lg outline-none py-2.5 md:py-3 px-3 placeholder:text-base md:placeholder:text-lg text-sm md:text-base transition-colors focus:outline-[#024089] focus:outline-2'
  const finalClasses = `${baseClasses} ${className}`.trim()

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={finalClasses}
      id={id}
      name={name}
      autoComplete={autoComplete}
      maxLength={maxLength}
      aria-invalid={required && !value ? 'true' : 'false'}
    />
  )
}

export default Input
