# Stock Market Dashboard - Implementation Guide

## Development Environment Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Installation

```bash
cd stock-dashboard
npm install
```

### Environment Configuration

Create `.env.local`:
```
REACT_APP_ALPHA_VANTAGE_KEY=your_api_key
REACT_APP_IEX_CLOUD_KEY=your_api_key
REACT_APP_FINNHUB_KEY=your_api_key
```

Get API keys:
- **Alpha Vantage**: https://www.alphavantage.co/
- **IEX Cloud**: https://iexcloud.io/
- **Finnhub**: https://finnhub.io/

## Project Architecture

### Component Hierarchy

```
App
├── Layout
│   ├── Header (search, theme toggle)
│   ├── Sidebar (navigation, watchlists)
│   └── MainContent
│       ├── Dashboard (overview)
│       ├── StockDetail (single stock view)
│       ├── Portfolio (holdings management)
│       ├── Watchlist (saved lists)
│       └── News (market news feed)
```

### Data Flow

1. **API Service Layer** (`src/services/`)
   - Handles API calls to data providers
   - Request batching and rate limiting
   - Caching logic
   - Error handling

2. **State Management** (`src/hooks/`)
   - Custom hooks for common data fetching patterns
   - Local component state for UI interactions
   - Shared state via context or Redux

3. **Components** (`src/components/`)
   - Presentation layer
   - Reusable UI components
   - Page-level container components

## File Structure & Responsibilities

```
src/
├── components/
│   ├── StockQuote.tsx          # Stock price display
│   ├── Chart.tsx                # Chart wrapper with Recharts
│   ├── TechnicalIndicators.tsx  # Indicator selection & display
│   ├── Watchlist.tsx            # Watchlist management
│   ├── Portfolio.tsx            # Holdings tracking
│   ├── MarketMovers.tsx         # Top gainers/losers
│   ├── NewsCard.tsx             # News article display
│   └── common/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       ├── LoadingSpinner.tsx
│       └── ErrorBoundary.tsx
│
├── pages/
│   ├── Dashboard.tsx            # Main dashboard view
│   ├── StockDetail.tsx          # Single stock detail page
│   ├── PortfolioPage.tsx
│   └── SearchResults.tsx
│
├── services/
│   ├── alphaVantageAPI.ts       # Alpha Vantage client
│   ├── iexCloudAPI.ts           # IEX Cloud client
│   ├── finnhubAPI.ts            # Finnhub client
│   ├── cacheManager.ts          # Caching utility
│   └── requestQueue.ts          # Rate limiting & batching
│
├── hooks/
│   ├── useStockQuote.ts         # Fetch stock quote
│   ├── useChartData.ts          # Fetch OHLC data
│   ├── useWatchlist.ts          # Watchlist management
│   ├── usePortfolio.ts          # Portfolio state
│   └── useTechnicalIndicators.ts
│
├── types/
│   ├── stock.ts                 # Stock data interfaces
│   ├── portfolio.ts             # Portfolio interfaces
│   ├── api.ts                   # API response types
│   └── index.ts
│
├── utils/
│   ├── formatters.ts            # Number/currency formatting
│   ├── calculations.ts          # P&L, returns, etc.
│   ├── dateHelpers.ts           # Date utilities
│   └── constants.ts             # App constants
│
├── styles/
│   ├── globals.css              # Global styles
│   └── theme.css                # Theme variables
│
├── App.tsx                      # Main app component
├── index.tsx                    # Entry point
└── vite-env.d.ts
```

## Development Workflow

### Phase 1: Setup & Basic UI

1. **Initialize project**
   ```bash
   npm create vite@latest stock-dashboard -- --template react-ts
   cd stock-dashboard
   npm install
   npm install -D tailwindcss postcss autoprefixer recharts axios zustand
   npx tailwindcss init -p
   ```

2. **Create basic layout**
   - Header with logo and search
   - Sidebar with navigation
   - Responsive grid layout

3. **Set up routing**
   ```bash
   npm install react-router-dom
   ```
   - Dashboard route `/`
   - Stock detail route `/stock/:symbol`
   - Portfolio route `/portfolio`
   - Watchlist route `/watchlist`

### Phase 2: API Integration

1. **Build API service layer**
   - Create client classes for each provider
   - Implement caching strategy
   - Add error handling

2. **Create custom hooks**
   - `useStockQuote(symbol)` - Fetch current quote
   - `useChartData(symbol, timeframe)` - Fetch OHLC data
   - `useNews(query)` - Fetch news articles

3. **Add to components**
   - Wire hooks to components
   - Display loading/error states
   - Implement real-time updates

### Phase 3: Advanced Features

1. **Portfolio tracking**
   - Form to add/edit positions
   - Local storage persistence
   - P&L calculations

2. **Technical indicators**
   - Dropdown to select indicators
   - Calculate and display on chart
   - Update on timeframe change

3. **Alerts system**
   - Store alert thresholds
   - Check conditions on quote updates
   - Notification system

## Code Standards

### TypeScript
- Strict mode enabled
- All public functions documented
- Interface-first design

### Naming Conventions
- Components: PascalCase (`StockQuote.tsx`)
- Functions/variables: camelCase (`getStockPrice()`)
- Constants: UPPER_SNAKE_CASE (`API_TIMEOUT`)
- Types: PascalCase with `I` prefix for interfaces (`IStockQuote`)

### File Organization
- One component per file
- Related utilities grouped in folders
- Index files for cleaner imports

## Testing

### Unit Tests
```bash
npm install -D vitest @testing-library/react
```

```
tests/
├── components/
├── services/
├── hooks/
└── utils/
```

### Example Test
```typescript
// StockQuote.test.tsx
import { render, screen } from '@testing-library/react';
import { StockQuote } from './StockQuote';

describe('StockQuote', () => {
  it('displays stock price', async () => {
    render(<StockQuote symbol="AAPL" />);
    const price = await screen.findByText(/\$\d+\.\d+/);
    expect(price).toBeInTheDocument();
  });
});
```

## Deployment

### Build
```bash
npm run build
```

### Deployment Options
1. **Vercel** - Recommended for React apps
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Netlify**
   - Connect GitHub repo
   - Auto-deploy on push

3. **Self-hosted**
   - Deploy to server with Node.js
   - Use PM2 or Docker

## Performance Optimization

1. **Code Splitting**
   - Lazy load route components
   - Dynamic imports for heavy components

2. **Caching**
   - Browser cache for static assets
   - API response caching (5-10 min)
   - Chart data memoization

3. **Rendering**
   - Memoize expensive components
   - Use virtualization for long lists
   - Debounce search input

## Debugging

### Chrome DevTools
- React Developer Tools extension
- Network tab for API calls
- Performance profiler

### Console Logging
```typescript
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}
```

## Next Steps

1. [ ] Initialize Vite + React + TypeScript
2. [ ] Set up Tailwind CSS
3. [ ] Create project structure
4. [ ] Build basic layout and navigation
5. [ ] Implement API service layer
6. [ ] Create StockQuote component
7. [ ] Add Chart component
8. [ ] Test with real API keys
9. [ ] Build out remaining features
