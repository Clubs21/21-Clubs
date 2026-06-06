import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle, CloudRain, TrendingDown, Bug, Truck, Anchor, Zap,
  Bell, Filter, CheckCircle2, X, Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";
import { RiskBadge, type RiskLevel } from "@/components/dashboard/RiskBadge";

export const Route = createFileRoute("/alertas")({
  head: () => ({
    meta: [
      { title: "Alertas — AgroSense" },
      { name: "description", content: "Central de alertas inteligentes: riscos, oportunidades e gargalos operacionais." },
    ],
  }),
  component: AlertasPage,
});

interface Alerta {
  id: number;
  icon: LucideIcon;
  categoria: string;
  titulo: string;
  descricao: string;
  impacto: string;
  nivel: RiskLevel;
  tempo: string;
  lido: boolean;
  tipo: "risco" | "oportunidade" | "gargalo";
}

const alertas: Alerta[] = [
  {
    id: 1, icon: CloudRain, categoria: "Clima", titulo: "Estiagem prolongada — MT",
    descricao: "Déficit hídrico acima de 40% na região central de Mato Grosso. Impacto estimado de -8% na produtividade da soja.",
    impacto: "Produção: -8% estimado", nivel: "critical", tempo: "há 12 min", lido: false, tipo: "risco",
  },
  {
    id: 2, icon: TrendingDown, categoria: "Mercado", titulo: "Queda de preço — Trigo",
    descricao: "Recuo de 5,1% no mercado spot internacional. CBOT abaixo de 550 cts/bu pela primeira vez em 6 meses.",
    impacto: "Receita: -R$ 120/t", nivel: "high", tempo: "há 38 min", lido: false, tipo: "risco",
  },
  {
    id: 3, icon: Anchor, categoria: "Logística", titulo: "Congestionamento — Porto de Paranaguá",
    descricao: "Fila de 41 navios aguardando atracação. Tempo médio de espera subiu para 14 horas. Risco de demurrage elevado.",
    impacto: "Custo extra: +R$ 85/t", nivel: "high", tempo: "há 1h", lido: false, tipo: "gargalo",
  },
  {
    id: 4, icon: Bug, categoria: "Produção", titulo: "Foco de praga — Algodão BA",
    descricao: "Detecção de bicudo em 3 talhões monitorados na região de Luís Eduardo Magalhães. Risco de disseminação moderado.",
    impacto: "Área de risco: 1.200 ha", nivel: "medium", tempo: "há 2h", lido: false, tipo: "risco",
  },
  {
    id: 5, icon: Truck, categoria: "Logística", titulo: "Oportunidade de frete — Sul do MT",
    descricao: "Retorno disponível de caminhões no eixo Sorriso–Rondonópolis. Frete 22% abaixo da média regional.",
    impacto: "Economia: R$ 28/t", nivel: "low", tempo: "há 3h", lido: true, tipo: "oportunidade",
  },
  {
    id: 6, icon: Zap, categoria: "Mercado", titulo: "Alta do dólar — janela de venda",
    descricao: "Dólar acima de R$ 5,80 abre janela favorável para fixação de preços de exportação de soja.",
    impacto: "Margem: +R$ 4,20/sc", nivel: "low", tempo: "há 4h", lido: true, tipo: "oportunidade",
  },
  {
    id: 7, icon: AlertTriangle, categoria: "Crédito", titulo: "Revisão de score — RS",
    descricao: "Score de crédito de 4 produtores rebaixado pelo modelo. Exposição total: R$ 12,4 mi em crédito rural.",
    impacto: "Crédito em risco: R$ 12,4 mi", nivel: "medium", tempo: "há 5h", lido: true, tipo: "risco",
  },
  {
    id: 8, icon: CloudRain, categoria: "Clima", titulo: "Chuva acima da média — PR",
    descricao: "Acumulado 40% acima do esperado para o período em Maringá e Londrina. Risco de colheita atrasada.",
    impacto: "Atraso previsto: 7–12 dias", nivel: "medium", tempo: "há 6h", lido: true, tipo: "risco",
  },
];

