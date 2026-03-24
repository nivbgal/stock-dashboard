import axios, { AxiosInstance } from 'axios'
import { API_CONFIG } from '../utils/constants'

class APIClient {
  private alphaVantageClient: AxiosInstance
  private finnhubClient: AxiosInstance

  constructor() {
    const alphaVantageKey = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY
    const finnhubKey = import.meta.env.VITE_FINNHUB_API_KEY

    this.alphaVantageClient = axios.create({
      baseURL: API_CONFIG.ALPHA_VANTAGE.BASE_URL,
      timeout: 10000,
    })

    this.finnhubClient = axios.create({
      baseURL: API_CONFIG.FINNHUB.BASE_URL,
      timeout: 10000,
      params: {
        token: finnhubKey,
      },
    })
  }

  /**
   * Get real-time stock quote from Alpha Vantage
   */
  async getStockQuote(symbol: string) {
    try {
      const response = await this.alphaVantageClient.get('/query', {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol.toUpperCase(),
          apikey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
        },
      })

      const data = response.data['Global Quote']
      if (!data || Object.keys(data).length === 0) {
        throw new Error(`No data found for symbol: ${symbol}`)
      }

      return {
        symbol: data['01. symbol'],
        price: parseFloat(data['05. price']),
        change: parseFloat(data['09. change']),
        changePercent: parseFloat(data['10. change percent'].replace('%', '')),
        high: parseFloat(data['03. high']),
        low: parseFloat(data['04. low']),
        volume: parseInt(data['06. volume']),
        timestamp: new Date(),
      }
    } catch (error) {
      console.error('Error fetching stock quote:', error)
      throw error
    }
  }

  /**
   * Get intraday chart data from Alpha Vantage
   */
  async getIntradayData(symbol: string, interval: string = '5min') {
    try {
      const response = await this.alphaVantageClient.get('/query', {
        params: {
          function: 'INTRADAY',
          symbol: symbol.toUpperCase(),
          interval,
          apikey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
        },
      })

      const timeSeries = response.data[`Time Series (${interval})`]
      if (!timeSeries) {
        throw new Error(`No intraday data found for symbol: ${symbol}`)
      }

      return Object.entries(timeSeries).map(([time, data]: [string, any]) => ({
        time,
        open: parseFloat(data['1. open']),
        high: parseFloat(data['2. high']),
        low: parseFloat(data['3. low']),
        close: parseFloat(data['4. close']),
        volume: parseInt(data['5. volume']),
      }))
    } catch (error) {
      console.error('Error fetching intraday data:', error)
      throw error
    }
  }

  /**
   * Get daily chart data from Alpha Vantage
   */
  async getDailyData(symbol: string) {
    try {
      const response = await this.alphaVantageClient.get('/query', {
        params: {
          function: 'TIME_SERIES_DAILY',
          symbol: symbol.toUpperCase(),
          apikey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
        },
      })

      const timeSeries = response.data['Time Series (Daily)']
      if (!timeSeries) {
        throw new Error(`No daily data found for symbol: ${symbol}`)
      }

      return Object.entries(timeSeries).map(([date, data]: [string, any]) => ({
        date,
        open: parseFloat(data['1. open']),
        high: parseFloat(data['2. high']),
        low: parseFloat(data['3. low']),
        close: parseFloat(data['4. close']),
        volume: parseInt(data['5. volume']),
      }))
    } catch (error) {
      console.error('Error fetching daily data:', error)
      throw error
    }
  }

  /**
   * Get company information from Finnhub
   */
  async getCompanyInfo(symbol: string) {
    try {
      const response = await this.finnhubClient.get('/stock/profile2', {
        params: {
          symbol: symbol.toUpperCase(),
        },
      })

      return {
        name: response.data.name,
        ticker: response.data.ticker,
        exchange: response.data.exchange,
        country: response.data.country,
        currency: response.data.currency,
        ipo: response.data.ipo,
        marketCapitalization: response.data.marketCapitalization,
        description: response.data.description,
        logo: response.data.logo,
        weburl: response.data.weburl,
      }
    } catch (error) {
      console.error('Error fetching company info:', error)
      throw error
    }
  }

  /**
   * Get technical indicators from Finnhub
   */
  async getTechnicalIndicators(symbol: string, resolution: string = 'D') {
    try {
      const response = await this.finnhubClient.get('/technical-indicator', {
        params: {
          symbol: symbol.toUpperCase(),
          resolution,
          indicator: 'rsi',
        },
      })

      return response.data
    } catch (error) {
      console.error('Error fetching technical indicators:', error)
      throw error
    }
  }
}

export const apiClient = new APIClient()
