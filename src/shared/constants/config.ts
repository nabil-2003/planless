/**
 * Application Configuration Constants
 */

export const APP_CONFIG = {
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  
  // API
  API_TIMEOUT: 30000, // 30 seconds
  API_RETRY_COUNT: 3,
  
  // Cache
  CACHE_DURATION: {
    SHORT: 1 * 60 * 1000,      // 1 minute
    MEDIUM: 5 * 60 * 1000,     // 5 minutes
    LONG: 30 * 60 * 1000,      // 30 minutes
    DAY: 24 * 60 * 60 * 1000,  // 24 hours
  },
  
  // Date formats
  DATE_FORMAT: 'dd/MM/yyyy',
  DATETIME_FORMAT: 'dd/MM/yyyy HH:mm',
  TIME_FORMAT: 'HH:mm',
  
  // File uploads
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ACCEPTED_DOCUMENT_TYPES: ['application/pdf', 'image/jpeg', 'image/png'],
  
  // Maps
  DEFAULT_MAP_CENTER: {
    lat: 52.3676,
    lng: 4.9041, // Amsterdam
  },
  DEFAULT_MAP_ZOOM: 7,
} as const;

// Payment Status
export enum PaymentStatus {
  PAID = 'Betaald',
  UNPAID = 'Onbetaald',
  OVERDUE = 'Achterstallig',
  CANCELLED = 'Geannuleerd',
}

// Lesson Status
export enum LessonStatus {
  CONFIRMED = 'Bevestigd',
  PENDING = 'In afwachting',
  COMPLETED = 'Voltooid',
  CANCELLED = 'Geannuleerd',
}

// Student Status
export enum StudentStatus {
  ACTIVE = 'Actief',
  INACTIVE = 'Inactief',
  GRADUATED = 'Geslaagd',
}

// License Categories
export enum LicenseCategory {
  A = 'A',    // Motorcycle
  B = 'B',    // Car
  C = 'C',    // Truck
  D = 'D',    // Bus
  E = 'E',    // Trailer
}

// Exam Status
export enum ExamStatus {
  PASSED = 'Geslaagd',
  FAILED = 'Gefaald',
  NOT_DONE = 'Nog niet gedaan',
}
