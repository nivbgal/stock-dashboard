import { IMarketIndex } from '../types/stock'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { format } from 'date-fns'

interface MarketIndicesProps {
  indices?: IMarketIndex[]
  loading?: boolean
}

export default function MarketIndices({ indices, loading }: MarketIndicesProps) {
  // Demo data if not provided
  const demoIndices: IMarketIndex[] = [
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

  const displayIndices = indices && indices.length > 0 ? indices : demoIndices

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-center h-48">
        <div className="text-gray-500 dark:text-gray-400">Loading market indices...</div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Market Indices</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayIndices.map((index) => (
          <div
            key={index.symbol}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{index.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{index.symbol}</p>
              </div>
              {index.changePercent >= 0 ? (
                <TrendingUp className="w-6 h-6 text-green-500" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-500" />
              )}
            </div>

            {/* Value */}
            <div className="mb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {index.value.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{index.description}</p>
            </div>

            {/* Change */}
            <div className="flex items-center space-x-2">
              <div
                className={`flex-1 px-3 py-2 rounded font-semibold text-sm text-center transition-colors ${
                  index.changePercent >= 0
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}
              >
                {index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%
              </div>
              <div
                className={`px-3 py-2 rounded font-semibold text-sm ${
                  index.changePercent >= 0
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}
              >
                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
              </div>
            </div>

            {/* Time */}
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              {format(index.timestamp, 'MMM dd, HH:mm')}
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <span className="font-semibold">Market Indices</span> provide a broad view of market performance. These key indicators help gauge overall market sentiment and health.
        </p>
      </div>
    </div>
  )
}
