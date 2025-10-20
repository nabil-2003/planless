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

  // Size styling

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
      className={'rounded-lg font-medium transition-all duration-200'+
        'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ' +className}
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
