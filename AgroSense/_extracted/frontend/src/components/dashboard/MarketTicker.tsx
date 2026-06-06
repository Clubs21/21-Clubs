import { TrendingUp, TrendingDown } from "lucide-react";

type Ticker = {
  label: string;
  value: string;
  delta: number;
};

const tickers: Ticker[] = [
  { label: "SOJA CBOT", value: "US$ 13,42", delta: 1.8 },
  { label: "SOJA B3", value: "R$ 138,90", delta: 0.9 },
  { label: "MILHO", value: "R$ 64,20", delta: -0.7 },
  { label: "DÓLAR", value: "R$ 5,12", delta: -0.4 },
  { label: "CBOT TRIGO", value: "US$ 6,18", delta: 2.3 },
  { label: "FRETE BR-163", value: "R$ 312/t", delta: 3.1 },
  { label: "BOI GORDO", value: "R$ 308,50", delta: 0.5 },
  { label: "ÍNDICE RISCO", value: "34/100", delta: -2.1 },
];

function TickerItem({ t }: { t: Ticker }) {
  const up = t.delta >= 0;
  return (
    <span className="mx-5 inline-flex items-center gap-2 font-mono text-xs">
      <span className="text-muted-foreground">{t.label}</span>
      <span className="font-semibold text-foreground">{t.value}</span>
      <span className={`inline-flex items-center gap-0.5 ${up ? "text-risk-low" : "text-risk-critical"}`}>
        {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        {up ? "+" : ""}
        {t.delta.toFixed(1)}%
      </span>
    </span>
  );
}

export function MarketTicker() {
  const loop = [...tickers, ...tickers];
  return (
    <div className="surface-card overflow-hidden rounded-xl border border-border">
      <div className="flex items-stretch">
        <div className="flex shrink-0 items-center gap-2 border-r border-border bg-[image:var(--gradient-neon)] px-4 py-2.5">
          <span className="text-xs font-bold text-neon-foreground">MERCADO AO VIVO</span>
        </div>
        <div className="group relative flex-1 overflow-hidden py-2.5">
          <div className="flex w-max animate-[ticker_38s_linear_infinite] whitespace-nowrap group-hover:[animation-play-state:paused]">
            {loop.map((t, i) => (
              <TickerItem key={i} t={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
