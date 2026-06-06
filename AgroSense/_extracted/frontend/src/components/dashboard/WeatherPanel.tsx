import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
} from "recharts";

const rain = [
  { d: "Seg", mm: 12 },
  { d: "Ter", mm: 4 },
  { d: "Qua", mm: 28 },
  { d: "Qui", mm: 42 },
  { d: "Sex", mm: 18 },
  { d: "Sáb", mm: 6 },
  { d: "Dom", mm: 2 },
];

const metrics = [
  { icon: Thermometer, label: "Temp.", value: "31°C" },
  { icon: Droplets, label: "Umidade", value: "62%" },
  { icon: Wind, label: "Vento", value: "14 km/h" },
  { icon: CloudRain, label: "Chuva 7d", value: "112 mm" },
];

export function WeatherPanel() {
  return (
    <div className="surface-card rounded-xl border border-border p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Painel Climático</h3>
          <p className="font-mono text-xs text-muted-foreground">Centro-Oeste · 7 dias</p>
        </div>
        <Sun className="h-5 w-5 text-risk-medium" />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-lg border border-border bg-secondary/40 p-3">
            <m.icon className="h-4 w-4 text-primary" />
            <p className="mt-2 font-mono text-sm font-bold">{m.value}</p>
            <p className="text-[10px] text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="mb-2 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <Cloud className="h-3.5 w-3.5" /> Precipitação prevista (mm)
        </p>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={rain} margin={{ left: -28, right: 0 }}>
            <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: "var(--color-secondary)", opacity: 0.4 }}
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: 10,
                fontSize: 12,
              }}
            />
            <Bar dataKey="mm" radius={[4, 4, 0, 0]}>
              {rain.map((r, i) => (
                <Cell key={i} fill={r.mm > 30 ? "var(--color-chart-5)" : "var(--color-chart-2)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
