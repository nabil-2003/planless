/**
 * Common Types
 */

// Base entity
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Address
export interface Address {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

// Contact Information
export interface ContactInfo {
  email: string;
  phone: string;
  alternativePhone?: string;
}

// Document
export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

// Status with color
export interface StatusBadge {
  label: string;
  color: 'green' | 'red' | 'yellow' | 'blue' | 'gray';
}

// Select option
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

// Table column
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}
