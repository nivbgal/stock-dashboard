import { IFearGreedIndex, IFearGreedHistoryPoint } from '../types/stock'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { format } from 'date-fns'

interface FearGreedIndexProps {
  data?: IFearGreedIndex
  loading?: boolean
}

export default function FearGreedIndex({ data, loading }: FearGreedIndexProps) {
  // Demo data if not provided
  const demoData: IFearGreedIndex = data || {
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

  const displayData = data || demoData
  const chartData = displayData.historicalData || []

  const getColorByClassification = (classification: string) => {
    switch (classification) {
      case 'Extreme Fear':
        return '#dc2626'
      case 'Fear':
        return '#f97316'
      case 'Neutral':
        return '#eab308'
      case 'Greed':
        return '#22c55e'
      case 'Extreme Greed':
        return '#16a34a'
      default:
        return '#6b7280'
    }
  }

  const getGaugeColor = () => {
    const value = displayData.value
    if (value <= 25) return 'from-red-600 to-red-500'
    if (value <= 45) return 'from-orange-600 to-orange-500'
    if (value <= 55) return 'from-yellow-600 to-yellow-500'
    if (value <= 75) return 'from-green-600 to-green-500'
    return 'from-green-700 to-green-600'
  }

  const getIconColor = () => {
    if (displayData.classification === 'Extreme Greed' || displayData.classification === 'Greed') {
      return 'text-green-500'
    }
    if (displayData.classification === 'Extreme Fear' || displayData.classification === 'Fear') {
      return 'text-red-500'
    }
    return 'text-yellow-500'
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-center h-96">
        <div className="text-gray-500 dark:text-gray-400">Loading Fear & Greed Index...</div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Fear & Greed Index
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gauge Display */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center py-8">
          <div className="relative w-40 h-40 mb-4">
            {/* Gauge Background */}
            <svg viewBox="0 0 200 120" className="w-full h-full">
              {/* Gauge arc */}
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="25%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="75%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="12"
              />

              {/* Needle */}
              <g transform={`rotate(${(displayData.value / 100) * 180 - 90} 100 100)`}>
                <line x1="100" y1="100" x2="100" y2="25" stroke="currentColor" strokeWidth="3" />
                <circle cx="100" cy="100" r="8" fill="currentColor" />
              </g>

              {/* Value text */}
              <text x="100" y="115" textAnchor="middle" className="text-2xl font-bold fill-gray-900 dark:fill-white">
                {displayData.value}
              </text>
            </svg>
          </div>

          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {displayData.classification}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {format(displayData.timestamp, 'MMM dd, yyyy HH:mm')}
            </div>
          </div>

          {/* Sentiment Indicator */}
          <div className="mt-6 flex items-center space-x-2">
            {displayData.classification === 'Extreme Greed' || displayData.classification === 'Greed' ? (
              <>
                <TrendingUp className={`w-6 h-6 ${getIconColor()}`} />
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">Bullish Sentiment</span>
              </>
            ) : displayData.classification === 'Extreme Fear' || displayData.classification === 'Fear' ? (
              <>
                <TrendingDown className={`w-6 h-6 ${getIconColor()}`} />
                <span className="text-sm font-semibold text-red-600 dark:text-red-400">Bearish Sentiment</span>
              </>
            ) : (
              <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">Neutral Sentiment</span>
            )}
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">7-Day History</h3>
          {chartData.length > 0 && (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                  stroke="#6b7280"
                  className="dark:stroke-gray-500"
                />
                <YAxis stroke="#6b7280" className="dark:stroke-gray-500" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => [`${value}`, 'Index Value']}
                  labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Classification Scale */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">Classification Scale</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Extreme Fear', range: '0-25', color: 'bg-red-600' },
            { label: 'Fear', range: '25-45', color: 'bg-orange-600' },
            { label: 'Neutral', range: '45-55', color: 'bg-yellow-600' },
            { label: 'Greed', range: '55-75', color: 'bg-green-600' },
            { label: 'Extreme Greed', range: '75-100', color: 'bg-green-700' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className={`${item.color} h-8 rounded mb-2 w-full`}></div>
              <div className="text-xs font-semibold text-gray-900 dark:text-white">{item.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{item.range}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
