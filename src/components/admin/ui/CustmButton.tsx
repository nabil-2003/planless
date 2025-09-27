import React from 'react'

export default function CustmButton(
    {children , onClick , className = '' , type='button'} : 
    {
    children?: React.ReactNode  ,
    className?: string, 
    type?:"submit" | "reset" | "button"
    , onClick?: ()=> void}) {
       
    return (
    <button type={type} onClick={onClick} className={`${className}
     font-medium text-sm  py-2 px-4 
      transition-colors duration-200
      outline-none cursor-pointer rounded-lg  
 `}>
        {children}
    </button>
  )
}
