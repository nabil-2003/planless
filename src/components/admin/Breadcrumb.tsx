"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

export interface BreadcrumbItem {
  label: string
  href?: string
  isDynamic?: boolean
  dynamicValue?: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
}

/**
 * Breadcrumb Component
 * Provides contextual navigation showing the current location hierarchy
 * 
 * @param items - Optional custom breadcrumb items. If not provided, auto-generates from URL path
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname()

  // Auto-generate breadcrumbs from pathname if items not provided
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname)

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="ml-0 md:ml-4 mt-4 mb-2"
    >
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1

          return (
            <li key={index} className="flex items-center">
              {/* Breadcrumb Link/Text */}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-[var(--dark-blue)] transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`font-semibold ${
                    isLast ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
              )}

              {/* Separator */}
              {!isLast && (
                <span className="mx-2 text-gray-400 select-none" aria-hidden="true">
                  &gt;
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/**
 * Auto-generates breadcrumb items from the current pathname
 */
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  
  // Remove 'admin-panel' from breadcrumb display
  const filteredSegments = segments.filter(seg => seg !== 'admin-panel')
  
  if (filteredSegments.length === 0) {
    return [{ label: 'Dashboard', href: '/admin-panel/dashboard' }]
  }

  const breadcrumbs: BreadcrumbItem[] = []
  let currentPath = '/admin-panel'

  filteredSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    
    // Check if segment is a UUID/ID (dynamic route)
    const isDynamic = /^[a-f0-9-]{36}$|^\d+$/.test(segment)
    
    let label = isDynamic 
      ? 'Details' 
      : formatLabel(segment)

    // Special handling for common routes
    if (segment === 'details' || segment === 's') {
      label = 'Details'
    } else if (segment === 'edit') {
      label = 'Bewerken'
    } else if (segment === 'new-student') {
      label = 'Nieuwe Student'
    } else if (segment === 'new-instructor') {
      label = 'Nieuwe Instructeur'
    } else if (segment === 'notes') {
      label = 'Notities'
    } else if (segment === 'note') {
      label = 'Notitie'
    }

    breadcrumbs.push({
      label,
      href: index === filteredSegments.length - 1 ? undefined : currentPath,
      isDynamic
    })
  })

  return breadcrumbs
}

/**
 * Formats segment names for display
 */
function formatLabel(segment: string): string {
  const labelMap: Record<string, string> = {
    'dashboard': 'Dashboard',
    'students': 'Studenten',
    'instructors': 'Instructeurs',
    'driving-lessons': 'Rijlessen',
    'finances': 'Financiën',
    'cards': 'Leskaarten',
    'settings': 'Instellingen',
    'packages': 'Pakketten',
  }

  return labelMap[segment] || segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
