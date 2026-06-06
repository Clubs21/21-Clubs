import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles, MapPin, Clock, TrendingUp, Warehouse, Truck, DollarSign, Star, ArrowRight,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RiskBadge } from "@/components/dashboard/RiskBadge";

export const Route = createFileRoute("/oportunidades")({
  head: () => ({
    meta: [
      { title: "Oportunidades — AgroSense" },
      { name: "description", content: "Tela de oportunidades: melhores regiões, janelas de venda e oportunidades logísticas." },
    ],
  }),
  component: OportunidadesPage,
});

interface Oportunidade {
  tipo: "venda" | "logistica" | "armazenagem" | "regiao";
  titulo: string;
  descricao: string;
  ganho: string;
  validade: string;
  score: number;
  regiao?: string;
  detalhe: string;
}

const oportunidades: Oportunidade[] = [
  {
    tipo: "venda", titulo: "Janela de venda — Soja Nov/Dez",
    descricao: "Combinação favorável: dólar acima de R$5,80 + CBOT em alta + demanda chinesa aquecida.",
    ganho: "+R$ 14/saca vs. preço atual", validade: "Estimativa: 18–32 dias", score: 94,
    detalhe: "Premissa: hedge cambial 60% + fixação no CBOT entre 490–520 cts/bu",
  },
  {
    tipo: "logistica", titulo: "Frete de retorno — MT → Santos",
    descricao: "Caminhões disponíveis com retorno de São Paulo para Mato Grosso. Frete 22% abaixo da tabela ANTT.",
    ganho: "Economia de R$ 28/t", validade: "Disponível até 10/dez", score: 87,
    detalhe: "Contato via bolsa de cargas disponível · capacidade 80 unidades",
  },
  {
    tipo: "armazenagem", titulo: "Armazenagem estratégica — PR",
    descricao: "Silo com capacidade livre em Maringá (PR). Armazenagem nos próximos 60 dias pode render diferença de preço estimada.",
    ganho: "Projeção: +R$ 9,40/saca em 60 dias", validade: "Capacidade: 45 Kt disponíveis", score: 82,
    detalhe: "Custo R$ 2,60/sc/mês · projeção de preço baseada em série histórica",
  },
  {
    tipo: "regiao", titulo: "Expansão produtiva — MATOPIBA",
    descricao: "Regiões do Piauí e Maranhão com custo de arrendamento 40% inferior ao Mato Grosso. Produtividade crescente.",
    ganho: "Custo/ha 40% menor que MT", validade: "Janela de arrendamento: out–dez", score: 78,
    regiao: "MATOPIBA",
    detalhe: "Produtividade média 55–60 sc/ha · logística em expansão via ferrovia Norte-Sul",
  },
  {
    tipo: "venda", titulo: "Fixação de milho — Fevereiro",
    descricao: "Curva futura de milho indica prêmio de R$ 4,20/sc para entrega em fevereiro vs. entrega imediata.",
    ganho: "+R$ 4,20/saca vs. spot", validade: "Contrato disponível na B3", score: 74,
    detalhe: "Volume mínimo: 450 toneladas · taxa de armazenagem inclusa no prêmio",
  },
  {
    tipo: "logistica", titulo: "Ferrovia Rumo — Vale do Araguaia",
    descricao: "Nova rota disponível pela Ferrovia Rumo de Rondonópolis a Santos. Frete 18% menor que rodoviário.",
    ganho: "Economia: R$ 22/t vs. rodovias", validade: "Capacidade limitada: 400 mil t/mês", score: 71,
    detalhe: "Lead time: 5–7 dias · requer silo de transbordo em Rondonópolis",
  },
];

const tipoConfig = {
  venda: { icon: DollarSign, label: "Venda", cor: "var(--color-chart-1)", corBg: "oklch(0.85 0.24 142 / 0.15)" },
  logistica: { icon: Truck, label: "Logística", cor: "var(--color-chart-2)", corBg: "oklch(0.55 0.12 175 / 0.15)" },
  armazenagem: { icon: Warehouse, label: "Armazenagem", cor: "var(--color-chart-3)", corBg: "oklch(0.85 0.17 90 / 0.15)" },
  regiao: { icon: MapPin, label: "Região", cor: "var(--color-chart-4)", corBg: "oklch(0.7 0.17 50 / 0.15)" },
} as const;

