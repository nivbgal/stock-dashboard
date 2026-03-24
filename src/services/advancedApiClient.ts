/**
 * Advanced API Client for Phase 3 Features
 * Handles Fear & Greed Index, Market Indices, Crypto Assets, and Twitter Feed
 */

import axios, { AxiosInstance } from 'axios'
import {
  IFearGreedIndex,
  IMarketIndex,
  ICryptoAsset,
  ITwitterPost,
  IFearGreedHistoryPoint,
} from '../types/stock'

class AdvancedApiClient {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 10000,
    })
  }

  /**
   * Get Fear & Greed Index
   * Uses public data from alternative.me or similar service
   */
  async getFearGreedIndex(): Promise<IFearGreedIndex> {
    try {
      // Using public Fear & Greed Index API (no key required)
      const response = await axios.get('https://api.alternative.me/fng/?limit=7&format=json')

      const data = response.data.data
      const currentData = data[0]

      const historical: IFearGreedHistoryPoint[] = data
        .reverse()
        .map((item: any) => ({
          value: parseInt(item.value),
          classification: item.value_classification,
          timestamp: new Date(parseInt(item.timestamp) * 1000),
        }))

      const classification = this.getClassification(parseInt(currentData.value))

      return {
        value: parseInt(currentData.value),
        classification: classification as
          | 'Extreme Fear'
          | 'Fear'
          | 'Neutral'
          | 'Greed'
          | 'Extreme Greed',
        timestamp: new Date(parseInt(currentData.timestamp) * 1000),
        historicalData: historical,
      }
    } catch (error) {
      console.error('Failed to fetch Fear & Greed Index:', error)
      // Return demo data on failure
      return this.getDemoFearGreedIndex()
    }
  }

  /**
   * Get Market Indices (S&P 500, NASDAQ, DOW, Russell 2000)
   * Uses Finnhub API
   */
  async getMarketIndices(): Promise<IMarketIndex[]> {
    const indices: IMarketIndex[] = []
    const apiKey = import.meta.env.VITE_FINNHUB_KEY

    const symbols = [
      { symbol: '^GSPC', name: 'S&P 500', description: 'Large-cap U.S. equities index' },
      { symbol: '^IXIC', name: 'NASDAQ Composite', description: 'Technology-heavy composite index' },
      { symbol: '^DJI', name: 'Dow Jones Industrial', description: '30 large-cap U.S. companies' },
      { symbol: '^RUT', name: 'Russell 2000', description: 'Small-cap U.S. equities' },
    ]

    // If no API key, return demo data
    if (!apiKey) {
      console.warn('Finnhub API key not configured, using demo data')
      return this.getDemoMarketIndices()
    }

    try {
      for (const idx of symbols) {
        try {
          const response = await axios.get('https://finnhub.io/api/v1/quote', {
            params: {
              symbol: idx.symbol,
              token: apiKey,
            },
          })

          const data = response.data
          indices.push({
            symbol: idx.symbol,
            name: idx.name,
            value: data.c || 0, // current price
            change: data.d || 0, // change
            changePercent: data.dp || 0, // change percent
            timestamp: new Date(),
            description: idx.description,
          })
        } catch (error) {
          console.error(`Failed to fetch ${idx.symbol} from Finnhub:`, error)
          // Fall back to demo for this symbol
          const demoIndex = await this.getDemoMarketIndex(idx.symbol, idx.name, idx.description)
          indices.push(demoIndex)
        }
      }
      return indices
    } catch (error) {
      console.error('Failed to fetch market indices:', error)
      return this.getDemoMarketIndices()
    }
  }

  /**
   * Get Crypto Assets (Bitcoin, Ethereum, etc.)
   * Uses CoinGecko or Binance API (public)
   */
  async getCryptoAssets(): Promise<ICryptoAsset[]> {
    try {
      // Using CoinGecko API (free, no auth required)
      const ids = 'bitcoin,ethereum'
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=10&sparkline=false`
      )

      const crypto: ICryptoAsset[] = response.data.map((coin: any) => ({
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        change: coin.price_change_24h || 0,
        changePercent: coin.price_change_percentage_24h || 0,
        high24h: coin.high_24h,
        low24h: coin.low_24h,
        marketCap: coin.market_cap,
        volume24h: coin.total_volume,
        timestamp: new Date(),
        marketCapRank: coin.market_cap_rank,
        circulatingSupply: coin.circulating_supply,
        totalSupply: coin.total_supply,
      }))

      // Add commodities (Gold, Silver) - using demo data
      const gold = this.getDemoCommodity('GOLD', 'Gold (Spot)', 2145.80, 35.20, 1.66)
      const silver = this.getDemoCommodity('SILVER', 'Silver (Spot)', 27.45, 0.45, 1.66)

      return [...crypto, gold, silver]
    } catch (error) {
      console.error('Failed to fetch crypto assets:', error)
      return this.getDemoCryptoAssets()
    }
  }

  /**
   * Get Twitter/X Financial Posts
   * Requires X API v2 bearer token or alternative scraping service
   */
  async getTwitterFeed(): Promise<ITwitterPost[]> {
    try {
      // This would require X API access
      // For now, return demo data
      return this.getDemoTwitterFeed()
    } catch (error) {
      console.error('Failed to fetch Twitter feed:', error)
      return this.getDemoTwitterFeed()
    }
  }

  /**
   * Get combined market overview
   */
  async getMarketOverview() {
    try {
      const [fearGreed, indices, crypto, tweets] = await Promise.all([
        this.getFearGreedIndex(),
        this.getMarketIndices(),
        this.getCryptoAssets(),
        this.getTwitterFeed(),
      ])

      return {
        fearGreedIndex: fearGreed,
        indices,
        cryptoAssets: crypto,
        twitterFeed: tweets,
      }
    } catch (error) {
      console.error('Failed to get market overview:', error)
      throw error
    }
  }

  // ============= DEMO/FALLBACK DATA =============

  private getClassification(value: number): string {
    if (value <= 25) return 'Extreme Fear'
    if (value <= 45) return 'Fear'
    if (value <= 55) return 'Neutral'
    if (value <= 75) return 'Greed'
    return 'Extreme Greed'
  }

  private getDemoFearGreedIndex(): IFearGreedIndex {
    return {
      value: 64,
      classification: 'Greed',
      timestamp: new Date(),
      historicalData: [
        { value: 45, classification: 'Fear', timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        { value: 52, classification: 'Neutral', timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) },
        { value: 58, classification: 'Greed', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
        { value: 55, classification: 'Neutral', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
        { value: 62, classification: 'Greed', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
        { value: 68, classification: 'Greed', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
        { value: 64, classification: 'Greed', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
        { value: 64, classification: 'Greed', timestamp: new Date() },
      ],
    }
  }

  private async getDemoMarketIndex(
    symbol: string,
    name: string,
    description: string
  ): Promise<IMarketIndex> {
    const demoValues: Record<string, { value: number; change: number; changePercent: number }> = {
      '^GSPC': { value: 5234.80, change: 52.45, changePercent: 1.01 },
      '^IXIC': { value: 16234.50, change: 215.30, changePercent: 1.34 },
      '^DJI': { value: 38645.75, change: -125.50, changePercent: -0.32 },
      '^RUT': { value: 1967.50, change: 28.75, changePercent: 1.48 },
    }

    const data = demoValues[symbol] || { value: 5000, change: 50, changePercent: 1.0 }

    return {
      symbol,
      name,
      ...data,
      timestamp: new Date(),
      description,
    }
  }

  private getDemoMarketIndices(): IMarketIndex[] {
    return [
      {
        symbol: '^GSPC',
        name: 'S&P 500',
        value: 5234.80,
        change: 52.45,
        changePercent: 1.01,
        timestamp: new Date(),
        description: 'Large-cap U.S. equities index',
      },
      {
        symbol: '^IXIC',
        name: 'NASDAQ Composite',
        value: 16234.50,
        change: 215.30,
        changePercent: 1.34,
        timestamp: new Date(),
        description: 'Technology-heavy composite index',
      },
      {
        symbol: '^DJI',
        name: 'Dow Jones Industrial',
        value: 38645.75,
        change: -125.50,
        changePercent: -0.32,
        timestamp: new Date(),
        description: '30 large-cap U.S. companies',
      },
      {
        symbol: '^RUT',
        name: 'Russell 2000',
        value: 1967.50,
        change: 28.75,
        changePercent: 1.48,
        timestamp: new Date(),
        description: 'Small-cap U.S. equities',
      },
    ]
  }

  private getDemoCryptoAssets(): ICryptoAsset[] {
    return [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        price: 68234.50,
        change: 2345.75,
        changePercent: 3.55,
        high24h: 69500.00,
        low24h: 66800.00,
        marketCap: 1340000000000,
        volume24h: 32000000000,
        timestamp: new Date(),
        marketCapRank: 1,
        circulatingSupply: 21000000,
        totalSupply: 21000000,
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        price: 3824.60,
        change: 185.40,
        changePercent: 5.09,
        high24h: 3900.00,
        low24h: 3650.00,
        marketCap: 460000000000,
        volume24h: 18500000000,
        timestamp: new Date(),
        marketCapRank: 2,
        circulatingSupply: 120000000,
        totalSupply: 120000000,
      },
      this.getDemoCommodity('GOLD', 'Gold (Spot)', 2145.80, 35.20, 1.66),
      this.getDemoCommodity('SILVER', 'Silver (Spot)', 27.45, 0.45, 1.66),
    ]
  }

  private getDemoCommodity(symbol: string, name: string, price: number, change: number, changePercent: number): ICryptoAsset {
    return {
      symbol,
      name,
      price,
      change,
      changePercent,
      high24h: price + change * 2,
      low24h: price - change,
      volume24h: 850000000,
      timestamp: new Date(),
    }
  }

  private getDemoTwitterFeed(): ITwitterPost[] {
    return [
      {
        id: '1',
        author: 'Wall Street Bets',
        handle: '@wallstreetbets',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wsb',
        content:
          '📈 Market showing strong bullish signals today. The fear & greed index suggests smart money is accumulating. $SPY $QQQ #stocks',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 12450,
        retweets: 5890,
        replies: 1340,
        url: 'https://twitter.com/wallstreetbets/status/1',
        sentiment: 'bullish',
      },
      {
        id: '2',
        author: 'Stock Market Guru',
        handle: '@marketguru_pro',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guru',
        content:
          '⚠️ Breaking: Fed signals potential rate cuts in Q2. NASDAQ futures popping. Investors should be cautious about overexposure. $SPY $NDX',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likes: 8765,
        retweets: 4321,
        replies: 891,
        url: 'https://twitter.com/marketguru_pro/status/2',
        sentiment: 'neutral',
      },
      {
        id: '3',
        author: 'Crypto Daily',
        handle: '@cryptodaily',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=crypto',
        content:
          '🚀 Bitcoin breaks through $68k resistance! Institutional adoption accelerating. This could be the start of the next bull run. $BTC #crypto',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        likes: 15340,
        retweets: 8900,
        replies: 2145,
        url: 'https://twitter.com/cryptodaily/status/3',
        sentiment: 'bullish',
      },
    ]
  }
}

export default new AdvancedApiClient()
