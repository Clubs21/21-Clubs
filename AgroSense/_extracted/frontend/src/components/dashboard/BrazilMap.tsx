import { useState } from "react";
import { RiskBadge, type RiskLevel } from "./RiskBadge";

type Region = {
  id: string;
  name: string;
  d: string;
  cx: number;
  cy: number;
  risk: RiskLevel;
  production: string;
};

// Mapa estilizado do Brasil por macrorregião (paths simplificados)
const regions: Region[] = [
  {
    id: "norte",
    name: "Norte",
    d: "M70,40 L210,30 L235,110 L150,150 L90,130 Z",
    cx: 150,
    cy: 90,
    risk: "medium",
    production: "18,4 Mt",
  },
  {
    id: "nordeste",
    name: "Nordeste",
    d: "M210,30 L300,55 L295,150 L235,160 L235,110 Z",
    cx: 262,
    cy: 95,
    risk: "high",
    production: "26,1 Mt",
  },
  {
    id: "centrooeste",
    name: "Centro-Oeste",
    d: "M150,150 L235,160 L240,235 L150,250 L120,190 Z",
    cx: 180,
    cy: 200,
    risk: "low",
    production: "118,7 Mt",
  },
  {
    id: "sudeste",
    name: "Sudeste",
    d: "M240,160 L295,150 L300,225 L240,235 Z",
    cx: 268,
    cy: 195,
    risk: "medium",
    production: "62,3 Mt",
  },
  {
    id: "sul",
    name: "Sul",
    d: "M150,250 L240,235 L225,310 L160,315 L130,270 Z",
    cx: 188,
    cy: 280,
    risk: "critical",
    production: "59,1 Mt",
  },
];

const riskFill: Record<RiskLevel, string> = {
  low: "var(--color-risk-low)",
  medium: "var(--color-risk-medium)",
  high: "var(--color-risk-high)",
  critical: "var(--color-risk-critical)",
};

export function BrazilMap() {
  const [active, setActive] = useState<Region>(regions[2]);

  return (
    <div className="surface-card rounded-xl border border-border p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Mapa de Risco · Brasil</h3>
          <p className="font-mono text-xs text-muted-foreground">Safra de soja por região</p>
        </div>
        <RiskBadge level={active.risk} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_180px]">
        <div className="relative">
          <svg viewBox="0 0 330 340" className="h-auto w-full max-w-[360px]">
            {regions.map((r) => {
              const isActive = r.id === active.id;
              return (
                <g
                  key={r.id}
                  onMouseEnter={() => setActive(r)}
                  className="cursor-pointer"
                >
                  <path
                    d={r.d}
                    fill={riskFill[r.risk]}
                    fillOpacity={isActive ? 0.85 : 0.35}
                    stroke="var(--color-background)"
                    strokeWidth={2}
                    className="transition-all duration-200"
                  />
                  <circle cx={r.cx} cy={r.cy} r={isActive ? 5 : 3} fill="var(--color-background)" />
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <div className="surface-card rounded-lg border border-border p-3">
            <p className="text-xs text-muted-foreground">{active.name}</p>
            <p className="mt-1 font-mono text-lg font-bold text-primary">{active.production}</p>
            <p className="text-[10px] text-muted-foreground">produção projetada</p>
          </div>
          <div className="space-y-1.5">
            {regions.map((r) => (
              <button
                key={r.id}
                onMouseEnter={() => setActive(r)}
                className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                  r.id === active.id ? "bg-secondary" : "hover:bg-secondary/50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: riskFill[r.risk] }} />
                  {r.name}
                </span>
                <span className="font-mono text-muted-foreground">{r.production}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
