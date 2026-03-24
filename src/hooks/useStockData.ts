import { useState, useEffect } from 'react'
import { useStockStore } from '../store/stockStore'
import { apiClient } from '../services/apiClient'
import { IStockQuote } from '../types/stock'

export function useStockData(symbol: string | undefined) {
  const { addQuote, setLoading, setError } = useStockStore()
  const [data, setData] = useState<IStockQuote | null>(null)

  useEffect(() => {
    if (!symbol) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const quoteData = await apiClient.getStockQuote(symbol)
        const quote: IStockQuote = {
          ...quoteData,
          name: symbol,
        }
        addQuote(quote)
        setData(quote)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stock data'
        setError(errorMessage)
        console.error('Error in useStockData:', errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [symbol, addQuote, setLoading, setError])

  return data
}

export function useChartData(symbol: string | undefined, interval: 'intraday' | 'daily' = 'daily') {
  const { setLoading, setError } = useStockStore()
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    if (!symbol) return

    const fetchChartData = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = interval === 'intraday'
          ? await apiClient.getIntradayData(symbol)
          : await apiClient.getDailyData(symbol)

        setChartData(data.slice(0, 60)) // Last 60 data points
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch chart data'
        setError(errorMessage)
        console.error('Error in useChartData:', errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchChartData()
  }, [symbol, interval, setLoading, setError])

  return chartData
}
