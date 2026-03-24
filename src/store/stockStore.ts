import { create } from 'zustand'
import { IStockQuote, IPortfolioPosition, IAlert, IWatchlist } from '../types/stock'

interface StockStore {
  // State
  quotes: IStockQuote[]
  watchlists: IWatchlist[]
  positions: IPortfolioPosition[]
  alerts: IAlert[]
  searchQuery: string
  loading: boolean
  error: string | null

  // Actions
  setQuotes: (quotes: IStockQuote[]) => void
  addQuote: (quote: IStockQuote) => void
  removeQuote: (symbol: string) => void

  setWatchlists: (watchlists: IWatchlist[]) => void
  addWatchlist: (watchlist: IWatchlist) => void
  removeWatchlist: (id: string) => void
  addSymbolToWatchlist: (watchlistId: string, symbol: string) => void
  removeSymbolFromWatchlist: (watchlistId: string, symbol: string) => void

  setPositions: (positions: IPortfolioPosition[]) => void
  addPosition: (position: IPortfolioPosition) => void
  removePosition: (symbol: string) => void

  setAlerts: (alerts: IAlert[]) => void
  addAlert: (alert: IAlert) => void
  removeAlert: (id: string) => void

  setSearchQuery: (query: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useStockStore = create<StockStore>((set) => ({
  // Initial state
  quotes: [],
  watchlists: [],
  positions: [],
  alerts: [],
  searchQuery: '',
  loading: false,
  error: null,

  // Actions
  setQuotes: (quotes) => set({ quotes }),
  addQuote: (quote) =>
    set((state) => ({
      quotes: state.quotes.some((q) => q.symbol === quote.symbol)
        ? state.quotes.map((q) => (q.symbol === quote.symbol ? quote : q))
        : [...state.quotes, quote],
    })),
  removeQuote: (symbol) =>
    set((state) => ({
      quotes: state.quotes.filter((q) => q.symbol !== symbol),
    })),

  setWatchlists: (watchlists) => set({ watchlists }),
  addWatchlist: (watchlist) =>
    set((state) => ({
      watchlists: [...state.watchlists, watchlist],
    })),
  removeWatchlist: (id) =>
    set((state) => ({
      watchlists: state.watchlists.filter((w) => w.id !== id),
    })),
  addSymbolToWatchlist: (watchlistId, symbol) =>
    set((state) => ({
      watchlists: state.watchlists.map((w: IWatchlist) =>
        w.id === watchlistId && !w.symbols.includes(symbol)
          ? { ...w, symbols: [...w.symbols, symbol], updatedAt: new Date() }
          : w
      ),
    })),
  removeSymbolFromWatchlist: (watchlistId, symbol) =>
    set((state) => ({
      watchlists: state.watchlists.map((w: IWatchlist) =>
        w.id === watchlistId
          ? { ...w, symbols: w.symbols.filter((s) => s !== symbol), updatedAt: new Date() }
          : w
      ),
    })),

  setPositions: (positions) => set({ positions }),
  addPosition: (position) =>
    set((state) => ({
      positions: state.positions.some((p) => p.symbol === position.symbol)
        ? state.positions.map((p) =>
            p.symbol === position.symbol ? position : p
          )
        : [...state.positions, position],
    })),
  removePosition: (symbol) =>
    set((state) => ({
      positions: state.positions.filter((p) => p.symbol !== symbol),
    })),

  setAlerts: (alerts) => set({ alerts }),
  addAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, alert],
    })),
  removeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))
