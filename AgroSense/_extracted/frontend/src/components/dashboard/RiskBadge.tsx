const config = {
  low: { label: "Baixo", cls: "bg-risk-low/15 text-risk-low border-risk-low/30" },
  medium: { label: "Médio", cls: "bg-risk-medium/15 text-risk-medium border-risk-medium/30" },
  high: { label: "Alto", cls: "bg-risk-high/15 text-risk-high border-risk-high/30" },
  critical: { label: "Crítico", cls: "bg-risk-critical/15 text-risk-critical border-risk-critical/30" },
} as const;

export type RiskLevel = keyof typeof config;

export function RiskBadge({ level, label }: { level: RiskLevel; label?: string }) {
  const c = config[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium ${c.cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label ?? c.label}
    </span>
  );
}
