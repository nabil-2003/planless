/**
 * Environment Configuration
 * Centralized access to environment variables with type safety
 */

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const ENV = {
  // API
  API_URL: getEnvVar('NEXT_PUBLIC_API_URL', 'http://localhost:3000/api'),
  
  // Maps
  GOOGLE_MAPS_KEY: getEnvVar('NEXT_PUBLIC_GOOGLE_MAPS_KEY', ''),
  
  // App
  APP_NAME: getEnvVar('NEXT_PUBLIC_APP_NAME', 'Planless Admin'),
  APP_URL: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
  
  // Auth
  JWT_EXPIRY: getEnvVar('NEXT_PUBLIC_JWT_EXPIRY', '7d'),
  
  // Features
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
} as const;
