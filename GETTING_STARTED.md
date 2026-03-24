# Stock Market Dashboard - Getting Started Guide

Welcome! This guide will help you get the Stock Market Dashboard running locally and integrated with real stock data.

## Prerequisites

- Node.js 18+ 
- npm 9+
- A terminal/command line interface
- API keys from data providers (see below)

## Quick Start (5 minutes)

### 1. Install Dependencies

```bash
cd stock-dashboard
npm install
```

### 2. Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your API keys
# See API Key Setup section below
```

### 3. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## API Key Setup

The dashboard supports multiple data providers. You'll need at least one API key:

### Free Tier Options

#### Alpha Vantage (Recommended for Beginners)
- **Website:** https://www.alphavantage.co
- **Free Tier:** 5 requests/minute
- **Data:** Stock quotes, daily/intraday charts, technical indicators
- **Key Name:** `VITE_ALPHA_VANTAGE_API_KEY`

```bash
# Example .env.local
VITE_ALPHA_VANTAGE_API_KEY=demo  # Use 'demo' to test
```

#### Finnhub (Advanced Features)
- **Website:** https://finnhub.io
- **Free Tier:** 60 requests/minute
- **Data:** Company info, technical indicators, news
- **Key Name:** `VITE_FINNHUB_API_KEY`

#### IEX Cloud
- **Website:** https://iexcloud.io
- **Free Tier:** Limited
- **Data:** Real-time quotes, company data
- **Key Name:** `VITE_IEX_CLOUD_API_KEY`

#### NewsAPI
- **Website:** https://newsapi.org
- **Free Tier:** 100 requests/day
- **Data:** Financial news
- **Key Name:** `VITE_NEWSAPI_API_KEY`

#### Polygon.io
- **Website:** https://polygon.io
- **Free Tier:** Limited
- **Data:** Stock data, technicals
- **Key Name:** `VITE_POLYGON_API_KEY`

### Getting Started with Demo Data

To test the app without API keys, it uses demo data:

```bash
# Just run without API keys
npm run dev
```

You'll see demo stocks (AAPL, GOOGL, MSFT, TSLA) with sample data.

## Available Commands

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run dev:inspect     # Start with Node inspector

# Production
npm run build           # Build for production
npm run preview         # Preview production build locally

# Code Quality
npm run lint            # Check for linting issues
npm run format          # Auto-format code
npm run type-check      # TypeScript type checking

# Testing
npm run test            # Run unit tests
npm run test:ui         # Run tests with UI
npm run test:coverage   # Generate coverage report
```

## Project Structure

```
stock-dashboard/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components (Dashboard, Watchlist, Portfolio)
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API client and external services
│   ├── store/           # Zustand state management
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions and constants
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── docs/                # Documentation
├── public/              # Static assets
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite build configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md            # Project overview
```

## Key Features

### Dashboard
- Real-time stock quote cards
- Color-coded price movements
- High/low/volume data
- Quick market overview

### Watchlist
- Create custom watchlists
- Add/remove stocks
- Organize stocks by category

### Portfolio
- Track your holdings
- Calculate P&L (Profit/Loss)
- Monitor portfolio performance
- Detailed holdings table

### Technical Analysis
- Simple Moving Averages (SMA)
- Exponential Moving Averages (EMA)
- Relative Strength Index (RSI)
- MACD
- Bollinger Bands

### UI Features
- Dark/light theme toggle
- Responsive design
- Search functionality
- Market status indicator
- Loading states

## Configuration Files

### Environment Variables (.env.local)

```env
# API Keys
VITE_ALPHA_VANTAGE_API_KEY=your_key_here
VITE_FINNHUB_API_KEY=your_key_here
VITE_IEX_CLOUD_API_KEY=your_key_here
VITE_NEWSAPI_API_KEY=your_key_here
VITE_POLYGON_API_KEY=your_key_here
```

### Tailwind Configuration

Edit `tailwind.config.js` to customize:
- Color schemes
- Typography
- Spacing
- Animations
- Dark mode behavior

