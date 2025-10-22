'use client'
import LeftSide from '@/components/admin/LeftSide'
import { isUserInSession } from '@/store/userSlice'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function layout({ children, }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    if (!isUserInSession()) {
      router.push('/auth/login')
    }
  }, [router])

  return (
    <div className=' w-full h-screen bg-dashboard-primary ' >
            {children}    
    </div>

  )
}
