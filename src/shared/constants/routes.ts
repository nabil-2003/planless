/**
 * Application Routes
 * Centralized route definitions
 */

export const ROUTES = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forget-password',
    OTP: '/auth/otp-code',
    NEW_PASSWORD: '/auth/new-password',
  },
  
  // Dashboard
  DASHBOARD: '/admin-panel/dashboard',
  
  // Students
  STUDENTS: {
    LIST: '/admin-panel/students',
    NEW: '/admin-panel/students/new-student',
    EDIT: (id: string) => `/admin-panel/students/edit/${id}`,
    DETAILS: (id: string) => `/admin-panel/students/${id}`,
  },
  
  // Instructors
  INSTRUCTORS: {
    LIST: '/admin-panel/instructors',
    NEW: '/admin-panel/instructors/new-instructor',
    EDIT: (id: string) => `/admin-panel/instructors/edit/${id}`,
    DETAILS: (id: string) => `/admin-panel/instructors/${id}`,
  },
  
  // Lessons
  LESSONS: {
    LIST: '/admin-panel/driving-lessons',
    CARDS: '/admin-panel/cards',
  },
  
  // Finances
  FINANCES: {
    LIST: '/admin-panel/finances',
    ITEM: (id: string) => `/admin-panel/finances/item/${id}`,
  },
  
  // Settings
  SETTINGS: {
    INDEX: '/admin-panel/settings',
    PACKAGES: '/admin-panel/settings/packages',
  },
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.REGISTER,
  ROUTES.AUTH.FORGOT_PASSWORD,
  ROUTES.AUTH.OTP,
  ROUTES.AUTH.NEW_PASSWORD,
];

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  '/admin-panel',
];
