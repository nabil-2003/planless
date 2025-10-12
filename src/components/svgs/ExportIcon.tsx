'use client'
import React from 'react'

interface ExportIconProps {
  w?: string
  h?: string
  color?: string
  className?: string
  hovercolor?: string
}

const ExportIcon: React.FC<ExportIconProps> = ({ 
  w = '24', 
  h = '24', 
  color = '#6B7280',
  className = '',
}) => {
  return (
    <svg 
      width={w} 
      height={h} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-200 ${className}`}
    >
      <path 
        d="M12 2V15M12 15L8 11M12 15L16 11" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="transition-colors duration-200 group-hover:stroke-white"
      />
      <path 
        d="M2 17V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V17" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="transition-colors duration-200 group-hover:stroke-white"
      />
    </svg>
  )
}

export default ExportIcon
