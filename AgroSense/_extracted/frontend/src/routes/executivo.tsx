import { createFileRoute } from "@tanstack/react-router";
import {
  TrendingUp, TrendingDown, DollarSign, Ship, Sprout, ShieldAlert,
  Globe, ArrowUpRight, ArrowDownRight, BarChart3, Activity,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";
import { CircularIndicator } from "@/components/dashboard/CircularIndicator";
import { RiskBadge } from "@/components/dashboard/RiskBadge";

export const Route = createFileRoute("/executivo")({
  head: () => ({
    meta: [
      { title: "Dashboard Executivo — AgroSense" },
      { name: "description", content: "Visão executiva: KPIs principais, riscos globais, oportunidades e previsões macro." },
    ],
  }),
  component: ExecutivoPage,
});

const tooltip = {
  contentStyle: {
    background: "var(--color-popover)",
    border: "1px solid var(--color-border)",
    borderRadius: 10,
    fontSize: 12,
    fontFamily: "var(--font-mono)",
  },
};

const tendenciaMacro = [
  { m: "Jan", receita: 48, risco: 42 },
  { m: "Fev", receita: 52, risco: 38 },
  { m: "Mar", receita: 61, risco: 35 },
  { m: "Abr", receita: 74, risco: 40 },
  { m: "Mai", receita: 89, risco: 44 },
  { m: "Jun", receita: 82, risco: 36 },
  { m: "Jul", receita: 76, risco: 32 },
  { m: "Ago", receita: 84, risco: 34 },
  { m: "Set", receita: 91, risco: 29 },
];

const radarData = [
  { dim: "Mercado", score: 76 },
  { dim: "Clima", score: 71 },
  { dim: "Logística", score: 52 },
  { dim: "Produção", score: 84 },
  { dim: "Financeiro", score: 78 },
  { dim: "Exportação", score: 81 },
];

const kpisExecutivos = [
  { label: "Receita total projetada", valor: "R$ 1,84 tri", variacao: 5.7, positivo: true, icon: DollarSign, detalhe: "vs. safra 2024/25" },
  { label: "Volume produzido", valor: "284,6 Mt", variacao: 3.2, positivo: true, icon: Sprout, detalhe: "grãos + fibras" },
  { label: "Exportações", valor: "97,4 Mt", variacao: 4.1, positivo: true, icon: Ship, detalhe: "acumulado 2026" },
  { label: "Índice de Risco Geral", valor: "34/100", variacao: -8.2, positivo: true, icon: ShieldAlert, detalhe: "queda = melhora" },
  { label: "Margem média safra", valor: "31%", variacao: 4.8, positivo: true, icon: BarChart3, detalhe: "vs. média 5 anos: 22%" },
  { label: "Frete médio nacional", valor: "R$ 312/t", variacao: 12.3, positivo: false, icon: Activity, detalhe: "alta preocupa" },
];

const previsoesMacro = [
  { item: "Soja — preço Paranaguá em 90 dias", valor: "R$ 178–195/sc", cenario: "Otimista", nivel: "low" as const },
  { item: "Milho — preço spot em 60 dias", valor: "R$ 62–68/sc", cenario: "Neutro", nivel: "medium" as const },
  { item: "Dólar — projeção trimestral", valor: "R$ 5,60–5,95", cenario: "Neutro", nivel: "medium" as const },
  { item: "Produção soja 25/26 — revisão final", valor: "160–165 Mt", cenario: "Otimista", nivel: "low" as const },
  { item: "Frete rodoviário — tendência 30 dias", valor: "+5% a +9%", cenario: "Pessimista", nivel: "high" as const },
];

const alertasExecutivos = [
  { texto: "Congestionamento crítico — Porto Paranaguá: 41 navios", nivel: "critical" as const },
  { texto: "Estiagem prolongada no MT afeta 18% da área sojícola", nivel: "high" as const },
  { texto: "Prêmio de exportação em máxima de 18 meses (+72 cts/bu)", nivel: "low" as const },
  { texto: "Demanda chinesa 6% acima da projeção USDA para 2026", nivel: "low" as const },
];

function ExecutivoPage() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 space-y-6 p-4 lg:p-6">

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                Dashboard <span className="text-glow text-primary">Executivo</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Visão condensada para diretores · investidores · cooperativas · Safra 2025/26
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2">
              <Globe className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs text-primary">Atualizado: hoje 14h32 · Safra 2025/26</span>
            </div>
          </div>

          {/* KPIs Executivos */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {kpisExecutivos.map((k) => {
              const Icone = k.icon;
              return (
                <div key={k.label} className="surface-card group relative overflow-hidden rounded-xl border border-border p-5 transition-all hover:border-primary/40">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/70 text-primary">
                      <Icone className="h-5 w-5" />
                    </div>
                    <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-xs ${k.positivo ? "bg-primary/15 text-primary" : "bg-risk-critical/15 text-risk-critical"}`}>
                      {k.positivo ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {k.variacao >= 0 ? "+" : ""}{k.variacao}%
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">{k.label}</p>
                  <p className="mt-1 text-2xl font-bold tracking-tight">{k.valor}</p>
                  <p className="mt-1 font-mono text-[10px] text-muted-foreground">{k.detalhe}</p>
                </div>
              );
            })}
          </div>

          {/* Tendência Macro + Radar */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="surface-card lg:col-span-2 rounded-xl border border-border p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Tendência Macro — Receita vs. Risco</h3>
                  <p className="font-mono text-xs text-muted-foreground">Índice normalizado 0–100 · mensal</p>
                </div>
                <div className="flex gap-3 text-xs">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-chart-1" /> Receita</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-risk-high" /> Risco</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={tendenciaMacro} margin={{ left: -18, right: 4 }}>
                  <defs>
                    <linearGradient id="gReceita" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gRisco" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-risk-high)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="var(--color-risk-high)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltip} />
                  <Area type="monotone" dataKey="receita" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#gReceita)" name="Receita" />
                  <Area type="monotone" dataKey="risco" stroke="var(--color-risk-high)" strokeWidth={2} fill="url(#gRisco)" name="Risco" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="surface-card rounded-xl border border-border p-5">
              <div className="mb-2">
                <h3 className="font-semibold">Radar Setorial</h3>
                <p className="font-mono text-xs text-muted-foreground">Score por dimensão</p>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="dim" stroke="var(--color-muted-foreground)" fontSize={10} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="score" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.2} />
                  <Tooltip {...tooltip} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scores globais + Alertas + Previsões */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Scores */}
            <div className="surface-card rounded-xl border border-border p-5">
              <h3 className="mb-4 font-semibold">Scores por Dimensão</h3>
              <div className="grid grid-cols-2 gap-4">
                <CircularIndicator value={76} label="Mercado" size={100} />
                <CircularIndicator value={71} label="Clima" size={100} color="var(--color-risk-medium)" />
                <CircularIndicator value={52} label="Logística" size={100} color="var(--color-risk-high)" />
                <CircularIndicator value={84} label="Produção" size={100} />
              </div>
              <div className="mt-4 rounded-lg border border-primary/30 bg-primary/10 p-3 text-center">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Índice Geral de Risco</p>
                <p className="mt-1 text-3xl font-bold text-primary">34</p>
                <p className="font-mono text-[10px] text-muted-foreground">risco baixo · safra 2025/26</p>
              </div>
            </div>

            {/* Alertas executivos */}
            <div className="surface-card rounded-xl border border-border p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Alertas Prioritários</h3>
                <span className="flex items-center gap-1.5 rounded-full bg-risk-critical/15 px-2.5 py-0.5 font-mono text-xs text-risk-critical">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-risk-critical" />
                  {alertasExecutivos.length}
                </span>
              </div>
              <div className="space-y-3">
                {alertasExecutivos.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border border-border/60 bg-secondary/30 p-3">
                    <RiskBadge level={a.nivel} />
                    <p className="flex-1 text-xs text-foreground">{a.texto}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Previsões macro */}
            <div className="surface-card rounded-xl border border-border p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Previsões Macro</h3>
                <span className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  FORECAST
                </span>
              </div>
              <div className="space-y-3">
                {previsoesMacro.map((p, i) => (
                  <div key={i} className="rounded-lg border border-border/60 bg-secondary/20 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold">{p.item}</p>
                      <RiskBadge level={p.nivel} label={p.cenario} />
                    </div>
                    <p className="mt-1 font-mono text-sm font-bold text-primary">{p.valor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

