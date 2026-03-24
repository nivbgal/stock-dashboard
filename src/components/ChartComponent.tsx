import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useChartData } from '../hooks/useStockData'

interface ChartComponentProps {
  symbol: string
  interval?: 'intraday' | 'daily'
  height?: number
}

export default function ChartComponent({
  symbol,
  interval = 'daily',
  height = 300,
}: ChartComponentProps) {
  const data = useChartData(symbol, interval)

  if (!data || data.length === 0) {
    return (
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-center"
        style={{ height: `${height}px` }}
      >
        <p className="text-gray-500 dark:text-gray-400">
          Loading chart data...
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            className="dark:stroke-gray-700"
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            className="dark:text-gray-400"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            className="dark:text-gray-400"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#3b82f6"
            dot={false}
            strokeWidth={2}
            name="Close Price"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
