/**
 * Application Constants
 */

export const API_CONFIG = {
  ALPHA_VANTAGE: {
    BASE_URL: 'https://www.alphavantage.co/query',
    TIMEOUT: 30000,
    RATE_LIMIT: 5, // requests per minute
  },
  IEX_CLOUD: {
    BASE_URL: 'https://cloud.iexapis.com/stable',
    TIMEOUT: 30000,
    RATE_LIMIT: 100, // requests per minute
  },
  FINNHUB: {
    BASE_URL: 'https://finnhub.io/api/v1',
    TIMEOUT: 30000,
    RATE_LIMIT: 60, // requests per minute
  },
  NEWSAPI: {
    BASE_URL: 'https://newsapi.org/v2',
    TIMEOUT: 30000,
    RATE_LIMIT: 100, // requests per minute
  },
  POLYGON: {
    BASE_URL: 'https://api.polygon.io',
    TIMEOUT: 30000,
    RATE_LIMIT: 5, // requests per minute
  },
};

export const CACHE_TTL = {
  QUOTE: 1 * 60 * 1000, // 1 minute
  CHART: 5 * 60 * 1000, // 5 minutes
  COMPANY: 24 * 60 * 60 * 1000, // 24 hours
  NEWS: 30 * 60 * 1000, // 30 minutes
  TECHNICAL: 5 * 60 * 1000, // 5 minutes
};

export const CHART_DEFAULTS = {
  DEFAULT_TIMEFRAME: '1D' as const,
  MAX_POINTS: 500,
  CANDLESTICK_WIDTH: 4,
  CHART_HEIGHT: 400,
  CHART_MARGIN: { top: 20, right: 30, bottom: 20, left: 60 },
};

export const TECHNICAL_INDICATORS = {
  SMA: [20, 50, 200],
  EMA: [12, 26],
  RSI: {
    PERIOD: 14,
    OVERBOUGHT: 70,
    OVERSOLD: 30,
  },
  MACD: {
    FAST: 12,
    SLOW: 26,
    SIGNAL: 9,
  },
  BOLLINGER: {
    PERIOD: 20,
    STDDEV: 2,
  },
};

export const MARKET_HOURS = {
  OPEN: { hour: 9, minute: 30 }, // 9:30 AM EST
  CLOSE: { hour: 16, minute: 0 }, // 4:00 PM EST
  PRE_MARKET_OPEN: { hour: 4, minute: 0 }, // 4:00 AM EST
  POST_MARKET_CLOSE: { hour: 20, minute: 0 }, // 8:00 PM EST
};

export const MARKET_INDICES = [
  { symbol: '^GSPC', name: 'S&P 500' },
  { symbol: '^IXIC', name: 'NASDAQ' },
  { symbol: '^DJI', name: 'Dow Jones' },
  { symbol: '^RUT', name: 'Russell 2000' },
  { symbol: '^VIX', name: 'VIX Volatility' },
];

export const POPULAR_SYMBOLS = [
  'AAPL',
  'MSFT',
  'GOOGL',
  'AMZN',
  'TSLA',
  'BRK.B',
  'META',
  'NVDA',
  'JPM',
  'JNJ',
];

export const TIME_FRAMES = [
  { value: '1D', label: '1 Day', days: 1 },
  { value: '5D', label: '5 Days', days: 5 },
  { value: '1M', label: '1 Month', days: 30 },
  { value: '3M', label: '3 Months', days: 90 },
  { value: '6M', label: '6 Months', days: 180 },
  { value: '1Y', label: '1 Year', days: 365 },
  { value: '5Y', label: '5 Years', days: 1825 },
];

export const ALERT_TYPES = [
  { value: 'price_above', label: 'Price above $X' },
  { value: 'price_below', label: 'Price below $X' },
  { value: 'change_percent', label: 'Change % above X%' },
];

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const SORTING_OPTIONS = [
  { value: 'symbol', label: 'Symbol' },
  { value: 'price', label: 'Price' },
  { value: 'change', label: 'Change' },
  { value: 'volume', label: 'Volume' },
  { value: 'marketCap', label: 'Market Cap' },
];

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
};

export const COLORS = {
  POSITIVE: '#10b981', // green
  NEGATIVE: '#ef4444', // red
  NEUTRAL: '#6b7280', // gray
  PRIMARY: '#3b82f6', // blue
  SECONDARY: '#8b5cf6', // purple
  ACCENT: '#f59e0b', // amber
  CHART_MA20: '#3b82f6',
  CHART_MA50: '#8b5cf6',
  CHART_RSI: '#f59e0b',
  CHART_MACD: '#10b981',
  CANDLESTICK_UP: '#10b981',
  CANDLESTICK_DOWN: '#ef4444',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  API_ERROR: 'API error. Please try again later.',
  INVALID_SYMBOL: 'Invalid stock symbol.',
  NO_DATA: 'No data available for this stock.',
  RATE_LIMITED: 'Rate limit exceeded. Please wait a moment.',
  UNAUTHORIZED: 'API key is invalid or missing.',
};

export const SUCCESS_MESSAGES = {
  ADDED_TO_WATCHLIST: 'Added to watchlist',
  REMOVED_FROM_WATCHLIST: 'Removed from watchlist',
  ALERT_CREATED: 'Alert created successfully',
  ALERT_DELETED: 'Alert deleted',
  PORTFOLIO_UPDATED: 'Portfolio updated',
};

export const LOCAL_STORAGE_KEYS = {
  WATCHLISTS: 'stock_dashboard_watchlists',
  PORTFOLIO: 'stock_dashboard_portfolio',
  ALERTS: 'stock_dashboard_alerts',
  THEME: 'stock_dashboard_theme',
  PREFERENCES: 'stock_dashboard_preferences',
};

export const REGEX_PATTERNS = {
  TICKER: /^[A-Z]{1,5}(\.[A-Z])?$/,
  CURRENCY: /^\d+\.?\d{0,2}$/,
  PERCENTAGE: /^-?\d+\.?\d{0,2}$/,
};

export const FEATURES = {
  REAL_TIME_QUOTES: true,
  TECHNICAL_INDICATORS: true,
  PORTFOLIO_TRACKING: true,
  ALERTS: true,
  NEWS_FEED: true,
  DARK_MODE: true,
  EXPORT_DATA: false, // Coming soon
  BACKTESTING: false, // Coming soon
};

export const APP_VERSION = '1.0.0';
export const APP_NAME = 'Stock Market Dashboard';
export const SUPPORT_EMAIL = 'support@stockdashboard.local';
