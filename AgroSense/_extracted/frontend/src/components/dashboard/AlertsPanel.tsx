import { AlertTriangle, CloudRain, TrendingDown, Bug } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { RiskBadge, type RiskLevel } from "./RiskBadge";

interface Alert {
  icon: LucideIcon;
  title: string;
  desc: string;
  time: string;
  level: RiskLevel;
}

const alerts: Alert[] = [
  { icon: CloudRain, title: "Estiagem prolongada — MT", desc: "Déficit hídrico acima de 40% na região central.", time: "há 12 min", level: "critical" },
  { icon: TrendingDown, title: "Queda de preço — Trigo", desc: "Recuo de 5,1% no mercado spot internacional.", time: "há 38 min", level: "high" },
  { icon: Bug, title: "Foco de praga — Algodão BA", desc: "Detecção de bicudo em 3 talhões monitorados.", time: "há 1h", level: "medium" },
  { icon: AlertTriangle, title: "Revisão de crédito — RS", desc: "Score de 4 produtores rebaixado pelo modelo.", time: "há 2h", level: "medium" },
];

export function AlertsPanel() {
  return (
    <div className="surface-card rounded-xl border border-border p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Sistema de Alertas</h3>
        <span className="flex items-center gap-1.5 rounded-full bg-risk-critical/15 px-2.5 py-0.5 font-mono text-xs text-risk-critical">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-risk-critical" />
          {alerts.length} ativos
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a.title}
            className="flex gap-3 rounded-lg border border-border/60 bg-secondary/30 p-3 transition-colors hover:border-primary/30"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
              <a.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold">{a.title}</p>
                <RiskBadge level={a.level} />
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{a.desc}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
