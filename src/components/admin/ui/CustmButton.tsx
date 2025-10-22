import React from 'react'

export default function CustmButton(
    {children , onClick , className = '' , type='button'} : 
    {
    children?: React.ReactNode  ,
    className?: string, 
    type?:"submit" | "reset" | "button"
    , onClick?: ()=> void}) {
       
    return (
    <button
      type={type}
      onClick={onClick}
      className={`
        font-medium text-sm md:text-base 
        py-2 md:py-3 px-4 md:px-6 
        transition-colors duration-200
        outline-none cursor-pointer rounded-lg  
        ${className}
      `}
      aria-pressed={false}
    >
        {children}
    </button>
  )
}
