/**
 * API Response Type Definitions
 */

export interface IAPIResponse<T> {
  success: boolean;
  data?: T;
  error?: IAPIError;
  timestamp: Date;
}

export interface IAPIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Alpha Vantage API Types
 */
export interface IAlphaVantageQuote {
  'Global Quote': {
    '01. symbol': string;
    '05. price': string;
    '09. change': string;
    '10. change percent': string;
    '06. volume': string;
    '02. open': string;
    '03. high': string;
    '04. low': string;
    '08. previous close': string;
    '07. latest trading day': string;
  };
}

export interface IAlphaVantageTimeSeries {
  'Time Series (Daily)': Record<
    string,
    {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. volume': string;
    }
  >;
}

export interface IAlphaVantageIntraday {
  'Time Series (5min)': Record<
    string,
    {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. volume': string;
    }
  >;
}

/**
 * IEX Cloud API Types
 */
export interface IIEXQuote {
  symbol: string;
  latestPrice: number;
  latestVolume: number;
  latestTime: string;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  close?: number;
  previousClose: number;
  marketCap: number;
  peRatio?: number;
  week52High: number;
  week52Low: number;
}

export interface IIEXCompany {
  symbol: string;
  companyName: string;
  employees?: number;
  ttmEPS?: number;
  ttmRevenue?: number;
  ttmProfit?: number;
  grossProfit?: number;
  cash?: number;
  debt?: number;
  totalAssets?: number;
  totalLiabilities?: number;
  description: string;
  website: string;
  sector: string;
  industry: string;
  ceo: string;
  securityName: string;
  primarySicCode?: string;
  tags: string[];
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  phone?: string;
}

export interface IIEXChart {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  unadjustedVolume?: number;
  change?: number;
  changePercent?: number;
  vwap?: number;
  label?: string;
  changeOverTime?: number;
}

/**
 * Finnhub API Types
 */
export interface IFinnhubQuote {
  c: number; // current price
  d: number; // change
  dp: number; // percent change
  h: number; // high
  l: number; // low
  o: number; // open
  pc: number; // previous close
  t: number; // timestamp
}

export interface IFinnhubCompany {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  isin: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  ipo: string;
}

export interface IFinnhubNews {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  category: string;
  datetime: number;
  headline: string;
  source: string;
}

/**
 * NewsAPI Types
 */
export interface INewsAPIArticle {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  sentiment?: string;
}

export interface INewsAPIResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: INewsAPIArticle[];
}

/**
 * Polygon.io API Types
 */
export interface IPolygonTickerDetails {
  status: string;
  results: {
    ticker: string;
    name: string;
    market: string;
    locale: string;
    type: string;
    active: boolean;
    currency_name: string;
    cik: string;
    composite_figi: string;
    share_class_figi: string;
    last_updated: string;
  };
}

export interface IPolygonAggregates {
  status: string;
  results: Array<{
    v: number; // volume
    vw: number; // weighted volume
    o: number; // open
    c: number; // close
    h: number; // high
    l: number; // low
    t: number; // timestamp
    n: number; // number of transactions
  }>;
  next_url?: string;
  count: number;
}

/**
 * Cache Entry Type
 */
export interface ICacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // time to live in milliseconds
}

/**
 * Error Response
 */
export interface IErrorResponse {
  status: number;
  message: string;
  code: string;
  details?: Record<string, unknown>;
}
