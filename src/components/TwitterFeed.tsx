import { ITwitterPost } from '../types/stock'
import { Heart, MessageCircle, Repeat2, Share, TrendingUp, TrendingDown } from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'

interface TwitterFeedProps {
  posts?: ITwitterPost[]
  loading?: boolean
}

export default function TwitterFeed({ posts, loading }: TwitterFeedProps) {
  // Demo data if not provided
  const demoPosts: ITwitterPost[] = [
    {
      id: '1',
      author: 'Wall Street Bets',
      handle: '@wallstreetbets',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wsb',
      content:
        '📈 Market showing strong bullish signals today. The fear & greed index suggests smart money is accumulating. $SPY $QQQ #stocks',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 12450,
      retweets: 5890,
      replies: 1340,
      url: 'https://twitter.com/wallstreetbets/status/1',
      sentiment: 'bullish',
    },
    {
      id: '2',
      author: 'Stock Market Guru',
      handle: '@marketguru_pro',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guru',
      content:
        '⚠️ Breaking: Fed signals potential rate cuts in Q2. NASDAQ futures popping. Investors should be cautious about overexposure. $SPY $NDX',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 8765,
      retweets: 4321,
      replies: 891,
      url: 'https://twitter.com/marketguru_pro/status/2',
      sentiment: 'neutral',
    },
    {
      id: '3',
      author: 'Crypto Daily',
      handle: '@cryptodaily',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=crypto',
      content:
        '🚀 Bitcoin breaks through $68k resistance! Institutional adoption accelerating. This could be the start of the next bull run. $BTC #crypto',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 15340,
      retweets: 8900,
      replies: 2145,
      url: 'https://twitter.com/cryptodaily/status/3',
      sentiment: 'bullish',
    },
    {
      id: '4',
      author: 'Tech Analyst',
      handle: '@techanalyst22',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
      content:
        '📊 Tech sector showing weakness ahead of earnings season. Profit-taking evident in mega-cap stocks. Consolidation expected. $AAPL $MSFT $GOOGL',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      likes: 5420,
      retweets: 2890,
      replies: 634,
      url: 'https://twitter.com/techanalyst22/status/4',
      sentiment: 'bearish',
    },
    {
      id: '5',
      author: 'Financial Times News',
      handle: '@FT',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ft',
      content:
        '💼 Global markets recover from early losses as investors digest economic data. All eyes on central bank decisions next week. Full analysis 👇',
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
      likes: 9876,
      retweets: 5432,
      replies: 1200,
      url: 'https://twitter.com/FT/status/5',
      sentiment: 'neutral',
    },
  ]

  const displayPosts = posts && posts.length > 0 ? posts : demoPosts

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-center h-48">
        <div className="text-gray-500 dark:text-gray-400">Loading financial tweets...</div>
      </div>
    )
  }

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'bullish':
        return 'border-l-4 border-l-green-500'
      case 'bearish':
        return 'border-l-4 border-l-red-500'
      default:
        return 'border-l-4 border-l-yellow-500'
    }
  }

  const getSentimentBadge = (sentiment?: string) => {
    switch (sentiment) {
      case 'bullish':
        return (
          <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>Bullish</span>
          </div>
        )
      case 'bearish':
        return (
          <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold">
            <TrendingDown className="w-3 h-3" />
            <span>Bearish</span>
          </div>
        )
      default:
        return (
          <div className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-semibold">
            Neutral
          </div>
        )
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Financial Twitter Feed</h2>

      <div className="space-y-4">
        {displayPosts.map((post) => (
          <div
            key={post.id}
            className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${getSentimentColor(post.sentiment)}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={post.profileImage}
                  alt={post.author}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-600"
                />
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{post.author}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{post.handle}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getSentimentBadge(post.sentiment)}
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-semibold"
                >
                  View
                </a>
              </div>
            </div>

            {/* Content */}
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{post.content}</p>

            {/* Time */}
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              {formatDistanceToNow(post.timestamp, { addSuffix: true })}
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 text-sm pt-3 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors group">
                  <MessageCircle className="w-4 h-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 rounded-full p-2 h-8 w-8" />
                  <span className="text-xs">{(post.replies / 1000).toFixed(1)}K</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-green-500 transition-colors group">
                  <Repeat2 className="w-4 h-4 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 rounded-full p-2 h-8 w-8" />
                  <span className="text-xs">{(post.retweets / 1000).toFixed(1)}K</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-red-500 transition-colors group">
                  <Heart className="w-4 h-4 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 rounded-full p-2 h-8 w-8" />
                  <span className="text-xs">{(post.likes / 1000).toFixed(1)}K</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors group">
                  <Share className="w-4 h-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 rounded-full p-2 h-8 w-8" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <button className="w-full mt-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">
        Load More Posts
      </button>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
        <p className="text-sm text-indigo-700 dark:text-indigo-300">
          <span className="font-semibold">Financial Twitter Feed</span> provides real-time sentiment from leading financial accounts. Posts are analyzed for bullish, bearish, or neutral sentiment to gauge market psychology.
        </p>
      </div>
    </div>
  )
}
