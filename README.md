# Stock Market Info Dashboard

A real-time stock market information dashboard providing live quotes, charts, portfolio tracking, and market analysis.

## Project Overview

This dashboard delivers:
- **Real-time stock quotes** with bid/ask spreads
- **Interactive charts** with multiple timeframes
- **Portfolio tracking** with P&L analysis
- **Market news feed** aggregated from multiple sources
- **Watchlist management** with alerts
- **Technical indicators** (MA, RSI, MACD, Bollinger Bands)

## Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS + Recharts
- **Backend:** Node.js/Express
- **Data Sources:** Alpha Vantage API, IEX Cloud
- **Database:** PostgreSQL (optional, for historical data)
- **Real-time:** WebSocket support for live quotes

## Project Structure

```
stock-dashboard/
├── src/
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API clients
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript types
│   └── App.tsx
├── public/              # Static assets
├── docs/                # Documentation
├── config/              # Configuration files
├── tests/               # Test files
├── package.json
└── tsconfig.json
```

## Getting Started

See [REQUIREMENTS.md](docs/REQUIREMENTS.md) for detailed specifications.
See [IMPLEMENTATION.md](docs/IMPLEMENTATION.md) for development guide.

## Status

**Phase 1:** Project setup and requirements definition ✓
**Phase 2:** Frontend scaffold and basic components (in progress)
**Phase 3:** API integration and data fetching
**Phase 4:** Testing and deployment
