import { Clock, AlertCircle } from 'lucide-react'
import { isMarketOpen, getNextMarketOpen } from '../utils/dateHelpers'
import { formatTime } from '../utils/formatters'

export default function MarketStatus() {
  const open = isMarketOpen(new Date())
  const nextOpen = getNextMarketOpen(new Date())

  return (
    <div
      className={`rounded-lg shadow p-4 flex items-center justify-between ${
        open
          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700'
          : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
      }`}
    >
      <div className="flex items-center space-x-3">
        <Clock
          className={`w-5 h-5 ${
            open ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}
        />
        <div>
          <p
            className={`font-semibold ${
              open ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'
            }`}
          >
            {open ? 'Market Open' : 'Market Closed'}
          </p>
          <p
            className={`text-sm ${
              open ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
            }`}
          >
            {open
              ? 'NYSE trading is active'
              : `Opens ${formatTime(nextOpen)}`}
          </p>
        </div>
      </div>
      {!open && (
        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
      )}
    </div>
  )
}
