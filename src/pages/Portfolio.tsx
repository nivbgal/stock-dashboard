import { useStockStore } from '../store/stockStore'
import { formatCurrency, formatPercent } from '../utils/formatters'
import { TrendingUp } from 'lucide-react'

export default function Portfolio() {
  const { positions } = useStockStore()

  const totalValue = positions.reduce((sum, p) => sum + (p.currentPrice * p.quantity), 0)
  const totalCost = positions.reduce((sum, p) => sum + (p.entryPrice * p.quantity), 0)
  const totalGainLoss = totalValue - totalCost
  const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Portfolio
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Manage and track your investments
        </p>
      </div>

      {positions.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
          <TrendingUp className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No positions yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Add stocks to your portfolio to get started
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                Total Value
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalValue)}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                Total Cost
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalCost)}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                Gain/Loss
              </p>
              <p
                className={`text-2xl font-bold ${
                  totalGainLoss >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {formatCurrency(totalGainLoss)}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                Return %
              </p>
              <p
                className={`text-2xl font-bold ${
                  totalGainLossPercent >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {formatPercent(totalGainLossPercent)}
              </p>
            </div>
          </div>

          {/* Holdings Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">
                      Symbol
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">
                      Shares
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">
                      Avg Cost
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">
                      Current Price
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">
                      Value
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">
                      Gain/Loss
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {positions.map((position) => {
                    const positionValue = position.currentPrice * position.quantity
                    const positionCost = position.entryPrice * position.quantity
                    const gainLoss = positionValue - positionCost
                    const gainLossPercent =
                      positionCost > 0 ? (gainLoss / positionCost) * 100 : 0

                    return (
                      <tr
                        key={position.symbol}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {position.symbol}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-700 dark:text-gray-300">
                          {position.quantity}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-700 dark:text-gray-300">
                          {formatCurrency(position.entryPrice)}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-700 dark:text-gray-300">
                          {formatCurrency(position.currentPrice)}
                        </td>
                        <td className="px-6 py-4 text-right font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(positionValue)}
                        </td>
                        <td
                          className={`px-6 py-4 text-right font-semibold ${
                            gainLoss >= 0
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {formatCurrency(gainLoss)} ({formatPercent(gainLossPercent)})
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
