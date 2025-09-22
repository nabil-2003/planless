'use client'
import React from 'react'

interface LabelProps {
  children: React.ReactNode
  htmlFor?: string
  required?: boolean
  className?: string
  size?: 'small' | 'medium' | 'large'
  srOnly?: boolean
  id?: string
}

const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  required = false,
  className = '',
  size = 'medium',
  srOnly = false,
  id
}) => {
  // Size styling
  const getSizeClasses = (): string => {
    switch (size) {
      case 'small':
        return 'text-sm'
      case 'medium':
        return 'text-lg'
      case 'large':
        return 'text-xl'
      default:
        return 'text-lg'
    }
  }

  // Combined styling

  return (
    <label
      htmlFor={htmlFor}
      className={"font-medium text-gray-700 block mb-2"}
      id={id}
    >
      {children}
      
      {/* Required indicator */}
    </label>
  )
}

export default Label