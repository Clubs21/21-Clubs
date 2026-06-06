import { type RiskLevel } from "./RiskBadge";

type Event = {
  time: string;
  title: string;
  desc: string;
  level: RiskLevel;
};

const events: Event[] = [
  { time: "09:42", title: "USDA revisa estoques", desc: "Estoque global de soja abaixo do esperado", level: "high" },
  { time: "08:15", title: "Dólar recua 0,4%", desc: "Câmbio favorece competitividade do grão", level: "low" },
  { time: "07:30", title: "Chuvas no Sul", desc: "Excesso hídrico ameaça colheita no RS", level: "critical" },
  { time: "Ontem", title: "China amplia compras", desc: "+12% nas importações de soja brasileira", level: "low" },
  { time: "Ontem", title: "Fila no Porto de Santos", desc: "18 navios aguardando atracação", level: "medium" },
];

const dotColor: Record<RiskLevel, string> = {
  low: "var(--color-risk-low)",
  medium: "var(--color-risk-medium)",
  high: "var(--color-risk-high)",
  critical: "var(--color-risk-critical)",
};

export function MarketTimeline() {
  return (
    <div className="surface-card rounded-xl border border-border p-5">
      <div className="mb-4">
        <h3 className="font-semibold">Timeline de Mercado</h3>
        <p className="font-mono text-xs text-muted-foreground">Eventos relevantes · tempo real</p>
      </div>

      <div className="relative space-y-4 before:absolute before:left-[6px] before:top-1 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
        {events.map((e, i) => (
          <div key={i} className="relative pl-6">
            <span
              className="absolute left-0 top-1 h-3 w-3 rounded-full ring-4 ring-background"
              style={{ backgroundColor: dotColor[e.level] }}
            />
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{e.title}</p>
              <span className="font-mono text-[10px] text-muted-foreground">{e.time}</span>
            </div>
            <p className="text-xs text-muted-foreground">{e.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
