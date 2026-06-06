import { createFileRoute } from "@tanstack/react-router";
import {
  Sprout, Warehouse, Truck, Ship, Factory, ShoppingCart, ArrowRight,
  AlertTriangle, CheckCircle2, Clock, TrendingUp, TrendingDown,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";
import { RiskBadge } from "@/components/dashboard/RiskBadge";
import type { RiskLevel } from "@/components/dashboard/RiskBadge";

export const Route = createFileRoute("/cadeia")({
  head: () => ({
    meta: [
      { title: "Cadeia Produtiva — AgroSense" },
      { name: "description", content: "Dashboard da cadeia produtiva: fluxo de insumos à exportação com gargalos e dependências." },
    ],
  }),
  component: CadeiaPage,
});

interface Etapa {
  id: string;
  label: string;
  sublabel: string;
  icon: typeof Sprout;
  status: RiskLevel;
  score: number;
  entradas: string[];
  saidas: string[];
  gargalo?: string;
  oportunidade?: string;
  metricas: { label: string; valor: string; variacao?: number }[];
}

const etapas: Etapa[] = [
  {
    id: "insumos", label: "Insumos", sublabel: "Fertilizantes · Sementes · Defensivos",
    icon: Sprout, status: "medium", score: 71,
    entradas: ["Câmbio", "Petróleo", "Importação"],
    saidas: ["Custo de produção", "Produtividade"],
    gargalo: "Fertilizantes 18% acima da média histórica",
    metricas: [
      { label: "Fertilizante NPK", valor: "R$ 2.840/t", variacao: 18 },
      { label: "Semente soja RR", valor: "R$ 420/sc", variacao: 6 },
      { label: "Defensivo total", valor: "R$ 1.240/ha", variacao: 4 },
    ],
  },
  {
    id: "producao", label: "Produção", sublabel: "Safra · Colheita · Campo",
    icon: Sprout, status: "low", score: 84,
    entradas: ["Insumos", "Clima", "Crédito rural", "Diesel"],
    saidas: ["Armazenagem", "Logística", "Oferta global"],
    oportunidade: "Produtividade 4,2% acima da safra anterior",
    metricas: [
      { label: "Produção soja 25/26", valor: "162,4 Mt", variacao: 4.2 },
      { label: "Área plantada", valor: "47,8 M ha", variacao: 1.8 },
      { label: "Produtividade média", valor: "57,4 sc/ha", variacao: 2.3 },
    ],
  },
  {
    id: "armazenagem", label: "Armazenagem", sublabel: "Silos · Capacidade · Ocupação",
    icon: Warehouse, status: "medium", score: 68,
    entradas: ["Produção", "Logística reversa"],
    saidas: ["Preço interno", "Logística", "Indústria"],
    gargalo: "Déficit de 28,4 Mt na capacidade estática nacional",
    metricas: [
      { label: "Capacidade estática", valor: "181,7 Mt", variacao: 2.4 },
      { label: "Déficit estrutural", valor: "28,4 Mt", variacao: -5 },
      { label: "Custo médio", valor: "R$ 2,74/sc/mês", variacao: 3.8 },
    ],
  },
  {
    id: "logistica", label: "Logística", sublabel: "Fretes · Portos · Ferrovias",
    icon: Truck, status: "high", score: 52,
    entradas: ["Armazenagem", "Diesel", "Infraestrutura"],
    saidas: ["Exportação", "Mercado interno", "Indústria"],
    gargalo: "Congestionamento em Paranaguá: 41 navios na fila · frete rodoviário +12%",
    metricas: [
      { label: "Frete médio MT→SP", valor: "R$ 312/t", variacao: 12 },
      { label: "Navios em fila", valor: "147 navios", variacao: 8 },
      { label: "Modal ferroviário", valor: "15% da carga", variacao: 2 },
    ],
  },
  {
    id: "exportacao", label: "Exportação", sublabel: "Portos · Navios · Prêmio",
    icon: Ship, status: "low", score: 81,
    entradas: ["Logística", "Câmbio", "Demanda global"],
    saidas: ["Receita divisas", "Oferta global"],
    oportunidade: "Prêmio de exportação +72 cts/bu — máximo de 18 meses",
    metricas: [
      { label: "Volume exportado", valor: "97,4 Mt", variacao: 4.1 },
      { label: "Prêmio exportação", valor: "+72 cts/bu", variacao: 14.3 },
      { label: "Receita exportada", valor: "R$ 612 bi", variacao: 6.8 },
    ],
  },
  {
    id: "industria", label: "Indústria", sublabel: "Esmagamento · Processamento",
    icon: Factory, status: "low", score: 79,
    entradas: ["Armazenagem", "Logística", "Energia"],
    saidas: ["Farelo", "Óleo", "Mercado interno"],
    metricas: [
      { label: "Capacidade esmagamento", valor: "62 Mt/ano", variacao: 3 },
      { label: "Utilização", valor: "74% da capacidade", variacao: 2 },
      { label: "Farelo soja", valor: "R$ 1.840/t", variacao: 5 },
    ],
  },
  {
    id: "consumo", label: "Consumo Global", sublabel: "Demanda · Estoques · Preços",
    icon: ShoppingCart, status: "low", score: 77,
    entradas: ["Exportação", "Indústria", "Importadores"],
    saidas: ["Preço de equilíbrio global"],
    oportunidade: "Demanda chinesa 6% acima da projeção inicial",
    metricas: [
      { label: "Consumo global soja", valor: "374 Mt", variacao: 2.8 },
      { label: "Estoque/consumo", valor: "27,4%", variacao: -1.2 },
      { label: "Demanda China", valor: "108 Mt", variacao: 6 },
    ],
  },
];

const statusIcon = {
  low: CheckCircle2,
  medium: Clock,
  high: AlertTriangle,
  critical: AlertTriangle,
};

function CadeiaPage() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 space-y-6 p-4 lg:p-6">

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                Dashboard da <span className="text-glow text-primary">Cadeia Produtiva</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Insumos → Produção → Armazenagem → Logística → Exportação · gargalos e dependências
              </p>
            </div>
          </div>

          {/* Fluxo visual da cadeia */}
          <div className="surface-card rounded-xl border border-border p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Fluxo da Cadeia Produtiva — Soja</h3>
              <span className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                CADEIA COMPLETA
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-0">
              {etapas.map((etapa, i) => {
                const Icone = etapa.icon;
                const StatusIcon = statusIcon[etapa.status];
                const borderColor = etapa.status === "low" ? "var(--color-risk-low)" :
                  etapa.status === "medium" ? "var(--color-risk-medium)" :
                  etapa.status === "high" ? "var(--color-risk-high)" : "var(--color-risk-critical)";
                return (
                  <div key={etapa.id} className="flex items-center">
                    <div
                      className="flex flex-col items-center gap-1 rounded-xl border-2 bg-secondary/20 p-3 w-24 text-center transition-colors hover:bg-secondary/40 cursor-pointer"
                      style={{ borderColor }}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary" style={{ color: borderColor }}>
                        <Icone className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-semibold leading-tight">{etapa.label}</p>
                      <StatusIcon className="h-3.5 w-3.5" style={{ color: borderColor }} />
                    </div>
                    {i < etapas.length - 1 && (
                      <ArrowRight className="mx-1 h-5 w-5 shrink-0 text-muted-foreground/40 lg:mx-2" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              {(["low", "medium", "high", "critical"] as RiskLevel[]).map((l) => (
                <span key={l} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{
                    background: l === "low" ? "var(--color-risk-low)" :
                      l === "medium" ? "var(--color-risk-medium)" :
                      l === "high" ? "var(--color-risk-high)" : "var(--color-risk-critical)"
                  }} />
                  {l === "low" ? "Normal" : l === "medium" ? "Atenção" : l === "high" ? "Gargalo" : "Crítico"}
                </span>
              ))}
            </div>
          </div>

          {/* Cards de cada etapa */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {etapas.map((etapa) => {
              const Icone = etapa.icon;
              return (
                <div key={etapa.id} className="surface-card rounded-xl border border-border p-5">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/70 text-primary">
                        <Icone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">{etapa.label}</p>
                        <p className="font-mono text-[10px] text-muted-foreground">{etapa.sublabel}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <RiskBadge level={etapa.status} />
                      <span className="font-mono text-xs font-bold text-foreground">{etapa.score}/100</span>
                    </div>
                  </div>

                  {/* Score bar */}
                  <div className="mb-4 h-1 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${etapa.score}%`,
                        background: etapa.status === "low" ? "var(--color-risk-low)" :
                          etapa.status === "medium" ? "var(--color-risk-medium)" :
                          etapa.status === "high" ? "var(--color-risk-high)" : "var(--color-risk-critical)",
                      }}
                    />
                  </div>

                  {/* Métricas */}
                  <div className="mb-4 space-y-2">
                    {etapa.metricas.map((m) => (
                      <div key={m.label} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{m.label}</span>
                        <span className="flex items-center gap-1 font-mono font-medium">
                          {m.valor}
                          {m.variacao !== undefined && (
                            <span className={`font-mono text-[10px] ${m.variacao >= 0 ? "text-risk-low" : "text-risk-critical"}`}>
                              {m.variacao >= 0 ? "↑" : "↓"}{Math.abs(m.variacao)}%
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Gargalo ou Oportunidade */}
                  {etapa.gargalo && (
                    <div className="rounded-lg border border-risk-high/30 bg-risk-high/10 p-2.5">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-risk-high" />
                        <p className="text-xs text-risk-high">{etapa.gargalo}</p>
                      </div>
                    </div>
                  )}
                  {etapa.oportunidade && (
                    <div className="rounded-lg border border-primary/30 bg-primary/10 p-2.5">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        <p className="text-xs text-primary">{etapa.oportunidade}</p>
                      </div>
                    </div>
                  )}

                  {/* Entradas/Saídas */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground mb-1">Entradas</p>
                      <div className="flex flex-wrap gap-1">
                        {etapa.entradas.map((e) => (
                          <span key={e} className="rounded border border-border/50 bg-secondary/40 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">{e}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground mb-1">Saídas</p>
                      <div className="flex flex-wrap gap-1">
                        {etapa.saidas.map((s) => (
                          <span key={s} className="rounded border border-primary/20 bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] text-primary">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </main>
      </div>
    </div>
  );
}

