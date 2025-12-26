"use client"

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AuthRedirect() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('user')
      const isLoggedIn = !!raw

      // If user is at root, redirect based on session
      if (pathname === '/' || pathname === '') {
        router.replace(isLoggedIn ? '/admin-panel/dashboard' : '/auth/login')
        return
      }

      // If user is on auth pages but already logged in, send to dashboard
      if (isLoggedIn && pathname.startsWith('/auth')) {
        router.replace('/admin-panel/dashboard')
        return
      }

      // If user is on protected pages but not logged in, send to login
      if (!isLoggedIn && pathname.startsWith('/admin-panel')) {
        router.replace('/auth/login')
        return
      }
    } catch (e) {
      // sessionStorage inaccessible or other errors
      console.warn('AuthRedirect error', e)
    }
  }, [pathname, router])

  return null
}
