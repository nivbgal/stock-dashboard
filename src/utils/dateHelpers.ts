/**
 * Date and Time Utilities
 */

import { TimeFrame } from '../types/stock';
import { MARKET_HOURS } from './constants';

/**
 * Check if market is currently open
 * @param date - Date to check (default: now)
 */
export const isMarketOpen = (date: Date = new Date()): boolean => {
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Market is closed on weekends
  if (day === 0 || day === 6) return false;

  // Check if time is within market hours (EST)
  const marketOpen = MARKET_HOURS.OPEN;
  const marketClose = MARKET_HOURS.CLOSE;

  const currentMinutes = hours * 60 + minutes;
  const openMinutes = marketOpen.hour * 60 + marketOpen.minute;
  const closeMinutes = marketClose.hour * 60 + marketClose.minute;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
};

/**
 * Get next market open time
 * @param date - Date to start from (default: now)
 */
export const getNextMarketOpen = (date: Date = new Date()): Date => {
  const next = new Date(date);
  let day = next.getDay();

  // If it's after market hours, move to next day
  const hours = next.getHours();
  const minutes = next.getMinutes();
  const currentMinutes = hours * 60 + minutes;
  const closeMinutes = MARKET_HOURS.CLOSE.hour * 60 + MARKET_HOURS.CLOSE.minute;

  if (currentMinutes >= closeMinutes) {
    next.setDate(next.getDate() + 1);
    day = next.getDay();
  }

  // Skip weekends
  while (day === 0 || day === 6) {
    next.setDate(next.getDate() + 1);
    day = next.getDay();
  }

  // Set to market open time (9:30 AM EST)
  next.setHours(MARKET_HOURS.OPEN.hour, MARKET_HOURS.OPEN.minute, 0, 0);

  return next;
};

/**
 * Get market status string
 * @param date - Date to check (default: now)
 */
export const getMarketStatus = (
  date: Date = new Date()
): 'open' | 'closed' | 'pre-market' | 'after-hours' => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  const preMarketStart = MARKET_HOURS.PRE_MARKET_OPEN.hour * 60 + MARKET_HOURS.PRE_MARKET_OPEN.minute;
  const marketOpen = MARKET_HOURS.OPEN.hour * 60 + MARKET_HOURS.OPEN.minute;
  const marketClose = MARKET_HOURS.CLOSE.hour * 60 + MARKET_HOURS.CLOSE.minute;
  const afterHoursEnd = MARKET_HOURS.POST_MARKET_CLOSE.hour * 60 + MARKET_HOURS.POST_MARKET_CLOSE.minute;

  const day = date.getDay();
  if (day === 0 || day === 6) return 'closed'; // Weekend

  if (currentMinutes >= marketOpen && currentMinutes < marketClose) return 'open';
  if (currentMinutes >= preMarketStart && currentMinutes < marketOpen) return 'pre-market';
  if (currentMinutes >= marketClose && currentMinutes < afterHoursEnd) return 'after-hours';

  return 'closed';
};

/**
 * Get the start date for a given timeframe
 * @param timeframe - TimeFrame value
 * @param endDate - End date to calculate from (default: now)
 */
export const getStartDateForTimeframe = (
  timeframe: TimeFrame,
  endDate: Date = new Date()
): Date => {
  const start = new Date(endDate);

  switch (timeframe) {
    case '1D':
      start.setDate(start.getDate() - 1);
      break;
    case '5D':
      start.setDate(start.getDate() - 5);
      break;
    case '1M':
      start.setMonth(start.getMonth() - 1);
      break;
    case '3M':
      start.setMonth(start.getMonth() - 3);
      break;
    case '6M':
      start.setMonth(start.getMonth() - 6);
      break;
    case '1Y':
      start.setFullYear(start.getFullYear() - 1);
      break;
    case '5Y':
      start.setFullYear(start.getFullYear() - 5);
      break;
    case 'All':
      start.setFullYear(start.getFullYear() - 50); // Arbitrary long time
      break;
  }

  return start;
};

/**
 * Get the number of days for a timeframe
 * @param timeframe - TimeFrame value
 */
export const getDaysForTimeframe = (timeframe: TimeFrame): number => {
  switch (timeframe) {
    case '1D':
      return 1;
    case '5D':
      return 5;
    case '1M':
      return 30;
    case '3M':
      return 90;
    case '6M':
      return 180;
    case '1Y':
      return 365;
    case '5Y':
      return 1825;
    case 'All':
      return 18250; // Arbitrary large number
  }
};

/**
 * Get appropriate data point interval for a timeframe
 */
export const getIntervalForTimeframe = (
  timeframe: TimeFrame
): 'intraday' | 'daily' | 'weekly' | 'monthly' => {
  switch (timeframe) {
    case '1D':
    case '5D':
      return 'intraday';
    case '1M':
    case '3M':
    case '6M':
      return 'daily';
    case '1Y':
      return 'weekly';
    case '5Y':
    case 'All':
      return 'monthly';
  }
};

/**
 * Format a date for API calls (YYYY-MM-DD)
 * @param date - Date to format
 */
export const formatDateForAPI = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Parse ISO date string
 * @param dateString - ISO date string (YYYY-MM-DD)
 */
export const parseISO = (dateString: string): Date => {
  return new Date(dateString + 'T00:00:00Z');
};

/**
 * Get business day offset
 * @param date - Start date
 * @param days - Number of business days to offset
 */
export const addBusinessDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  let remaining = days;

  while (remaining !== 0) {
    result.setDate(result.getDate() + (remaining > 0 ? 1 : -1));
    const day = result.getDay();

    // Skip weekends
    if (day !== 0 && day !== 6) {
      remaining += remaining > 0 ? -1 : 1;
    }
  }

  return result;
};

/**
 * Check if two dates are the same day
 * @param date1 - First date
 * @param date2 - Second date
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Get the start of day
 * @param date - Date
 */
export const startOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * Get the end of day
 * @param date - Date
 */
export const endOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * Get trading days between two dates
 * @param startDate - Start date
 * @param endDate - End date
 */
export const getTradingDaysBetween = (startDate: Date, endDate: Date): number => {
  let count = 0;
  const current = new Date(startDate);

  while (current <= endDate) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
};

/**
 * Check if date is a US market holiday
 * @param date - Date to check
 */
export const isUSMarketHoliday = (date: Date): boolean => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  // List of US market holidays (simplified, doesn't include floating holidays like Thanksgiving)
  const holidays = [
    { month: 1, day: 1 }, // New Year's Day
    { month: 7, day: 4 }, // Independence Day
    { month: 11, day: 25 }, // Thanksgiving (simplified)
    { month: 12, day: 25 }, // Christmas
  ];

  return holidays.some((h) => h.month === month && h.day === day);
};

/**
 * Get current market time (EST)
 */
export const getMarketTime = (): Date => {
  // Assuming server is UTC, convert to EST
  // This is a simplified version - in production, use a proper timezone library
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  return estTime;
};

/**
 * Get time until next market open (in milliseconds)
 */
export const getTimeUntilMarketOpen = (): number => {
  const nextOpen = getNextMarketOpen();
  return nextOpen.getTime() - Date.now();
};

/**
 * Get time until market close (in milliseconds)
 */
export const getTimeUntilMarketClose = (date: Date = new Date()): number => {
  if (!isMarketOpen(date)) return 0;

  const marketClose = new Date(date);
  marketClose.setHours(MARKET_HOURS.CLOSE.hour, MARKET_HOURS.CLOSE.minute, 0, 0);

  return marketClose.getTime() - date.getTime();
};
