import { RiskBadge, type RiskLevel } from "./RiskBadge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Row {
  asset: string;
  region: string;
  yield: string;
  price: string;
  change: number;
  risk: RiskLevel;
  score: number;
}

const rows: Row[] = [
  { asset: "Soja", region: "Mato Grosso", yield: "62.4 sc/ha", price: "R$ 158,30", change: 2.4, risk: "low", score: 88 },
  { asset: "Milho 2ª safra", region: "Paraná", yield: "118 sc/ha", price: "R$ 71,90", change: -1.2, risk: "medium", score: 71 },
  { asset: "Café Arábica", region: "Minas Gerais", yield: "31 sc/ha", price: "R$ 1.240", change: 4.8, risk: "low", score: 84 },
  { asset: "Algodão", region: "Bahia", yield: "298 @/ha", price: "R$ 392,00", change: -3.6, risk: "high", score: 54 },
  { asset: "Cana-de-açúcar", region: "São Paulo", yield: "82 t/ha", price: "R$ 138,40", change: 0.9, risk: "medium", score: 68 },
  { asset: "Trigo", region: "Rio G. do Sul", yield: "44 sc/ha", price: "R$ 88,10", change: -5.1, risk: "critical", score: 41 },
];

export function AnalyticsTable() {
  return (
    <div className="surface-card overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="font-semibold">Tabela Analítica de Ativos</h3>
          <p className="font-mono text-xs text-muted-foreground">Produtividade · preço · risco</p>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">
          6 ativos
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3 font-medium">Ativo</th>
              <th className="px-5 py-3 font-medium">Região</th>
              <th className="px-5 py-3 font-medium">Produtividade</th>
              <th className="px-5 py-3 font-medium">Preço</th>
              <th className="px-5 py-3 font-medium">Variação</th>
              <th className="px-5 py-3 font-medium">Risco</th>
              <th className="px-5 py-3 text-right font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const up = r.change >= 0;
              return (
                <tr key={r.asset} className="border-b border-border/60 transition-colors hover:bg-secondary/40">
                  <td className="px-5 py-3.5 font-semibold">{r.asset}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{r.region}</td>
                  <td className="px-5 py-3.5 font-mono">{r.yield}</td>
                  <td className="px-5 py-3.5 font-mono">{r.price}</td>
                  <td className="px-5 py-3.5">
                    <span className={`flex items-center gap-1 font-mono ${up ? "text-primary" : "text-risk-critical"}`}>
                      {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                      {up ? "+" : ""}
                      {r.change}%
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <RiskBadge level={r.risk} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="ml-auto flex w-28 items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full rounded-full bg-[image:var(--gradient-neon)]" style={{ width: `${r.score}%` }} />
                      </div>
                      <span className="w-7 font-mono text-xs">{r.score}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
