import { useState } from 'react'

interface TechnicalIndicatorsProps {
  prices: number[]
  symbol: string
}

type IndicatorType = 'sma' | 'ema' | 'rsi' | 'macd' | 'bb'

export default function TechnicalIndicators({
  prices,
  symbol,
}: TechnicalIndicatorsProps) {
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorType>('sma')

  if (!prices || prices.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-500 dark:text-gray-400">
          No price data available for technical analysis
        </p>
      </div>
    )
  }

  const renderIndicatorData = () => {
    switch (selectedIndicator) {
      case 'sma': {
        // Simplified calculation for display
        const sma20 = prices.slice(-20).reduce((a, b) => a + b, 0) / 20
        const sma50 = prices.slice(-50).reduce((a, b) => a + b, 0) / (prices.length >= 50 ? 50 : prices.length)
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                SMA(20)
              </span>
              <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                ${sma20.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                SMA(50)
              </span>
              <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                ${sma50.toFixed(2)}
              </span>
            </div>
          </div>
        )
      }

      case 'ema': {
        // Simplified EMA calculation
        const ema12 = prices.slice(-12).reduce((a, b) => a + b, 0) / 12
        const ema26 = prices.slice(-26).reduce((a, b) => a + b, 0) / (prices.length >= 26 ? 26 : prices.length)
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                EMA(12)
              </span>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                ${ema12.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                EMA(26)
              </span>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                ${ema26.toFixed(2)}
              </span>
            </div>
          </div>
        )
      }

      case 'rsi': {
        // Simplified RSI calculation
        if (prices.length < 2) {
          return <div className="text-gray-500">Not enough data</div>
        }
        const gains = []
        const losses = []
        for (let i = 1; i < prices.length; i++) {
          const change = prices[i] - prices[i - 1]
          if (change > 0) gains.push(change)
          else losses.push(Math.abs(change))
        }
        const avgGain = gains.reduce((a, b) => a + b, 0) / 14
        const avgLoss = losses.reduce((a, b) => a + b, 0) / 14
        const rs = avgGain / avgLoss
        const rsi = 100 - (100 / (1 + rs))
        
        const rsiStatus = rsi > 70 ? 'Overbought' : rsi < 30 ? 'Oversold' : 'Neutral'
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                RSI(14)
              </span>
              <span className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                {rsi.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
              <span
                className={`text-sm font-semibold ${
                  rsiStatus === 'Overbought'
                    ? 'text-red-600 dark:text-red-400'
                    : rsiStatus === 'Oversold'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {rsiStatus}
              </span>
            </div>
          </div>
        )
      }

      case 'macd': {
        // Simplified MACD display
        const ema12 = prices.slice(-12).reduce((a, b) => a + b, 0) / 12
        const ema26 = prices.slice(-26).reduce((a, b) => a + b, 0) / (prices.length >= 26 ? 26 : prices.length)
        const macd = ema12 - ema26
        const signal = macd * 0.8
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                MACD
              </span>
              <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                {macd.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Signal Line
              </span>
              <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                {signal.toFixed(2)}
              </span>
            </div>
          </div>
        )
      }

      case 'bb': {
        // Simplified Bollinger Bands calculation
        const period = Math.min(20, prices.length)
        const middle = prices.slice(-period).reduce((a, b) => a + b, 0) / period
        const deviation = Math.sqrt(
          prices.slice(-period).reduce((sum, price) => sum + Math.pow(price - middle, 2), 0) / period
        )
        const upper = middle + deviation * 2
        const lower = middle - deviation * 2
        
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Upper Band
              </span>
              <span className="text-lg font-semibold text-red-600 dark:text-red-400">
                ${upper.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Middle Band
              </span>
              <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                ${middle.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Lower Band
              </span>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                ${lower.toFixed(2)}
              </span>
            </div>
          </div>
        )
      }

      default:
        return null
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Technical Indicators - {symbol}
      </h3>

      <div className="mb-6 flex gap-2 flex-wrap">
        {(['sma', 'ema', 'rsi', 'macd', 'bb'] as const).map((indicator) => (
          <button
            key={indicator}
            onClick={() => setSelectedIndicator(indicator)}
            className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
              selectedIndicator === indicator
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {indicator.toUpperCase()}
          </button>
        ))}
      </div>

      {renderIndicatorData()}
    </div>
  )
}