const tipoConfig = {
  risco: { label: "Risco", cls: "bg-risk-critical/15 text-risk-critical border-risk-critical/30" },
  oportunidade: { label: "Oportunidade", cls: "bg-primary/15 text-primary border-primary/30" },
  gargalo: { label: "Gargalo", cls: "bg-risk-high/15 text-risk-high border-risk-high/30" },
} as const;

function AlertasPage() {
  const naoLidos = alertas.filter((a) => !a.lido).length;
  const criticos = alertas.filter((a) => a.nivel === "critical").length;
  const oportunidades = alertas.filter((a) => a.tipo === "oportunidade").length;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 space-y-6 p-4 lg:p-6">

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                Central de <span className="text-glow text-primary">Alertas Inteligentes</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Riscos · oportunidades · gargalos operacionais — atualizados em tempo real
              </p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-risk-critical/30 bg-risk-critical/10 px-3 py-1 font-mono text-xs text-risk-critical">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-risk-critical" />
                {naoLidos} novos
              </span>
            </div>
          </div>

          {/* Contadores */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="surface-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-risk-critical/15 text-risk-critical">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <span className="font-mono text-3xl font-bold text-risk-critical">{criticos}</span>
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Alertas críticos</p>
              <p className="mt-0.5 text-sm font-medium text-foreground">Ação imediata necessária</p>
            </div>
            <div className="surface-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-risk-medium/15 text-risk-medium">
                  <Bell className="h-5 w-5" />
                </div>
                <span className="font-mono text-3xl font-bold text-risk-medium">{alertas.filter(a => a.nivel === "high" || a.nivel === "medium").length}</span>
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Alertas de atenção</p>
              <p className="mt-0.5 text-sm font-medium text-foreground">Monitoramento necessário</p>
            </div>
            <div className="surface-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="font-mono text-3xl font-bold text-primary">{oportunidades}</span>
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Oportunidades</p>
              <p className="mt-0.5 text-sm font-medium text-foreground">Janelas favoráveis abertas</p>
            </div>
          </div>

          {/* Lista de alertas */}
          <div className="surface-card rounded-xl border border-border p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-semibold">Todos os alertas</h3>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Filter className="h-3.5 w-3.5" /> Filtrar
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {alertas.map((a) => (
                <div
                  key={a.id}
                  className={`flex gap-4 rounded-xl border p-4 transition-all hover:border-primary/30 ${
                    !a.lido ? "border-border bg-secondary/40" : "border-border/40 bg-secondary/15 opacity-75"
                  }`}
                >
                  {/* Ícone */}
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: a.nivel === "critical" ? "oklch(0.62 0.22 25 / 0.15)" :
                        a.nivel === "high" ? "oklch(0.72 0.18 50 / 0.15)" :
                        a.tipo === "oportunidade" ? "oklch(0.82 0.23 145 / 0.15)" :
                        "oklch(0.85 0.17 90 / 0.15)",
                      color: a.nivel === "critical" ? "var(--color-risk-critical)" :
                        a.nivel === "high" ? "var(--color-risk-high)" :
                        a.tipo === "oportunidade" ? "var(--color-primary)" :
                        "var(--color-risk-medium)",
                    }}
                  >
                    <a.icon className="h-5 w-5" />
                  </div>

                  {/* Conteúdo */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{a.categoria}</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium ${tipoConfig[a.tipo].cls}`}
                      >
                        {tipoConfig[a.tipo].label}
                      </span>
                      <RiskBadge level={a.nivel} />
                      {!a.lido && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                    <p className="mt-1.5 text-sm font-semibold">{a.titulo}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{a.descricao}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-4">
                      <span className="flex items-center gap-1 rounded-md border border-border bg-background/40 px-2 py-0.5 font-mono text-[10px] text-foreground">
                        <TrendingDown className="h-3 w-3 text-risk-high" /> {a.impacto}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        <Clock className="h-3 w-3" /> {a.tempo}
                      </span>
                    </div>
                  </div>

                  {/* Ação */}
                  <button className="shrink-0 rounded-lg border border-border/50 bg-background/30 p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

