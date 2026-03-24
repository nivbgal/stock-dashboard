/**
 * Financial Calculation Utilities
 */

import { IPortfolioPosition, IPortfolio, IOHLCData, IChartData } from '../types/stock';
import { TECHNICAL_INDICATORS } from './constants';

/**
 * Calculate gain/loss for a position
 * @param position - Portfolio position
 * @returns { gain, gainPercent, gainValue }
 */
export const calculatePositionGainLoss = (position: IPortfolioPosition) => {
  const gainValue = (position.currentPrice - position.entryPrice) * position.quantity;
  const cost = position.entryPrice * position.quantity;
  const gainPercent = cost > 0 ? (gainValue / cost) * 100 : 0;

  return {
    gain: gainValue,
    gainPercent,
    value: position.currentPrice * position.quantity,
    cost,
  };
};

/**
 * Calculate total portfolio metrics
 * @param positions - Array of portfolio positions
 * @returns Portfolio summary
 */
export const calculatePortfolioMetrics = (positions: IPortfolioPosition[]): IPortfolio => {
  const positionMetrics = positions.map(calculatePositionGainLoss);

  const totalValue = positionMetrics.reduce((sum, m) => sum + m.value, 0);
  const totalCost = positionMetrics.reduce((sum, m) => sum + m.cost, 0);
  const totalGain = positionMetrics.reduce((sum, m) => sum + m.gain, 0);
  const totalGainPercent = totalCost > 0 ? (totalGain / totalCost) * 100 : 0;

  return {
    positions,
    totalValue,
    totalCost,
    totalGain,
    totalGainPercent,
    lastUpdated: new Date(),
  };
};

/**
 * Calculate Simple Moving Average (SMA)
 * @param data - Array of price data
 * @param period - Number of periods for the average
 * @param key - Key to extract value from data point
 */
export const calculateSMA = (
  data: IOHLCData[],
  period: number,
  key: 'close' | 'high' | 'low' | 'open' = 'close'
): (number | undefined)[] => {
  return data.map((_, index) => {
    if (index < period - 1) return undefined;

    const sum = data
      .slice(index - period + 1, index + 1)
      .reduce((acc, d) => acc + d[key], 0);

    return sum / period;
  });
};

/**
 * Calculate Exponential Moving Average (EMA)
 * @param data - Array of price data
 * @param period - Number of periods for the average
 * @param key - Key to extract value from data point
 */
export const calculateEMA = (
  data: IOHLCData[],
  period: number,
  key: 'close' | 'high' | 'low' | 'open' = 'close'
): (number | undefined)[] => {
  const k = 2 / (period + 1);
  const result: (number | undefined)[] = [];
  let ema: number | undefined;

  data.forEach((d, index) => {
    if (index < period - 1) {
      result.push(undefined);
      return;
    }

    if (index === period - 1) {
      // Calculate SMA for the first EMA value
      const sum = data
        .slice(0, period)
        .reduce((acc, x) => acc + x[key], 0);
      ema = sum / period;
    } else {
      ema = d[key] * k + (ema ?? 0) * (1 - k);
    }

    result.push(ema);
  });

  return result;
};

/**
 * Calculate Relative Strength Index (RSI)
 * @param data - Array of price data
 * @param period - Number of periods (default: 14)
 */
export const calculateRSI = (data: IOHLCData[], period: number = 14): (number | undefined)[] => {
  const result: (number | undefined)[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period) {
      result.push(undefined);
      continue;
    }

    const slice = data.slice(i - period, i + 1);
    let gains = 0;
    let losses = 0;

    for (let j = 1; j < slice.length; j++) {
      const diff = slice[j].close - slice[j - 1].close;
      if (diff > 0) {
        gains += diff;
      } else {
        losses += Math.abs(diff);
      }
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;
    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    const rsi = 100 - 100 / (1 + rs);

    result.push(rsi);
  }

  return result;
};

/**
 * Calculate MACD (Moving Average Convergence Divergence)
 * @param data - Array of price data
 */
export const calculateMACD = (
  data: IOHLCData[]
): {
  line: (number | undefined)[];
  signal: (number | undefined)[];
  histogram: (number | undefined)[];
} => {
  const ema12 = calculateEMA(data, TECHNICAL_INDICATORS.MACD.FAST);
  const ema26 = calculateEMA(data, TECHNICAL_INDICATORS.MACD.SLOW);

  const line = ema12.map((v12, i) => {
    if (v12 === undefined || ema26[i] === undefined) return undefined;
    return v12 - ema26[i];
  });

  const signal = calculateEMA(
    data.map((d, i) => ({
      ...d,
      close: line[i] ?? 0,
    })),
    TECHNICAL_INDICATORS.MACD.SIGNAL
  );

  const histogram = line.map((l, i) => {
    if (l === undefined || signal[i] === undefined) return undefined;
    return l - signal[i];
  });

  return { line, signal, histogram };
};

/**
 * Calculate Bollinger Bands
 * @param data - Array of price data
 * @param period - Number of periods (default: 20)
 * @param stddev - Number of standard deviations (default: 2)
 */
