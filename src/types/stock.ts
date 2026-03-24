/**
 * Stock Market Dashboard - Type Definitions
 */

export interface IStockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  peRatio?: number;
  dividendYield?: number;
  high52Week?: number;
  low52Week?: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  previousClose?: number;
  timestamp: Date;
}

export interface IOHLCData {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface IChartData extends IOHLCData {
  sma20?: number;
  sma50?: number;
  ema12?: number;
  ema26?: number;
  rsi?: number;
  macdLine?: number;
  macdSignal?: number;
  macdHistogram?: number;
  bollingerUpper?: number;
  bollingerMiddle?: number;
  bollingerLower?: number;
}

export interface ICompanyInfo {
  symbol: string;
  name: string;
  industry: string;
  sector: string;
  description: string;
  website?: string;
  employees?: number;
  ceo?: string;
  headquarters?: string;
}

export interface INewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  imageUrl?: string;
  publishedAt: Date;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface IPortfolioPosition {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  sector: string;
}

export interface IPortfolio {
  positions: IPortfolioPosition[];
  totalValue: number;
  totalCost: number;
  totalGain: number;
  totalGainPercent: number;
  lastUpdated: Date;
}

export interface IAlert {
  id: string;
  symbol: string;
  type: 'price_above' | 'price_below' | 'change_percent';
  threshold: number;
  isActive: boolean;
  createdAt: Date;
  triggeredAt?: Date;
}

export interface IWatchlist {
  id: string;
  name: string;
  symbols: string[];
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITechnicalIndicators {
  sma20: boolean;
  sma50: boolean;
  ema12: boolean;
  ema26: boolean;
  rsi: boolean;
  macd: boolean;
  bollingerBands: boolean;
}

export interface IMarketMovers {
  gainers: IStockQuote[];
  losers: IStockQuote[];
  mostActive: IStockQuote[];
}

export interface IEconomicEvent {
  id: string;
  date: Date;
  country: string;
  event: string;
  forecast?: number;
  previous?: number;
  actual?: number;
  importance: 'high' | 'medium' | 'low';
}

export interface IEarningsEvent {
  symbol: string;
  company: string;
  date: Date;
  eps?: number;
  revenue?: number;
}

export type TimeFrame = '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | '5Y' | 'All';

export interface IAppState {
  theme: 'light' | 'dark';
  selectedStock?: IStockQuote;
  watchlists: IWatchlist[];
  portfolio?: IPortfolio;
  alerts: IAlert[];
  preferences: IUserPreferences;
}

export interface IUserPreferences {
  currency: string;
  dateFormat: string;
  timeZone: string;
  notifications: boolean;
  autoRefreshInterval: number; // milliseconds
}

export type SortField = 'symbol' | 'price' | 'change' | 'volume' | 'marketCap';
export type SortOrder = 'asc' | 'desc';

// Phase 3: Fear & Greed Index and Multi-Asset Features
export interface IFearGreedIndex {
  value: number; // 0-100
  classification: 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';
  timestamp: Date;
  historicalData?: IFearGreedHistoryPoint[];
}

export interface IFearGreedHistoryPoint {
  value: number;
  classification: string;
  timestamp: Date;
}

export interface IMarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  timestamp: Date;
  description: string;
}

export interface IAssetPrice {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high24h?: number;
  low24h?: number;
  marketCap?: number;
  volume24h?: number;
  timestamp: Date;
}

export interface ITwitterPost {
  id: string;
  author: string;
  handle: string;
  profileImage?: string;
  content: string;
  timestamp: Date;
  likes: number;
  retweets: number;
  replies: number;
  url: string;
  sentiment?: 'bullish' | 'bearish' | 'neutral';
}

export interface IFinancialTwitterFeed {
  posts: ITwitterPost[];
  lastUpdated: Date;
}

export interface ICryptoAsset extends IAssetPrice {
  marketCapRank?: number;
  circulatingSupply?: number;
  totalSupply?: number;
}

export interface IMarketOverview {
  fearGreedIndex: IFearGreedIndex;
  indices: IMarketIndex[];
  cryptoAssets: ICryptoAsset[];
  twitterFeed: ITwitterPost[];
}
