/**
 * Currency Formatting Utilities
 */

export function formatCurrency(
  amount: number,
  currency: string = 'EUR',
  locale: string = 'nl-NL'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function parseCurrency(value: string): number {
  // Remove currency symbols and spaces, replace comma with dot
  const cleaned = value.replace(/[€\s]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

export function formatPercentage(
  value: number,
  decimals: number = 0,
  locale: string = 'nl-NL'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}