export const calculateBollingerBands = (
  data: IOHLCData[],
  period: number = TECHNICAL_INDICATORS.BOLLINGER.PERIOD,
  stddev: number = TECHNICAL_INDICATORS.BOLLINGER.STDDEV
): {
  upper: (number | undefined)[];
  middle: (number | undefined)[];
  lower: (number | undefined)[];
} => {
  const sma = calculateSMA(data, period);

  const upper: (number | undefined)[] = [];
  const lower: (number | undefined)[] = [];

  data.forEach((_, index) => {
    if (index < period - 1 || sma[index] === undefined) {
      upper.push(undefined);
      lower.push(undefined);
      return;
    }

    const slice = data.slice(index - period + 1, index + 1);
    const mean = sma[index]!;

    const variance =
      slice.reduce((sum, d) => sum + Math.pow(d.close - mean, 2), 0) / period;
    const std = Math.sqrt(variance);

    upper.push(mean + std * stddev);
    lower.push(mean - std * stddev);
  });

  return {
    upper,
    middle: sma,
    lower,
  };
};

/**
 * Add technical indicators to chart data
 * @param data - Array of OHLC data
 * @param indicators - Object specifying which indicators to calculate
 */
export const addTechnicalIndicators = (
  data: IOHLCData[],
  indicators: {
    sma20?: boolean;
    sma50?: boolean;
    ema12?: boolean;
    ema26?: boolean;
    rsi?: boolean;
    macd?: boolean;
    bollingerBands?: boolean;
  }
): IChartData[] => {
  const chartData: IChartData[] = data.map((d) => ({ ...d }));

  if (indicators.sma20) {
    const sma20 = calculateSMA(data, 20);
    chartData.forEach((d, i) => {
      d.sma20 = sma20[i];
    });
  }

  if (indicators.sma50) {
    const sma50 = calculateSMA(data, 50);
    chartData.forEach((d, i) => {
      d.sma50 = sma50[i];
    });
  }

  if (indicators.ema12) {
    const ema12 = calculateEMA(data, 12);
    chartData.forEach((d, i) => {
      d.ema12 = ema12[i];
    });
  }

  if (indicators.ema26) {
    const ema26 = calculateEMA(data, 26);
    chartData.forEach((d, i) => {
      d.ema26 = ema26[i];
    });
  }

  if (indicators.rsi) {
    const rsi = calculateRSI(data);
    chartData.forEach((d, i) => {
      d.rsi = rsi[i];
    });
  }

  if (indicators.macd) {
    const macd = calculateMACD(data);
    chartData.forEach((d, i) => {
      d.macdLine = macd.line[i];
      d.macdSignal = macd.signal[i];
      d.macdHistogram = macd.histogram[i];
    });
  }

  if (indicators.bollingerBands) {
    const bb = calculateBollingerBands(data);
    chartData.forEach((d, i) => {
      d.bollingerUpper = bb.upper[i];
      d.bollingerMiddle = bb.middle[i];
      d.bollingerLower = bb.lower[i];
    });
  }

  return chartData;
};

/**
 * Calculate daily return percentage
 * @param open - Opening price
 * @param close - Closing price
 */
export const calculateDailyReturn = (open: number, close: number): number => {
  return ((close - open) / open) * 100;
};

/**
 * Calculate annualized return
 * @param startPrice - Starting price
 * @param endPrice - Ending price
 * @param days - Number of days
 */
export const calculateAnnualizedReturn = (
  startPrice: number,
  endPrice: number,
  days: number
): number => {
  const totalReturn = (endPrice - startPrice) / startPrice;
  const years = days / 365;
  return (Math.pow(1 + totalReturn, 1 / years) - 1) * 100;
};

/**
 * Calculate portfolio allocation percentages
 * @param positions - Array of portfolio positions
 * @param totalValue - Total portfolio value
 */
export const calculateAllocation = (
  positions: IPortfolioPosition[],
  totalValue: number
): Record<string, number> => {
  const allocation: Record<string, number> = {};

  positions.forEach((position) => {
    const value = position.currentPrice * position.quantity;
    allocation[position.sector] =
      (allocation[position.sector] ?? 0) + (value / totalValue) * 100;
  });

  return allocation;
};

/**
 * Calculate volatility (standard deviation)
 * @param data - Array of price data
 * @param period - Number of periods (default: 20)
 */
export const calculateVolatility = (data: IOHLCData[], period: number = 20): number => {
  if (data.length < period) return 0;

  const slice = data.slice(-period);
  const mean = slice.reduce((sum, d) => sum + d.close, 0) / period;
  const variance =
    slice.reduce((sum, d) => sum + Math.pow(d.close - mean, 2), 0) / period;

  return Math.sqrt(variance);
};

/**
 * Calculate Sharpe Ratio
 * @param returns - Array of returns (as decimals)
 * @param riskFreeRate - Risk-free rate (default: 0.02 for 2%)
 */
export const calculateSharpeRatio = (
  returns: number[],
  riskFreeRate: number = 0.02
): number => {
  if (returns.length === 0) return 0;

  const avgReturn = returns.reduce((a, b) => a + b) / returns.length;
  const variance =
    returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);

  return stdDev === 0 ? 0 : (avgReturn - riskFreeRate / 252) / stdDev;
};

/**
 * Calculate maximum drawdown
 * @param data - Array of portfolio values over time
 */
export const calculateMaxDrawdown = (data: number[]): number => {
  if (data.length === 0) return 0;

  let maxDrawdown = 0;
  let maxValue = data[0];

  for (let i = 1; i < data.length; i++) {
    if (data[i] > maxValue) {
      maxValue = data[i];
    } else {
      const drawdown = (maxValue - data[i]) / maxValue;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }
  }

  return maxDrawdown * 100;
};
