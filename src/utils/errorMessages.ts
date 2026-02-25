/**
 * Error message utility for translating API errors to Dutch user-friendly messages
 */

export type ErrorContext = 'login' | 'resetPassword' | 'newPassword' | 'otp' | 'general';

/**
 * Get user-friendly Dutch error message based on HTTP status and context
 */
export function getErrorMessage(
  error: any,
  context: ErrorContext = 'general'
): string {
  // Check if it's an Axios error with response
  if (error?.response) {
    const status = error.response.status;
    const serverMessage = error.response.data?.message;

    // Map status codes to Dutch messages based on context
    switch (context) {
      case 'login':
        return getLoginErrorMessage(status, serverMessage);
      
      case 'resetPassword':
        return getResetPasswordErrorMessage(status, serverMessage);
      
      case 'newPassword':
        return getNewPasswordErrorMessage(status, serverMessage);
      
      case 'otp':
        return getOTPErrorMessage(status, serverMessage);
      
      default:
        return getGeneralErrorMessage(status, serverMessage);
    }
  }

  // Network or other errors
  if (error?.message) {
    if (error.message.includes('Network Error') || error.message.includes('ERR_NETWORK')) {
      return 'Geen internetverbinding. Controleer je netwerk en probeer opnieuw.';
    }
    if (error.message.includes('timeout')) {
      return 'Verzoek time-out. Probeer het later opnieuw.';
    }
  }

  return 'Er is een onverwachte fout opgetreden. Probeer het later opnieuw.';
}

/**
 * Login-specific error messages
 */
function getLoginErrorMessage(status: number, serverMessage?: string): string {
  switch (status) {
    case 400:
      // Check if server message gives more context
      if (serverMessage?.toLowerCase().includes('email')) {
        return 'Ongeldig e-mailadres. Controleer je e-mailadres.';
      }
      if (serverMessage?.toLowerCase().includes('password')) {
        return 'Ongeldig wachtwoord. Controleer je wachtwoord.';
      }
      return 'Ongeldige inloggegevens. Controleer je e-mailadres en wachtwoord.';
    
    case 401:
      return 'Onjuiste inloggegevens. Controleer je e-mailadres en wachtwoord.';
    
    case 403:
      return 'Account geblokkeerd. Neem contact op met de beheerder.';
    
    case 404:
      return 'Account niet gevonden. Controleer je e-mailadres.';
    
    case 422:
      return 'Ongeldige gegevens. Controleer je invoer.';
    
    case 429:
      return 'Te veel inlogpogingen. Probeer het later opnieuw.';
    
    case 500:
    case 502:
    case 503:
      return 'Serverfout. Probeer het later opnieuw.';
    
    default:
      return serverMessage || 'Inloggen mislukt. Probeer het opnieuw.';
  }
}

/**
 * Password reset error messages
 */
function getResetPasswordErrorMessage(status: number, serverMessage?: string): string {
  switch (status) {
    case 400:
      if (serverMessage?.toLowerCase().includes('email')) {
        return 'Ongeldig e-mailadres. Controleer je e-mailadres.';
      }
      return 'Ongeldige gegevens. Controleer je e-mailadres.';
    
    case 404:
      return 'E-mailadres niet gevonden. Controleer je e-mailadres.';
    
    case 429:
      return 'Te veel verzoeken. Probeer het over een paar minuten opnieuw.';
    
    case 500:
    case 502:
    case 503:
      return 'Serverfout. Probeer het later opnieuw.';
    
    default:
      return serverMessage || 'Wachtwoord reset mislukt. Probeer het opnieuw.';
  }
}

/**
 * New password error messages
 */
function getNewPasswordErrorMessage(status: number, serverMessage?: string): string {
  switch (status) {
    case 400:
      if (serverMessage?.toLowerCase().includes('password')) {
        return 'Wachtwoord voldoet niet aan de vereisten.';
      }
      if (serverMessage?.toLowerCase().includes('otp') || serverMessage?.toLowerCase().includes('code')) {
        return 'Ongeldige verificatiecode. Probeer het opnieuw.';
      }
      return 'Ongeldige gegevens. Controleer je invoer.';
    
    case 401:
      return 'Verificatiecode verlopen. Vraag een nieuwe code aan.';
    
    case 403:
      return 'Verificatiecode onjuist. Controleer de code.';
    
    case 404:
      return 'Sessie verlopen. Start het proces opnieuw.';
    
    case 422:
      if (serverMessage?.toLowerCase().includes('password')) {
        return 'Wachtwoord te zwak. Kies een sterker wachtwoord.';
      }
      return 'Ongeldige gegevens. Controleer je invoer.';
    
    case 429:
      return 'Te veel pogingen. Probeer het later opnieuw.';
    
    case 500:
    case 502:
    case 503:
      return 'Serverfout. Probeer het later opnieuw.';
    
    default:
      return serverMessage || 'Wachtwoord instellen mislukt. Probeer het opnieuw.';
  }
}

/**
 * OTP error messages
 */
function getOTPErrorMessage(status: number, serverMessage?: string): string {
  switch (status) {
    case 400:
      return 'Ongeldige verificatiecode. Controleer de code.';
    
    case 401:
      return 'Verificatiecode verlopen. Vraag een nieuwe code aan.';
    
    case 403:
      return 'Verificatiecode onjuist. Probeer het opnieuw.';
    
    case 404:
      return 'Sessie niet gevonden. Start het proces opnieuw.';
    
    case 429:
      return 'Te veel pogingen. Probeer het later opnieuw.';
    
    case 500:
    case 502:
    case 503:
      return 'Serverfout. Probeer het later opnieuw.';
    
    default:
      return serverMessage || 'Verificatie mislukt. Probeer het opnieuw.';
  }
}

/**
 * General error messages
 */
function getGeneralErrorMessage(status: number, serverMessage?: string): string {
  switch (status) {
    case 400:
      return 'Ongeldige gegevens. Controleer je invoer.';
    
    case 401:
      return 'Niet geautoriseerd. Log opnieuw in.';
    
    case 403:
      return 'Geen toegang. Neem contact op met de beheerder.';
    
    case 404:
      return 'Niet gevonden. Controleer je gegevens.';
    
    case 422:
      return 'Ongeldige gegevens. Controleer je invoer.';
    
    case 429:
      return 'Te veel verzoeken. Probeer het later opnieuw.';
    
    case 500:
      return 'Serverfout. Probeer het later opnieuw.';
    
    case 502:
      return 'Service tijdelijk niet beschikbaar.';
    
    case 503:
      return 'Service in onderhoud. Probeer het later opnieuw.';
    
    default:
      return serverMessage || 'Er is een fout opgetreden. Probeer het opnieuw.';
  }
}
