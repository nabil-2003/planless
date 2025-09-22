'use client'
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  className?: string
  fullWidth?: boolean
  id?: string
  form?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  fullWidth = false,
  id,
  form
}) => {
  // Variant styling
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-dark-blue text-white hover:bg-blue-800 focus:ring-blue-500'
      case 'secondary':
        return 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400'
      case 'outline':
        return 'bg-transparent text-dark-blue border border-dark-blue hover:bg-dark-blue hover:text-white focus:ring-blue-500'
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
      default:
        return 'bg-dark-blue text-white hover:bg-blue-800 focus:ring-blue-500'
    }
  }

  // Size styling
  const getSizeClasses = (): string => {
    switch (size) {
      case 'small':
        return 'px-3 py-1.5 text-sm'
      case 'medium':
        return 'px-4 py-2 text-base'
      case 'large':
        return 'px-6 py-3 text-lg'
      default:
        return 'px-4 py-2 text-base'
    }
  }

  // Combined styling
  const baseClasses = 'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const finalClasses = [
    baseClasses,
    getVariantClasses(),
    getSizeClasses(),
    fullWidth ? 'w-full' : 'self-start',
    disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer',
    className
  ].filter(Boolean).join(' ')

  // Click handler
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick()
    }
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={finalClasses}
      id={id}
      form={form}
      aria-disabled={disabled || loading}
      aria-busy={loading}
    >
      {/* Loading spinner */}
      {loading && (
        <span className="inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      
      {/* Button content */}
      <span className={loading ? 'opacity-70' : ''}>
        {children}
      </span>
    </button>
  )
}

export default Button