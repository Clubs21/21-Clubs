import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  unit?: string;
  delta: number;
  icon: LucideIcon;
  spark?: number[];
}

export function KpiCard({ label, value, unit, delta, icon: Icon, spark = [] }: KpiCardProps) {
  const up = delta >= 0;
  const max = Math.max(...spark, 1);
  const min = Math.min(...spark, 0);
  const points = spark
    .map((v, i) => {
      const x = (i / (spark.length - 1 || 1)) * 100;
      const y = 30 - ((v - min) / (max - min || 1)) * 28;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="surface-card group relative overflow-hidden rounded-xl border border-border p-5 transition-all hover:border-primary/40">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/70 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-xs ${
            up ? "bg-primary/15 text-primary" : "bg-risk-critical/15 text-risk-critical"
          }`}
        >
          {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {up ? "+" : ""}
          {delta}%
        </span>
      </div>

      <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
        {value}
        {unit && <span className="ml-1 text-sm font-medium text-muted-foreground">{unit}</span>}
      </p>

      {spark.length > 1 && (
        <svg viewBox="0 0 100 32" className="mt-3 h-8 w-full" preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke={up ? "var(--color-primary)" : "var(--color-risk-critical)"}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
}
