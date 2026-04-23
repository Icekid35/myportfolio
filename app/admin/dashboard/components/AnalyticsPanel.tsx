"use client";
import { useEffect, useState, useCallback } from "react";

type Stats = {
  totalViews: number;
  viewsLast30Days: number;
  viewsLast7Days: number;
  viewsToday: number;
  uniqueVisitorsLast30Days: number;
  devices: { name: string; count: number }[];
  browsers: { name: string; count: number }[];
  dailyViews: { date: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
};

const DEVICE_COLORS: Record<string, string> = {
  Desktop: "#a78bfa",
  Mobile: "#34d399",
  Tablet: "#fbbf24",
};
const BROWSER_COLORS = [
  "#60a5fa",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#fb923c",
];

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: number | string;
  sub?: string;
}) {
  return (
    <div className="bg-white/5 rounded-xl p-5 border border-white/5">
      <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-semibold mt-2 text-white">{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white/5 rounded-xl p-5 border border-white/5 animate-pulse">
      <div className="h-3 w-24 bg-white/10 rounded mb-3" />
      <div className="h-8 w-16 bg-white/10 rounded" />
    </div>
  );
}

function BarChart({ data }: { data: { date: string; count: number }[] }) {
  const safeData = data ?? [];
  const max = Math.max(...safeData.map((d) => d.count), 1);
  if (safeData.length === 0) {
    return (
      <div className="flex items-center justify-center h-28 text-gray-500 text-sm">
        No data yet
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="flex items-end gap-[2px] h-28">
        {safeData.map((d, i) => (
          <div
            key={d.date}
            className="flex-1 flex flex-col items-center justify-end group relative"
          >
            <div
              className="w-full rounded-t-sm bg-violet-500/60 hover:bg-violet-400 transition-colors cursor-default"
              style={{ height: `${Math.max(2, (d.count / max) * 100)}%` }}
            />
            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {d.date.slice(5)}: {d.count}
            </div>
            {i % 5 === 0 && (
              <span className="text-[8px] text-gray-600 mt-1 rotate-45 origin-left whitespace-nowrap absolute -bottom-5 left-0">
                {d.date.slice(5)}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-7 text-[10px] text-gray-600">
        <span>{safeData[0]?.date.slice(5)}</span>
        <span>{safeData[safeData.length - 1]?.date.slice(5)}</span>
      </div>
    </div>
  );
}

function DonutChart({
  data,
  colors,
}: {
  data: { name: string; count: number }[];
  colors: Record<string, string> | string[];
}) {
  const safeData = data ?? [];
  const total = safeData.reduce((s, d) => s + d.count, 0) || 1;
  let cumulative = 0;
  const segments = safeData.map((d, i) => {
    const color = Array.isArray(colors)
      ? colors[i % colors.length]
      : ((colors as Record<string, string>)[d.name] ?? "#6b7280");
    const pct = d.count / total;
    const startAngle = cumulative * 360;
    cumulative += pct;
    const endAngle = cumulative * 360;
    return { ...d, color, pct, startAngle, endAngle };
  });

  const size = 120;
  const r = 42;
  const cx = size / 2;
  const cy = size / 2;

  function polarToCartesian(angle: number, radius: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function arcPath(start: number, end: number) {
    if (end - start >= 359.99) {
      return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`;
    }
    const large = end - start > 180 ? 1 : 0;
    const s = polarToCartesian(start, r);
    const e = polarToCartesian(end, r);
    return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y} Z`;
  }

  if (safeData.length === 0 || safeData.every((d) => d.count === 0)) {
    return (
      <div className="flex items-center justify-center h-20 text-gray-500 text-sm">
        No data yet
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="flex-shrink-0"
      >
        {segments.map((seg) => (
          <path
            key={seg.name}
            d={arcPath(seg.startAngle, seg.endAngle)}
            fill={seg.color}
            opacity={0.85}
          />
        ))}
        <circle cx={cx} cy={cy} r={26} fill="#111" />
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fill="#fff"
          fontSize="11"
          fontWeight="600"
        >
          {total}
        </text>
      </svg>
      <div className="space-y-2 flex-1">
        {segments.map((seg) => (
          <div key={seg.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: seg.color }}
            />
            <span className="text-xs text-gray-300 flex-1">{seg.name}</span>
            <span className="text-xs text-gray-400">{seg.count}</span>
            <span className="text-xs text-gray-600 w-8 text-right">
              {Math.round(seg.pct * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsPanel() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/analytics/stats");
    if (res.ok) setStats(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="bg-white/5 rounded-xl p-5 border border-white/5 animate-pulse h-44" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-5 border border-white/5 animate-pulse h-40" />
          <div className="bg-white/5 rounded-xl p-5 border border-white/5 animate-pulse h-40" />
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-gray-400 text-sm">No analytics data yet.</p>
        <p className="text-gray-600 text-xs mt-1">
          Visitors will appear here once they browse your site.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Views"
          value={stats.totalViews.toLocaleString()}
        />
        <StatCard
          label="Views Today"
          value={stats.viewsToday.toLocaleString()}
        />
        <StatCard
          label="Last 7 Days"
          value={stats.viewsLast7Days.toLocaleString()}
        />
        <StatCard
          label="Unique Visitors (30d)"
          value={stats.uniqueVisitorsLast30Days.toLocaleString()}
        />
      </div>

      {/* 30-Day Bar Chart — always shown with filled days */}
      <div className="bg-white/5 rounded-xl p-5 border border-white/5">
        <p className="text-sm font-medium text-gray-300 mb-4">
          Page Views — Last 30 Days
        </p>
        <BarChart data={stats.dailyViews ?? []} />
      </div>

      {/* Device + Browser Donut Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-xl p-5 border border-white/5">
          <p className="text-sm font-medium text-gray-300 mb-4">
            Device Types (30d)
          </p>
          <DonutChart data={stats.devices ?? []} colors={DEVICE_COLORS} />
        </div>
        <div className="bg-white/5 rounded-xl p-5 border border-white/5">
          <p className="text-sm font-medium text-gray-300 mb-4">
            Browsers (30d)
          </p>
          <DonutChart data={stats.browsers ?? []} colors={BROWSER_COLORS} />
        </div>
      </div>

      {/* Top Referrers with progress bars */}
      <div className="bg-white/5 rounded-xl p-5 border border-white/5">
        <p className="text-sm font-medium text-gray-300 mb-4">
          Top Referrers (30d)
        </p>
        {(stats.topReferrers ?? []).length === 0 ? (
          <p className="text-sm text-gray-500">No referrer data yet.</p>
        ) : (
          <div className="space-y-3">
            {(stats.topReferrers ?? []).map((r) => {
              const maxCount = (stats.topReferrers ?? [])[0]?.count || 1;
              return (
                <div key={r.referrer}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300 truncate">
                      {r.referrer}
                    </span>
                    <span className="text-sm font-medium text-white ml-4 flex-shrink-0">
                      {r.count}
                    </span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 rounded-full"
                      style={{ width: `${(r.count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
