import { Ship, ArrowUpRight } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const destinations = [
  { name: "China", value: 58, color: "var(--color-chart-1)" },
  { name: "União Europeia", value: 14, color: "var(--color-chart-2)" },
  { name: "Mercosul", value: 11, color: "var(--color-chart-3)" },
  { name: "Oriente Médio", value: 9, color: "var(--color-chart-4)" },
  { name: "Outros", value: 8, color: "var(--color-chart-5)" },
];

export function ExportPanel() {
  return (
    <div className="surface-card rounded-xl border border-border p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Painel de Exportação</h3>
          <p className="font-mono text-xs text-muted-foreground">Soja em grão · destino</p>
        </div>
        <Ship className="h-5 w-5 text-primary" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[140px_1fr] sm:items-center">
        <ResponsiveContainer width="100%" height={140}>
          <PieChart>
            <Pie
              data={destinations}
              dataKey="value"
              nameKey="name"
              innerRadius={38}
              outerRadius={62}
              paddingAngle={2}
              stroke="var(--color-background)"
              strokeWidth={2}
            >
              {destinations.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: 10,
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="space-y-1.5">
          {destinations.map((d) => (
            <div key={d.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: d.color }} />
                {d.name}
              </span>
              <span className="font-mono text-muted-foreground">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3">
        <span className="text-xs text-muted-foreground">Volume acumulado 2026</span>
        <span className="flex items-center gap-1 font-mono text-sm font-bold text-risk-low">
          <ArrowUpRight className="h-4 w-4" /> 97,4 Mt
        </span>
      </div>
    </div>
  );
}
