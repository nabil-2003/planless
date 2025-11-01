/**
 * UI Components Index
 * 
 * Central export file for all reusable UI components.
 * This allows for clean imports like: import { Button, Input } from '@/components/ui'
 */

// Export all UI components
export { default as Button } from './Button'
export { default as Input } from './Input'
export { default as Label } from './Label'
export { default as PasswordInput } from './PasswordInput'
export { default as DocumentModal } from './DocumentModal'
export { default as IdentityModal } from './AddressModal'

// Re-export types for external use
export type { default as ButtonProps } from './Button'
export type { default as InputProps } from './Input'
export type { default as LabelProps } from './Label'
export type { default as PasswordInputProps } from './PasswordInput'
export type { DocumentModalRef } from './DocumentModal'
export type { IdentityModalRef } from './AddressModal'
