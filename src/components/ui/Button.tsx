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
  const variantClasses: Record<Required<ButtonProps>['variant'], string> = {
    primary: 'bg-[var(--dark-blue)] text-white hover:bg-[color-mix(in_oklab,_var(--dark-blue),_white_10%)] border border-[var(--dark-blue)]',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300',
    outline: 'bg-transparent text-[var(--dark-blue)] border border-[var(--dark-blue)] hover:bg-[var(--dark-blue)] hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700 border border-red-600'
  }

  // Size styling
  const sizeClasses: Record<Required<ButtonProps>['size'], string> = {
    small: 'text-sm px-3 py-2',
    medium: 'text-sm md:text-base px-4 md:px-5 py-2.5 md:py-3',
    large: 'text-base md:text-lg px-5 md:px-6 py-3 md:py-3.5'
  }

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
      className={[
        'rounded-lg font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className
      ].join(' ').trim()}
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
