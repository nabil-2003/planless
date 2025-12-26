// ============================================
// API CONFIGURATION AND CONSTANTS
// ============================================

/**
 * Get the base API URL from environment variables
 * Normalizes the URL by removing trailing slashes
 */
export const getApiBase = (): string => {
  return ((process.env.NEXT_PUBLIC_API_URL as string) || '').replace(/\/$/, '');
};

/**
 * Pre-configured API base URL constant
 */
export const API_BASE = getApiBase();
