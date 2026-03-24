/**
 * Custom hooks for Phase 3 features
 * Fear & Greed Index, Market Indices, Crypto Assets, Twitter Feed
 */

import { useEffect, useState } from 'react'
import advancedApiClient from '../services/advancedApiClient'
import {
  IFearGreedIndex,
  IMarketIndex,
  ICryptoAsset,
  ITwitterPost,
  IMarketOverview,
} from '../types/stock'

/**
 * Hook to fetch Fear & Greed Index
 */
export function useFearGreedIndex() {
  const [data, setData] = useState<IFearGreedIndex | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await advancedApiClient.getFearGreedIndex()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Fear & Greed Index')
        // Fallback to demo data on error
        setData({
          value: 64,
          classification: 'Greed',
          timestamp: new Date(),
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Refresh every 30 minutes
    const interval = setInterval(fetchData, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return { data, loading, error }
}

/**
 * Hook to fetch Market Indices
 */
export function useMarketIndices() {
  const [data, setData] = useState<IMarketIndex[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await advancedApiClient.getMarketIndices()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch market indices')
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Refresh every 15 minutes
    const interval = setInterval(fetchData, 15 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return { data, loading, error }
}

/**
 * Hook to fetch Crypto Assets
 */
export function useCryptoAssets() {
  const [data, setData] = useState<ICryptoAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await advancedApiClient.getCryptoAssets()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch crypto assets')
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Refresh every 5 minutes for crypto
    const interval = setInterval(fetchData, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return { data, loading, error }
}

/**
 * Hook to fetch Twitter Feed
 */
export function useTwitterFeed() {
  const [data, setData] = useState<ITwitterPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await advancedApiClient.getTwitterFeed()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Twitter feed')
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Refresh every 10 minutes
    const interval = setInterval(fetchData, 10 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return { data, loading, error }
}

/**
 * Hook to fetch complete market overview
 */
export function useMarketOverview() {
  const [data, setData] = useState<IMarketOverview | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await advancedApiClient.getMarketOverview()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch market overview')
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Refresh every 15 minutes
    const interval = setInterval(fetchData, 15 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return { data, loading, error }
}
