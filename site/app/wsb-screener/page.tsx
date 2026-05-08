'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  SCREENER_STOCKS, StockData, ScreenerTimeframe, SortColumn,
} from './lib/mockData';

const StockChart = dynamic(() => import('./components/StockChart'), { ssr: false });

const TIMEFRAMES: ScreenerTimeframe[] = ['12H', '24H', '3D', '7D', '1M'];
type SortDir = 'asc' | 'desc';

function PctCell({ value }: { value: number }) {
  const pos = value >= 0;
  return (
    <span className={`font-mono text-sm ${pos ? 'text-green-400' : 'text-red-400'}`}>
      {pos ? '+' : ''}{value.toFixed(2)}%
    </span>
  );
}

function SurgeBadge({ value }: { value: number }) {
  const cls = value >= 300
    ? 'text-red-400 bg-red-500/10 border-red-500/20'
    : value >= 150
    ? 'text-orange-400 bg-orange-500/10 border-orange-500/20'
    : value >= 75
    ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
    : 'text-[#94A3B8] bg-white/5 border-white/10';
  return (
    <span className={`inline-block rounded-md border px-2 py-0.5 text-xs font-bold ${cls}`}>
      +{value}%
    </span>
  );
}

function SentimentBadge({ sentiment }: { sentiment: StockData['sentiment'] }) {
  const cls = sentiment === 'bullish'
    ? 'bg-green-500/10 text-green-400'
    : sentiment === 'bearish'
    ? 'bg-red-500/10 text-red-400'
    : 'bg-white/5 text-[#94A3B8]';
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${cls}`}>
      {sentiment}
    </span>
  );
}

function MentionBar({ value, max }: { value: number; max: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-10 text-right font-mono text-sm text-white">{value.toLocaleString()}</span>
      <div className="h-1 w-16 rounded-full bg-white/5">
        <div className="h-full rounded-full bg-blue-500/70" style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  );
}

function RedditIcon() {
  return (
    <svg className="h-4 w-4 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

export default function WSBScreener() {
  const [timeframe, setTimeframe] = useState<ScreenerTimeframe>('24H');
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [sortCol, setSortCol] = useState<SortColumn>('mentions');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const maxMentions = SCREENER_STOCKS[0].mentions;
  const totalMentions = SCREENER_STOCKS.reduce((s, x) => s + x.mentions, 0);
  const topSurge = [...SCREENER_STOCKS].sort((a, b) => b.surgePercent - a.surgePercent)[0];

  const sorted = useMemo(() => (
    [...SCREENER_STOCKS].sort((a, b) =>
      sortDir === 'desc' ? b[sortCol] - a[sortCol] : a[sortCol] - b[sortCol]
    )
  ), [sortCol, sortDir]);

  const selectedStock = sorted.find(s => s.ticker === selectedTicker) ?? null;

  function handleSort(col: SortColumn) {
    if (col === sortCol) setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    else { setSortCol(col); setSortDir('desc'); }
  }

  function SortArrow({ col }: { col: SortColumn }) {
    if (col !== sortCol) return <span className="ml-1 text-white/20">↕</span>;
    return <span className="ml-1 text-blue-400">{sortDir === 'desc' ? '↓' : '↑'}</span>;
  }

  function thCls(col: SortColumn) {
    return `cursor-pointer select-none whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors hover:text-white ${
      sortCol === col ? 'text-blue-400' : 'text-[#475569]'
    }`;
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#0E1017] px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/15 ring-1 ring-orange-500/25">
            <RedditIcon />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">WSB Screener</h1>
            <p className="text-[11px] text-[#475569]">r/WallStreetBets · Mock Data</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-1">
          {TIMEFRAMES.map(t => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
                timeframe === t ? 'bg-blue-600 text-white shadow' : 'text-[#64748B] hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-[#475569]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          Live · Updated 2m ago
        </div>
      </header>

      {/* Stats bar */}
      <div className="flex shrink-0 items-center gap-6 border-b border-white/[0.06] bg-[#0E1017]/50 px-6 py-3">
        {[
          { label: 'Total Mentions', value: totalMentions.toLocaleString(), sub: `last ${timeframe}`, color: 'text-white' },
          { label: 'Tickers Tracked', value: String(SCREENER_STOCKS.length), sub: 'active', color: 'text-white' },
          { label: 'Biggest Surge', value: `$${topSurge.ticker}`, sub: `+${topSurge.surgePercent}%`, color: 'text-orange-400' },
          { label: 'Top by Mentions', value: `$${SCREENER_STOCKS[0].ticker}`, sub: `${SCREENER_STOCKS[0].mentions} mentions`, color: 'text-blue-400' },
        ].map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-6">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-[#475569]">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[11px] text-[#475569]">{stat.sub}</p>
            </div>
            {i < 3 && <div className="h-10 w-px bg-white/[0.06]" />}
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="flex min-h-0 flex-1">
        {/* Table */}
        <div className={`flex flex-col overflow-auto transition-all duration-300 ${selectedStock ? 'w-[58%]' : 'w-full'}`}>
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-[#0E1017]">
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#475569]">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#475569]">Ticker</th>
                <th className={thCls('mentions')} onClick={() => handleSort('mentions')}>
                  Mentions <SortArrow col="mentions" />
                </th>
                <th className={thCls('surgePercent')} onClick={() => handleSort('surgePercent')}>
                  Surge <SortArrow col="surgePercent" />
                </th>
                <th className={thCls('price')} onClick={() => handleSort('price')}>
                  Price <SortArrow col="price" />
                </th>
                <th className={thCls('change1d')} onClick={() => handleSort('change1d')}>
                  1D <SortArrow col="change1d" />
                </th>
                <th className={thCls('change7d')} onClick={() => handleSort('change7d')}>
                  7D <SortArrow col="change7d" />
                </th>
                <th className={thCls('change1m')} onClick={() => handleSort('change1m')}>
                  1M <SortArrow col="change1m" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#475569]">
                  Sentiment
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((stock, i) => {
                const isSelected = stock.ticker === selectedTicker;
                return (
                  <tr
                    key={stock.ticker}
                    onClick={() => setSelectedTicker(isSelected ? null : stock.ticker)}
                    className={`cursor-pointer border-b border-white/[0.03] transition-colors ${
                      isSelected
                        ? 'bg-blue-600/10 shadow-[inset_3px_0_0_#3B82F6]'
                        : 'hover:bg-white/[0.025]'
                    }`}
                  >
                    <td className="px-4 py-3 text-xs text-[#475569]">{i + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-white">${stock.ticker}</p>
                      <p className="text-xs text-[#475569]">{stock.name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <MentionBar value={stock.mentions} max={maxMentions} />
                    </td>
                    <td className="px-4 py-3">
                      <SurgeBadge value={stock.surgePercent} />
                    </td>
                    <td className="px-4 py-3 font-mono text-white">
                      ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                    </td>
                    <td className="px-4 py-3"><PctCell value={stock.change1d} /></td>
                    <td className="px-4 py-3"><PctCell value={stock.change7d} /></td>
                    <td className="px-4 py-3"><PctCell value={stock.change1m} /></td>
                    <td className="px-4 py-3"><SentimentBadge sentiment={stock.sentiment} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Chart panel */}
        {selectedStock ? (
          <div className="flex w-[42%] shrink-0 flex-col border-l border-white/[0.06] bg-[#0E1017] p-6">
            <StockChart stock={selectedStock} />
          </div>
        ) : (
          <div className="pointer-events-none absolute bottom-8 right-8 rounded-xl border border-white/[0.06] bg-[#111318]/80 px-4 py-2.5 text-xs text-[#475569] backdrop-blur-sm">
            Click any row to view price chart →
          </div>
        )}
      </div>
    </div>
  );
}
