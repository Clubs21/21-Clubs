const regions = ["Sul", "Sudeste", "Centro-O.", "Nordeste", "Norte"];
const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

// valores 0-100 (intensidade de risco/atividade)
const grid: number[][] = [
  [22, 35, 48, 60, 30, 18],
  [40, 55, 70, 82, 50, 33],
  [65, 78, 90, 95, 72, 58],
  [30, 45, 62, 75, 48, 40],
  [15, 28, 42, 55, 38, 25],
];

function cellColor(v: number) {
  if (v < 30) return "var(--color-risk-low)";
  if (v < 55) return "var(--color-risk-medium)";
  if (v < 80) return "var(--color-risk-high)";
  return "var(--color-risk-critical)";
}

export function Heatmap() {
  return (
    <div className="surface-card rounded-xl border border-border p-5">
      <div className="mb-4">
        <h3 className="font-semibold">Heatmap de Risco Climático</h3>
        <p className="font-mono text-xs text-muted-foreground">Região × período</p>
      </div>

      <div className="space-y-1.5">
        <div className="grid grid-cols-[88px_repeat(6,1fr)] gap-1.5">
          <div />
          {months.map((m) => (
            <div key={m} className="text-center font-mono text-[10px] text-muted-foreground">
              {m}
            </div>
          ))}
        </div>
        {grid.map((row, r) => (
          <div key={regions[r]} className="grid grid-cols-[88px_repeat(6,1fr)] items-center gap-1.5">
            <div className="truncate text-xs text-muted-foreground">{regions[r]}</div>
            {row.map((v, c) => (
              <div
                key={c}
                title={`${regions[r]} · ${months[c]}: ${v}`}
                className="flex h-8 items-center justify-center rounded-md font-mono text-[10px] font-medium text-background transition-transform hover:scale-105"
                style={{ backgroundColor: cellColor(v), opacity: 0.35 + (v / 100) * 0.65 }}
              >
                {v}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-end gap-3 font-mono text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-risk-low" />Baixo</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-risk-medium" />Médio</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-risk-high" />Alto</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-risk-critical" />Crítico</span>
      </div>
    </div>
  );
}
