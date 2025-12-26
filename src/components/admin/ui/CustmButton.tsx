import React from 'react'

export default function CustmButton(
  { children, onClick, className = '', type = 'button' }:
    {
      children?: React.ReactNode,
      className?: string,
      type?: 'submit' | 'reset' | 'button'
      , onClick?: () => void
    }) {

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
    font-medium transition-colors duration-200
    outline-none cursor-pointer rounded-lg  
    ${className}
    text-sm px-4 py-2.5
    md:text-base md:px-6 md:py-3
    `}
      aria-pressed={false}
    >
      {children}
    </button>
  )
}
