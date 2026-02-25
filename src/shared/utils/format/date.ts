import { format, parse, parseISO, isValid } from 'date-fns';
import { nl } from 'date-fns/locale';

/**
 * Date Formatting Utilities
 */

export function formatDate(date: string | Date, formatStr: string = 'dd/MM/yyyy'): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, formatStr, { locale: nl });
  } catch {
    return '';
  }
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, 'dd/MM/yyyy HH:mm');
}

export function formatTime(date: string | Date): string {
  return formatDate(date, 'HH:mm');
}

export function parseDate(dateString: string, formatStr: string = 'dd/MM/yyyy'): Date | null {
  try {
    const parsed = parse(dateString, formatStr, new Date(), { locale: nl });
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function toISOString(date: Date): string {
  return date.toISOString();
}

export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'nu';
  if (diffMins < 60) return `${diffMins} min geleden`;
  if (diffHours < 24) return `${diffHours} uur geleden`;
  if (diffDays < 7) return `${diffDays} dagen geleden`;
  
  return formatDate(dateObj);
}

export function calculateDuration(start: string | Date, end: string | Date): string {
  const startDate = typeof start === 'string' ? parseISO(start) : start;
  const endDate = typeof end === 'string' ? parseISO(end) : end;
  
  const diffMs = endDate.getTime() - startDate.getTime();
  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);
  
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}
