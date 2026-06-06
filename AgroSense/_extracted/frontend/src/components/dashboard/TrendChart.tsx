import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { m: "Jan", soja: 142, milho: 98 },
  { m: "Fev", soja: 148, milho: 102 },
  { m: "Mar", soja: 139, milho: 110 },
  { m: "Abr", soja: 156, milho: 108 },
  { m: "Mai", soja: 168, milho: 121 },
  { m: "Jun", soja: 161, milho: 130 },
  { m: "Jul", soja: 178, milho: 126 },
  { m: "Ago", soja: 190, milho: 138 },
  { m: "Set", soja: 185, milho: 145 },
];

export function TrendChart() {
  return (
    <div className="surface-card rounded-xl border border-border p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Preço de Commodities</h3>
          <p className="font-mono text-xs text-muted-foreground">USD / saca · 9 meses</p>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-chart-1" /> Soja
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-chart-3" /> Milho
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ left: -18, right: 4 }}>
          <defs>
            <linearGradient id="gSoja" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gMilho" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "var(--color-popover)",
              border: "1px solid var(--color-border)",
              borderRadius: 10,
              fontSize: 12,
            }}
          />
          <Area type="monotone" dataKey="soja" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#gSoja)" />
          <Area type="monotone" dataKey="milho" stroke="var(--color-chart-3)" strokeWidth={2} fill="url(#gMilho)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
