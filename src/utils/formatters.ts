/**
 * Formatting Utilities
 */

import { CURRENCY_SYMBOLS } from './constants';

/**
 * Format a number as currency
 * @param value - Number to format
 * @param currency - Currency code (default: USD)
 * @param decimals - Number of decimal places (default: 2)
 */
export const formatCurrency = (
  value: number,
  currency: string = 'USD',
  decimals: number = 2
): string => {
  const symbol = CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS] || '$';
  return `${symbol}${value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Format a number with commas and optional decimals
 * @param value - Number to format
 * @param decimals - Number of decimal places (default: 0)
 */
export const formatNumber = (value: number, decimals: number = 0): string => {
  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format a percentage
 * @param value - Number to format as percentage
 * @param decimals - Number of decimal places (default: 2)
 */
export const formatPercent = (value: number, decimals: number = 2): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};

/**
 * Format large numbers (millions, billions)
 * @param value - Number to format
 * @param decimals - Number of decimal places (default: 1)
 */
export const formatLargeNumber = (value: number, decimals: number = 1): string => {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(decimals)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(decimals)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(decimals)}K`;
  }
  return value.toFixed(0);
};

/**
 * Format market cap
 * @param value - Market cap value
 */
export const formatMarketCap = (value?: number): string => {
  if (!value) return 'N/A';
  return formatLargeNumber(value) + ' USD';
};

/**
 * Format P/E ratio
 * @param pe - P/E ratio value
 */
export const formatPERatio = (pe?: number): string => {
  if (!pe || pe <= 0) return 'N/A';
  return pe.toFixed(2);
};

/**
 * Format dividend yield
 * @param dividendYield - Dividend yield value
 */
export const formatDividendYield = (dividendYield?: number): string => {
  if (!dividendYield || dividendYield < 0) return '0.00%';
  return `${dividendYield.toFixed(2)}%`;
};

/**
 * Format a date to readable format
 * @param date - Date to format
 * @param format - Format string (default: 'MMM DD, YYYY')
 */
export const formatDate = (
  date: Date | string | number,
  format: string = 'MMM DD, YYYY'
): string => {
  const d = new Date(date);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const tokens: Record<string, string> = {
    YYYY: d.getFullYear().toString(),
    YY: d.getFullYear().toString().slice(-2),
    MMMM: months[d.getMonth()],
    MMM: months[d.getMonth()],
    MM: String(d.getMonth() + 1).padStart(2, '0'),
    M: (d.getMonth() + 1).toString(),
    DD: String(d.getDate()).padStart(2, '0'),
    D: d.getDate().toString(),
    dddd: days[d.getDay()],
    ddd: days[d.getDay()],
    HH: String(d.getHours()).padStart(2, '0'),
    H: d.getHours().toString(),
    mm: String(d.getMinutes()).padStart(2, '0'),
    m: d.getMinutes().toString(),
    ss: String(d.getSeconds()).padStart(2, '0'),
    s: d.getSeconds().toString(),
  };

  return format.replace(/YYYY|YY|MMMM|MMM|MM|M|DD|D|dddd|ddd|HH|H|mm|m|ss|s/g,
    (match) => tokens[match] || match
  );
};

/**
 * Format time for display (e.g., "2h ago", "3 days ago")
 * @param date - Date to format
 */
export const formatTimeAgo = (date: Date | string | number): string => {
  const d = new Date(date);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`;
  return `${Math.floor(seconds / 31536000)}y ago`;
};

/**
 * Format time as HH:MM:SS
 * @param date - Date to format
 */
export const formatTime = (date: Date | string | number): string => {
  const d = new Date(date);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
};

/**
 * Format volume
 * @param volume - Volume value
 */
export const formatVolume = (volume: number): string => {
  return formatLargeNumber(volume);
};

/**
 * Format stock price with appropriate precision
 * @param price - Price value
 */
export const formatPrice = (price: number): string => {
  if (price === 0) return '0.00';
  if (price < 0.01) return price.toFixed(4);
  if (price < 1) return price.toFixed(3);
  return price.toFixed(2);
};

/**
 * Format percentage change with color indicator
 * @param change - Change value
 * @param showColor - Whether to show color codes
 */
export const formatChange = (change: number, showColor: boolean = false): string => {
  const sign = change >= 0 ? '+' : '';
  const percent = change.toFixed(2);
  return `${sign}${percent}%`;
};

/**
 * Format with proper decimal places based on price
 * @param value - Value to format
 * @param basePrice - Price for reference (determines decimal places)
 */
export const formatPriceWithContext = (value: number, basePrice: number): string => {
  if (basePrice < 0.01) return value.toFixed(4);
  if (basePrice < 1) return value.toFixed(3);
  return value.toFixed(2);
};

/**
 * Format seconds to time duration (HH:MM:SS)
 * @param seconds - Number of seconds
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

/**
 * Format ticker symbol consistently
 * @param symbol - Ticker symbol
 */
export const formatSymbol = (symbol: string): string => {
  return symbol.toUpperCase().trim();
};

/**
 * Format company name consistently
 * @param name - Company name
 */
export const formatCompanyName = (name: string): string => {
  return name.trim();
};

/**
 * Format sector name consistently
 * @param sector - Sector name
 */
export const formatSector = (sector: string): string => {
  return sector
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
