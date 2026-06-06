import { Truck, Ship, Warehouse } from "lucide-react";
import { RiskBadge, type RiskLevel } from "./RiskBadge";

type Route = {
  corridor: string;
  mode: "rodo" | "ferro" | "porto";
  cost: string;
  occupancy: number;
  status: RiskLevel;
};

const routes: Route[] = [
  { corridor: "Sorriso → Santos", mode: "rodo", cost: "R$ 312/t", occupancy: 88, status: "high" },
  { corridor: "Rondonópolis → Santos", mode: "ferro", cost: "R$ 168/t", occupancy: 72, status: "medium" },
  { corridor: "Sinop → Miritituba", mode: "rodo", cost: "R$ 245/t", occupancy: 64, status: "medium" },
  { corridor: "Porto de Paranaguá", mode: "porto", cost: "fila 18 navios", occupancy: 94, status: "critical" },
];

const modeIcon = { rodo: Truck, ferro: Warehouse, porto: Ship };

function bar(occ: number) {
  if (occ >= 90) return "var(--color-risk-critical)";
  if (occ >= 75) return "var(--color-risk-high)";
  if (occ >= 55) return "var(--color-risk-medium)";
  return "var(--color-risk-low)";
}

export function LogisticsPanel() {
  return (
    <div className="surface-card rounded-xl border border-border p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Painel Logístico</h3>
          <p className="font-mono text-xs text-muted-foreground">Corredores de escoamento</p>
        </div>
        <Truck className="h-5 w-5 text-primary" />
      </div>

      <div className="space-y-3">
        {routes.map((r) => {
          const Icon = modeIcon[r.mode];
          return (
            <div key={r.corridor} className="rounded-lg border border-border bg-secondary/30 p-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Icon className="h-4 w-4 text-muted-foreground" /> {r.corridor}
                </span>
                <RiskBadge level={r.status} />
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>{r.cost}</span>
                <span>{r.occupancy}% capacidade</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${r.occupancy}%`, backgroundColor: bar(r.occupancy) }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
