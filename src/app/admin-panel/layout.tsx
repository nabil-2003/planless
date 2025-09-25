import LeftSide from '@/components/admin/LeftSide'
import React from 'react'

export default function layout({ children, }: { children: React.ReactNode }) {
  return (
    <div className=' w-full h-screen bg-dashboard-primary ' >
        
            {children}    
    </div>

  )
}