### TypeScript Configuration

Edit `tsconfig.json` to adjust:
- Target environment
- Module system
- Strict type checking
- Path aliases

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (latest versions)

## Troubleshooting

### "API key not found" error
- Create `.env.local` file
- Add your API keys
- Restart the dev server

### Port 5173 already in use
```bash
# Use a different port
npm run dev -- --port 3000
```

### Module not found errors
```bash
# Reinstall node_modules
rm -rf node_modules
npm install
```

### TypeScript errors
```bash
# Clear build cache and rebuild
rm -rf dist
npm run type-check
npm run build
```

### Dark mode not working
- Ensure `dark` class is applied to root element
- Check browser DevTools dark mode preference
- Click theme toggle in header

## Performance Tips

1. **API Rate Limiting:** Free tiers have rate limits. The app includes basic caching.
2. **Large Portfolios:** Limit to < 100 stocks for smooth performance
3. **Search:** Debounced to reduce API calls
4. **Charts:** Limited to 60 data points for fast rendering

## Security Best Practices

1. **Never commit .env.local** to git
2. **Keep API keys private** - use .env file, not hardcoded
3. **Validate user input** before API calls
4. **Use HTTPS** in production
5. **Implement CORS** properly for backend

## Development Workflow

### Making Changes
1. Edit files in `src/`
2. See hot reload in browser (usually instant)
3. Check console for errors
4. Run `npm run lint` before committing

### Adding New Components
1. Create file in `src/components/`
2. Export from component
3. Import in pages/routes
4. Add TypeScript types

### Adding New Pages
1. Create file in `src/pages/`
2. Add route in `App.tsx`
3. Add navigation link in `Sidebar.tsx`

### State Management
1. Add state to `src/store/stockStore.ts`
2. Use hooks: `useStockStore()`
3. Access state and actions

## Next Steps

### For Development
1. [ ] Get API keys from providers
2. [ ] Add keys to `.env.local`
3. [ ] Test API integration
4. [ ] Run `npm run dev`
5. [ ] Explore the dashboard

### For Testing
1. [ ] Write unit tests for utilities
2. [ ] Write component tests
3. [ ] Test API integration
4. [ ] Run `npm run test`

### For Deployment
1. [ ] Run `npm run build`
2. [ ] Test production build locally
3. [ ] Deploy `dist/` folder
4. [ ] Set up environment variables
5. [ ] Monitor for errors

## Useful Links

- **React Docs:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org
- **Tailwind CSS:** https://tailwindcss.com
- **Vite:** https://vitejs.dev
- **Recharts:** https://recharts.org
- **Zustand:** https://github.com/pmndrs/zustand

## Getting Help

1. Check `docs/IMPLEMENTATION.md` for detailed architecture
2. Review `docs/REQUIREMENTS.md` for features
3. Check browser console for error messages
4. Look at component examples in `src/components/`
5. Review state management in `src/store/`

## Contributing

When modifying code:
1. Run `npm run lint` - check for issues
2. Run `npm run format` - auto-format code
3. Run `npm run type-check` - verify TypeScript
4. Test changes in browser
5. Commit with clear message

## Production Deployment

### Build for Production
```bash
npm run build
```

This creates a `dist/` folder with optimized assets:
- Minified JavaScript (~58KB gzipped)
- Optimized CSS (~4KB gzipped)
- Production-ready files

### Deploy to Services

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### GitHub Pages
1. Build: `npm run build`
2. Push `dist/` folder to gh-pages branch
3. Configure repository settings

### Environment Variables (Production)
Set these in your hosting provider's dashboard:
- `VITE_ALPHA_VANTAGE_API_KEY`
- `VITE_FINNHUB_API_KEY`
- etc.

## License

MIT - See LICENSE file for details

## Support

For issues or questions:
1. Check existing documentation
2. Review component source code
3. Check browser console for errors
4. Verify API keys are correct

---

**Happy coding!** 📈📊

Need more help? Check the docs folder or review the source code comments.
