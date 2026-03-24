import { useEffect, useState } from 'react'
import { useStockStore } from '../store/stockStore'
import StockCard from '../components/StockCard'
import FearGreedIndex from '../components/FearGreedIndex'
import MarketIndices from '../components/MarketIndices'
import CryptoAssets from '../components/CryptoAssets'
import TwitterFeed from '../components/TwitterFeed'
import { IStockQuote } from '../types/stock'
import {
  useFearGreedIndex,
  useMarketIndices,
  useCryptoAssets,
  useTwitterFeed,
} from '../hooks/useAdvancedData'
import { AlertCircle } from 'lucide-react'

export default function Dashboard() {
  const { quotes, loading: stockLoading } = useStockStore()
  const [demoQuotes, setDemoQuotes] = useState<IStockQuote[]>([])

  // Phase 3 data hooks
  const fearGreed = useFearGreedIndex()
  const indices = useMarketIndices()
  const crypto = useCryptoAssets()
  const twitter = useTwitterFeed()

  useEffect(() => {
    // Demo data for initial display
    const demoData: IStockQuote[] = [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 189.95,
        change: 2.45,
        changePercent: 1.31,
        high: 191.50,
        low: 187.30,
        volume: 52_000_000,
        timestamp: new Date(),
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 140.20,
        change: -1.80,
        changePercent: -1.27,
        high: 142.50,
        low: 139.00,
        volume: 28_500_000,
        timestamp: new Date(),
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 378.91,
        change: 5.20,
        changePercent: 1.39,
        high: 380.00,
        low: 373.20,
        volume: 19_200_000,
        timestamp: new Date(),
      },
      {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        price: 242.84,
        change: -3.50,
        changePercent: -1.42,
        high: 248.00,
        low: 240.50,
        volume: 145_800_000,
        timestamp: new Date(),
      },
    ]
    setDemoQuotes(demoData)
  }, [])

  const displayQuotes = quotes.length > 0 ? quotes : demoQuotes

  return (
    <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Market Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Real-time market data, sentiment analysis, and financial insights
        </p>
      </div>

      {/* Error Banner */}
      {(fearGreed.error || indices.error || crypto.error || twitter.error) && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
              Note: Some data may be using demo values
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              For real-time data, ensure API keys are configured in .env.local
            </p>
          </div>
        </div>
      )}

      {/* Section 1: Fear & Greed Index - PROMINENT PLACEMENT */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-1 shadow-lg">
        <FearGreedIndex data={fearGreed.data || undefined} loading={fearGreed.loading} />
      </section>

      {/* Section 2: Market Indices */}
      <section>
        <MarketIndices indices={indices.data} loading={indices.loading} />
      </section>

      {/* Section 3: Popular Stocks */}
      <section>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Popular Stocks
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Track top-performing stocks in real-time
            </p>
          </div>

          {stockLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-500 dark:text-gray-400">Loading stock data...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayQuotes.map((quote) => (
                <StockCard key={quote.symbol} quote={quote} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 4: Crypto & Commodities */}
      <section>
        <CryptoAssets assets={crypto.data} loading={crypto.loading} />
      </section>

      {/* Section 5: Financial Twitter Feed */}
      <section>
        <TwitterFeed posts={twitter.data} loading={twitter.loading} />
      </section>

      {/* Quick Stats Card */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Dashboard Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/50 rounded-lg p-4">
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Market Sentiment
            </div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {fearGreed.data ? `${fearGreed.data.value}` : '—'}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Fear & Greed Index
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/50 rounded-lg p-4">
            <div className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
              S&P 500
            </div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {indices.data?.[0]?.value.toFixed(0) || '—'}
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">
              {indices.data?.[0]?.changePercent
                ? `${indices.data[0].changePercent >= 0 ? '+' : ''}${indices.data[0].changePercent.toFixed(2)}%`
                : '—'}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-900/50 rounded-lg p-4">
            <div className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-2">
              Bitcoin
            </div>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {crypto.data?.[0]?.price
                ? `$${(crypto.data[0].price / 1000).toFixed(1)}k`
                : '—'}
            </div>
            <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
              {crypto.data?.[0]?.changePercent
                ? `${crypto.data[0].changePercent >= 0 ? '+' : ''}${crypto.data[0].changePercent.toFixed(2)}%`
                : '—'}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/50 rounded-lg p-4">
            <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
              Social Feed
            </div>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {twitter.data?.length || '—'}
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              Latest posts
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Guide */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-blue-500">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Dashboard Features
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Stock Tracking</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✓ Real-time stock quotes</li>
              <li>✓ Popular stocks overview</li>
              <li>✓ Search for any ticker</li>
              <li>✓ Add to watchlist</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Market Insights</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✓ Fear & Greed Index tracking</li>
              <li>✓ Major indices performance</li>
              <li>✓ Crypto & commodity prices</li>
              <li>✓ Financial social sentiment</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Portfolio Management</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✓ Track holdings and P&L</li>
              <li>✓ Portfolio analytics</li>
              <li>✓ Performance metrics</li>
              <li>✓ Diversification analysis</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Advanced Tools</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✓ Technical indicators</li>
              <li>✓ Price alerts</li>
              <li>✓ Dark/light theme</li>
              <li>✓ Responsive design</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