const melhoresRegioes = [
  { regiao: "Mato Grosso", score: 91, producao: "Alta", logistica: "Boa", custo: "Médio" },
  { regiao: "Paraná", score: 87, producao: "Alta", logistica: "Ótima", custo: "Médio" },
  { regiao: "MATOPIBA", score: 82, producao: "Crescente", logistica: "Em expansão", custo: "Baixo" },
  { regiao: "Goiás", score: 78, producao: "Alta", logistica: "Boa", custo: "Baixo" },
  { regiao: "Rio Grande do Sul", score: 72, producao: "Variável", logistica: "Boa", custo: "Alto" },
];

function OportunidadesPage() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 space-y-6 p-4 lg:p-6">

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                Tela de <span className="text-glow text-primary">Oportunidades</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Melhores regiões · janelas de venda · logística · armazenagem · Safra 2025/26
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-xs text-primary">{oportunidades.length} oportunidades ativas</span>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="Maior ganho identificado" value="R$ 14" unit="/saca" delta={14.3} icon={TrendingUp} spark={[4,6,8,9,11,13,14]} />
            <KpiCard label="Oportunidades de venda" value="2" unit="ativas" delta={0} icon={DollarSign} spark={[1,1,2,2,2,2,2]} />
            <KpiCard label="Fretes abaixo da tabela" value="2" unit="rotas" delta={33} icon={Truck} spark={[1,1,1,2,2,2,2]} />
            <KpiCard label="Silos com espaço livre" value="18,4" unit="Mt" delta={-12.1} icon={Warehouse} spark={[28,26,24,22,20,19,18]} />
          </div>

          {/* Cards de oportunidades */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {oportunidades.map((op, i) => {
              const conf = tipoConfig[op.tipo];
              const Icone = conf.icon;
              return (
                <div
                  key={i}
                  className="surface-card group relative overflow-hidden rounded-xl border border-border p-5 transition-all hover:border-primary/40"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: conf.corBg, color: conf.cor }}
                    >
                      <Icone className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium"
                          style={{ color: conf.cor, borderColor: `${conf.cor}40`, background: conf.corBg }}
                        >
                          {conf.label}
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(Math.round(op.score / 20))].map((_, j) => (
                            <Star key={j} className="h-3 w-3 fill-current text-primary" />
                          ))}
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground">Score {op.score}/100</span>
                      </div>
                      <p className="mt-2 text-sm font-semibold">{op.titulo}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{op.descricao}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-border bg-background/30 p-2.5">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Ganho estimado</p>
                      <p className="mt-0.5 text-sm font-bold text-primary">{op.ganho}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-background/30 p-2.5">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Validade / Capacidade</p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-foreground">
                        <Clock className="h-3 w-3 text-muted-foreground" /> {op.validade}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="font-mono text-[10px] text-muted-foreground">{op.detalhe}</p>
                    <button className="flex shrink-0 items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-primary transition-colors hover:border-primary hover:bg-primary/20">
                      Detalhar <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Melhores regiões */}
          <div className="surface-card rounded-xl border border-border p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Ranking de Regiões Produtivas</h3>
                <p className="font-mono text-xs text-muted-foreground">Score composto: produção + logística + custo + clima</p>
              </div>
              <span className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                RANKING
              </span>
            </div>
            <div className="space-y-3">
              {melhoresRegioes.map((r, i) => (
                <div key={r.regiao} className="flex items-center gap-4 rounded-lg border border-border/60 bg-secondary/30 p-3 transition-colors hover:border-primary/30">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold ${
                      i === 0 ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-semibold">{r.regiao}</p>
                      <span className="font-mono text-xs text-muted-foreground">Produção: <span className="text-foreground">{r.producao}</span></span>
                      <span className="font-mono text-xs text-muted-foreground">Logística: <span className="text-foreground">{r.logistica}</span></span>
                      <span className="font-mono text-xs text-muted-foreground">Custo: <span className="text-foreground">{r.custo}</span></span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${r.score}%` }} />
                      </div>
                      <span className="font-mono text-xs font-bold text-primary">{r.score}/100</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

