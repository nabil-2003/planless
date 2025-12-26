import React from 'react'

interface FilterIconProps {
  w?: string
  h?: string
  color?: string
  className?: string
}

const FilterIcon: React.FC<FilterIconProps> = ({ 
  w = '24', 
  h = '24', 
  color = '#6B7280',
  className = ''
}) => {
  return (
    <svg 
      width={w} 
      height={h} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default FilterIcon
