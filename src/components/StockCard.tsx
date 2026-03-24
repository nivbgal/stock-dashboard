import { IStockQuote } from '../types/stock'
import { TrendingUp, TrendingDown, Star } from 'lucide-react'
import { formatCurrency, formatPercent } from '../utils/formatters'

interface StockCardProps {
  quote: IStockQuote
  onAddToWatchlist?: () => void
  isFavorite?: boolean
}

export default function StockCard({ quote, onAddToWatchlist, isFavorite = false }: StockCardProps) {
  const isPositive = quote.change >= 0
  const changeColor = isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
  const bgColor = isPositive ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {quote.symbol}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {quote.name}
          </p>
        </div>
        <button
          onClick={onAddToWatchlist}
          className={`p-2 rounded-lg transition-colors ${
            isFavorite
              ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-yellow-600'
          }`}
        >
          <Star className="w-5 h-5 fill-current" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(quote.price)}
          </span>
          <span className={`text-sm font-semibold ${changeColor}`}>
            {isPositive ? '+' : ''}{formatCurrency(quote.change)}
          </span>
        </div>

        <div className={`flex items-center space-x-2 ${bgColor} px-3 py-2 rounded-lg`}>
          {isPositive ? (
            <TrendingUp className={`w-4 h-4 ${changeColor}`} />
          ) : (
            <TrendingDown className={`w-4 h-4 ${changeColor}`} />
          )}
          <span className={`text-sm font-semibold ${changeColor}`}>
            {formatPercent(quote.changePercent)}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className="text-gray-500 dark:text-gray-400">High</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {formatCurrency(quote.high ?? quote.price)}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Low</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {formatCurrency(quote.low ?? quote.price)}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Vol</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {quote.volume.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
