import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

const data = [
  { dim: "Clima", v: 82 },
  { dim: "Solo", v: 74 },
  { dim: "Mercado", v: 91 },
  { dim: "Logística", v: 63 },
  { dim: "Crédito", v: 78 },
  { dim: "Produtividade", v: 88 },
];

export function RadarPanel() {
  return (
    <div className="surface-card rounded-xl border border-border p-5">
      <div className="mb-2">
        <h3 className="font-semibold">Radar Setorial</h3>
        <p className="font-mono text-xs text-muted-foreground">Índice multidimensional</p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="var(--color-border)" />
          <PolarAngleAxis dataKey="dim" tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
          <Radar
            dataKey="v"
            stroke="var(--color-primary)"
            fill="var(--color-primary)"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
