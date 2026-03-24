import { ICryptoAsset } from '../types/stock'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { format } from 'date-fns'

interface CryptoAssetsProps {
  assets?: ICryptoAsset[]
  loading?: boolean
}

export default function CryptoAssets({ assets, loading }: CryptoAssetsProps) {
  // Demo data if not provided
  const demoAssets: ICryptoAsset[] = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 68234.50,
      change: 2345.75,
      changePercent: 3.55,
      high24h: 69500.00,
      low24h: 66800.00,
      marketCap: 1340000000000,
      volume24h: 32000000000,
      timestamp: new Date(),
      marketCapRank: 1,
      circulatingSupply: 21000000,
      totalSupply: 21000000,
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 3824.60,
      change: 185.40,
      changePercent: 5.09,
      high24h: 3900.00,
      low24h: 3650.00,
      marketCap: 460000000000,
      volume24h: 18500000000,
      timestamp: new Date(),
      marketCapRank: 2,
      circulatingSupply: 120000000,
      totalSupply: 120000000,
    },
    {
      symbol: 'GOLD',
      name: 'Gold (Spot)',
      price: 2145.80,
      change: 35.20,
      changePercent: 1.66,
      high24h: 2150.00,
      low24h: 2120.00,
      volume24h: 850000000,
      timestamp: new Date(),
    },
    {
      symbol: 'SILVER',
      name: 'Silver (Spot)',
      price: 27.45,
      change: 0.45,
      changePercent: 1.66,
      high24h: 27.80,
      low24h: 26.95,
      volume24h: 125000000,
      timestamp: new Date(),
    },
  ]

  const displayAssets = assets && assets.length > 0 ? assets : demoAssets

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-center h-48">
        <div className="text-gray-500 dark:text-gray-400">Loading crypto and commodities...</div>
      </div>
    )
  }

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    return `$${num.toFixed(2)}`
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Crypto & Commodities</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Asset</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Price</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">24h Change</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">24h High/Low</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Market Cap</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Rank</th>
            </tr>
          </thead>
          <tbody>
            {displayAssets.map((asset) => (
              <tr
                key={asset.symbol}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                {/* Asset Name */}
                <td className="py-4 px-4">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{asset.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{asset.symbol}</div>
                  </div>
                </td>

                {/* Price */}
                <td className="text-right py-4 px-4">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {asset.price.toFixed(asset.symbol === 'BTC' || asset.symbol === 'ETH' ? 2 : 2)}
                  </div>
                </td>

                {/* Change */}
                <td className="text-right py-4 px-4">
                  <div
                    className={`flex items-center justify-end space-x-1 px-3 py-2 rounded font-semibold text-sm w-fit ml-auto ${
                      asset.changePercent >= 0
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}
                  >
                    {asset.changePercent >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>
                      {asset.changePercent >= 0 ? '+' : ''}
                      {asset.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </td>

                {/* 24h High/Low */}
                <td className="text-right py-4 px-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <div>↑ {asset.high24h ? asset.high24h.toFixed(2) : 'N/A'}</div>
                    <div>↓ {asset.low24h ? asset.low24h.toFixed(2) : 'N/A'}</div>
                  </div>
                </td>

                {/* Market Cap */}
                <td className="text-right py-4 px-4">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {asset.marketCap ? formatLargeNumber(asset.marketCap) : 'N/A'}
                  </div>
                </td>

                {/* Rank */}
                <td className="text-center py-4 px-4">
                  {(asset as any).marketCapRank && (
                    <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {(asset as any).marketCapRank}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-purple-900 dark:text-purple-300 mb-1">Digital Assets & Commodities</p>
            <p className="text-sm text-purple-700 dark:text-purple-400">
              Real-time prices for cryptocurrencies and precious metals. These assets are influenced by different market factors than traditional stocks.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
