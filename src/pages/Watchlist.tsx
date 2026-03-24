import { useState } from 'react'
import { useStockStore } from '../store/stockStore'
import StockCard from '../components/StockCard'

export default function Watchlist() {
  const { watchlists, addWatchlist } = useStockStore()
  const [newListName, setNewListName] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleCreateWatchlist = (e: React.FormEvent) => {
    e.preventDefault()
    if (newListName.trim()) {
      const now = new Date()
      const newList = {
        id: Date.now().toString(),
        name: newListName,
        symbols: [],
        isPinned: false,
        createdAt: now,
        updatedAt: now,
      }
      addWatchlist(newList)
      setNewListName('')
      setShowForm(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Watchlist
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Track your favorite stocks
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + New Watchlist
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateWatchlist} className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Watchlist name (e.g., Tech Stocks)"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {watchlists.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No watchlists yet. Create one to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {watchlists.map((watchlist) => (
            <div
              key={watchlist.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {watchlist.name}
              </h3>
              {watchlist.symbols.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                  No stocks in this watchlist yet
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Placeholder for watchlist symbols */}
                  <p className="text-gray-500 dark:text-gray-400">
                    {watchlist.symbols.join(', ')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
