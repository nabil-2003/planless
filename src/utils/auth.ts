// ============================================
// AUTHENTICATION UTILITY FUNCTIONS
// ============================================

/**
 * Get the authentication token from session storage
 * @returns The token string or null if not found
 */
export const getToken = (): string | null => {
  const user = sessionStorage.getItem('user');
  if (!user) return null;
  const parsedUser = JSON.parse(user);
  return parsedUser.token;
};

/**
 * Add user data to session storage
 * @param userData - The user data to store
 */
export const adduserToSession = (userData: any) => {
  sessionStorage.setItem('user', JSON.stringify(userData));
};

/**
 * Remove user data from session storage
 */
export const removeuserFromSession = () => {
  sessionStorage.removeItem('user');
};

/**
 * Check if user exists in session storage
 * @returns true if user is in session, false otherwise
 */
export const isUserInSession = (): boolean => {
  return sessionStorage.getItem('user') !== null;
};
