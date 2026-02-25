/**
 * String Formatting Utilities
 */

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

export function formatPhoneNumber(phone: string): string {
  // Format Dutch phone numbers
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('31')) {
    // +31 6 12345678
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 3)} ${cleaned.slice(3)}`;
  } else if (cleaned.startsWith('0')) {
    // 06 12345678
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
  }
  
  return phone;
}

export function formatBSN(bsn: string): string {
  // Format BSN number: 123456789 -> 123 456 789
  const cleaned = bsn.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
}

export function formatPostalCode(postal: string): string {
  // Format postal code: 1234AB -> 1234 AB
  const cleaned = postal.replace(/\s/g, '').toUpperCase();
  return cleaned.replace(/(\d{4})([A-Z]{2})/, '$1 $2');
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
}
