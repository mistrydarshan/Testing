'use client';

import { useState, useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  StockData, ChartPeriod, generatePriceHistory, getChangeForPeriod,
} from '../lib/mockData';

const PERIODS: ChartPeriod[] = ['1D', '3D', '7D', '1M', '3M', '6M', '1Y'];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-[#1A1D26] px-3 py-2 shadow-xl">
      <p className="text-xs text-[#64748B]">{label}</p>
      <p className="text-sm font-semibold text-white">
        ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
      </p>
    </div>
  );
}

export default function StockChart({ stock }: { stock: StockData }) {
  const [period, setPeriod] = useState<ChartPeriod>('1D');

  const { data, change } = useMemo(() => {
    const c = getChangeForPeriod(stock, period);
    return { data: generatePriceHistory(stock.price, c, period), change: c };
  }, [stock, period]);

  const isPositive = change >= 0;
  const color = isPositive ? '#22C55E' : '#EF4444';
  const gradientId = `grad-${stock.ticker}`;

  return (
    <div className="flex h-full flex-col">
      {/* Stock header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-white">${stock.ticker}</span>
            <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{change.toFixed(2)}%
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[#64748B]">{stock.name}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white">
            ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5 text-xs">
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
            <span className="text-[#64748B]">Mentions</span>
            <span className="font-bold text-white">{stock.mentions.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1">
            <span className="text-orange-400">Surge</span>
            <span className="font-bold text-orange-300">+{stock.surgePercent}%</span>
          </div>
          <div className={`rounded-full px-3 py-1 font-medium capitalize ${
            stock.sentiment === 'bullish' ? 'bg-green-500/10 text-green-400'
            : stock.sentiment === 'bearish' ? 'bg-red-500/10 text-red-400'
            : 'bg-white/5 text-[#94A3B8]'
          }`}>
            {stock.sentiment}
          </div>
        </div>
      </div>

      {/* Period tabs */}
      <div className="mb-4 flex gap-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-1">
        {PERIODS.map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
              period === p ? 'bg-blue-600 text-white shadow' : 'text-[#64748B] hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fill: '#475569', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: '#475569', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={v => `$${v.toLocaleString()}`}
              width={58}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke={color}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 4, fill: color, stroke: '#0B0D12', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
