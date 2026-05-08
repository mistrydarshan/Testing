export type Sentiment = 'bullish' | 'bearish' | 'neutral';
export type ChartPeriod = '1D' | '3D' | '7D' | '1M' | '3M' | '6M' | '1Y';
export type ScreenerTimeframe = '12H' | '24H' | '3D' | '7D' | '1M';
export type SortColumn = 'mentions' | 'surgePercent' | 'price' | 'change1d' | 'change7d' | 'change1m';

export interface StockData {
  ticker: string;
  name: string;
  mentions: number;
  surgePercent: number;
  price: number;
  change1d: number;
  change7d: number;
  change1m: number;
  sentiment: Sentiment;
}

export interface PricePoint {
  time: string;
  price: number;
}

export const SCREENER_STOCKS: StockData[] = [
  { ticker: 'GME',  name: 'GameStop Corp',             mentions: 847, surgePercent: 340, price: 24.52,  change1d: 12.3,  change7d: 28.4,  change1m: -8.2,  sentiment: 'bullish' },
  { ticker: 'NVDA', name: 'NVIDIA Corp',                mentions: 623, surgePercent: 180, price: 875.40, change1d: 3.2,   change7d: 8.1,   change1m: 22.4,  sentiment: 'bullish' },
  { ticker: 'TSLA', name: 'Tesla Inc',                  mentions: 512, surgePercent: 95,  price: 185.20, change1d: -2.1,  change7d: -5.4,  change1m: -12.3, sentiment: 'bearish' },
  { ticker: 'AMC',  name: 'AMC Entertainment',          mentions: 489, surgePercent: 156, price: 4.82,   change1d: 8.7,   change7d: 15.2,  change1m: -22.1, sentiment: 'bullish' },
  { ticker: 'PLTR', name: 'Palantir Technologies',      mentions: 412, surgePercent: 78,  price: 22.15,  change1d: 1.2,   change7d: 4.8,   change1m: 18.7,  sentiment: 'bullish' },
  { ticker: 'MARA', name: 'Marathon Digital Holdings',  mentions: 387, surgePercent: 220, price: 18.43,  change1d: 15.6,  change7d: 32.1,  change1m: 45.2,  sentiment: 'bullish' },
  { ticker: 'RIOT', name: 'Riot Platforms',             mentions: 342, surgePercent: 195, price: 12.87,  change1d: 11.2,  change7d: 28.4,  change1m: 38.9,  sentiment: 'bullish' },
  { ticker: 'SOFI', name: 'SoFi Technologies',          mentions: 298, surgePercent: 67,  price: 7.42,   change1d: -1.8,  change7d: 2.3,   change1m: -5.4,  sentiment: 'neutral' },
  { ticker: 'META', name: 'Meta Platforms',             mentions: 276, surgePercent: 45,  price: 485.20, change1d: 0.8,   change7d: 3.2,   change1m: 12.1,  sentiment: 'bullish' },
  { ticker: 'BBBY', name: 'Bed Bath & Beyond',          mentions: 245, surgePercent: 420, price: 0.23,   change1d: 35.2,  change7d: 120.4, change1m: -45.2, sentiment: 'bullish' },
  { ticker: 'SPY',  name: 'SPDR S&P 500 ETF',          mentions: 234, surgePercent: 22,  price: 521.30, change1d: 0.3,   change7d: 1.2,   change1m: 4.5,   sentiment: 'neutral' },
  { ticker: 'HOOD', name: 'Robinhood Markets',          mentions: 198, surgePercent: 88,  price: 18.92,  change1d: 5.4,   change7d: 12.3,  change1m: 28.7,  sentiment: 'bullish' },
  { ticker: 'COIN', name: 'Coinbase Global',            mentions: 187, surgePercent: 112, price: 212.45, change1d: 7.8,   change7d: 18.4,  change1m: 32.1,  sentiment: 'bullish' },
  { ticker: 'AAPL', name: 'Apple Inc',                  mentions: 165, surgePercent: 18,  price: 189.30, change1d: -0.5,  change7d: 1.8,   change1m: 6.4,   sentiment: 'neutral' },
  { ticker: 'AMD',  name: 'Advanced Micro Devices',     mentions: 154, surgePercent: 42,  price: 168.75, change1d: 2.3,   change7d: 5.6,   change1m: 15.2,  sentiment: 'bullish' },
  { ticker: 'CLSK', name: 'CleanSpark Inc',             mentions: 143, surgePercent: 178, price: 14.32,  change1d: 9.8,   change7d: 24.5,  change1m: 42.1,  sentiment: 'bullish' },
  { ticker: 'DJT',  name: 'Trump Media & Technology',   mentions: 132, surgePercent: 89,  price: 38.72,  change1d: 6.2,   change7d: -12.4, change1m: -28.3, sentiment: 'bearish' },
  { ticker: 'SMCI', name: 'Super Micro Computer',       mentions: 121, surgePercent: 56,  price: 875.20, change1d: 3.1,   change7d: 8.9,   change1m: -15.4, sentiment: 'bearish' },
  { ticker: 'INTC', name: 'Intel Corporation',          mentions: 112, surgePercent: 34,  price: 31.45,  change1d: -1.2,  change7d: -3.4,  change1m: -8.7,  sentiment: 'bearish' },
  { ticker: 'MULN', name: 'Mullen Automotive',          mentions: 98,  surgePercent: 267, price: 0.08,   change1d: 24.5,  change7d: 87.3,  change1m: -62.4, sentiment: 'bullish' },
];

const PERIOD_POINTS: Record<ChartPeriod, number> = {
  '1D': 78, '3D': 72, '7D': 60, '1M': 30, '3M': 63, '6M': 126, '1Y': 252,
};

function formatTimeLabel(index: number, total: number, period: ChartPeriod): string {
  const now = new Date();
  if (period === '1D') {
    const minsAgo = (total - index) * 5;
    const d = new Date(now.getTime() - minsAgo * 60_000);
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
  if (period === '3D' || period === '7D') {
    const hoursAgo = (total - index) * (period === '3D' ? 1 : 2.8);
    const d = new Date(now.getTime() - hoursAgo * 3_600_000);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }
  const daysAgo = total - index;
  const d = new Date(now.getTime() - daysAgo * 86_400_000);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export function generatePriceHistory(
  currentPrice: number,
  changePercent: number,
  period: ChartPeriod,
): PricePoint[] {
  const n = PERIOD_POINTS[period];
  const startPrice = currentPrice / (1 + changePercent / 100);
  const prices: number[] = [startPrice];

  for (let i = 1; i < n; i++) {
    const prev = prices[i - 1];
    const drift = ((currentPrice - prev) / (n - i)) * 0.35;
    const noise = prev * (Math.random() - 0.5) * 0.022;
    prices.push(Math.max(prev + drift + noise, 0.0001));
  }

  const scale = currentPrice / prices[prices.length - 1];
  return prices.map((p, i) => ({
    time: formatTimeLabel(i, n, period),
    price: parseFloat((p * scale).toFixed(p * scale > 1 ? 2 : 4)),
  }));
}

export function getChangeForPeriod(stock: StockData, period: ChartPeriod): number {
  switch (period) {
    case '1D': return stock.change1d;
    case '3D': return stock.change7d * 0.45;
    case '7D': return stock.change7d;
    case '1M': return stock.change1m;
    case '3M': return stock.change1m * 2.4;
    case '6M': return stock.change1m * 3.8;
    case '1Y': return stock.change1m * 6.5;
  }
}
