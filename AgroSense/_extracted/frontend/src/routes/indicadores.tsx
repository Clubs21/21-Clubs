import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3, TrendingUp, TrendingDown, Activity, Globe, Cloud,
  Truck, Sprout, Wallet, Search, Star,
} from "lucide-react";
import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";
import { CircularIndicator } from "@/components/dashboard/CircularIndicator";

export const Route = createFileRoute("/indicadores")({
  head: () => ({
    meta: [
      { title: "Central de Indicadores — AgroSense" },
      { name: "description", content: "Biblioteca completa de índices, métricas, scores e KPIs do agronegócio." },
    ],
  }),
  component: IndicadoresPage,
});

type Categoria = "todos" | "mercado" | "clima" | "logistica" | "producao" | "financeiro" | "risco";

interface Indicador {
  id: string;
  nome: string;
  sigla: string;
  categoria: Categoria;
  valor: string;
  unidade: string;
  variacao: number;
  score: number;
  descricao: string;
  fonte: string;
  favorito?: boolean;
}

const indicadores: Indicador[] = [
  { id: "cbot", nome: "CBOT Soja", sigla: "CBOT", categoria: "mercado", valor: "1.484", unidade: "cts/bu", variacao: 1.8, score: 72, descricao: "Preço da soja na Bolsa de Chicago (referência global).", fonte: "CME Group", favorito: true },
  { id: "dolar", nome: "Dólar Comercial", sigla: "USD/BRL", categoria: "mercado", valor: "5,82", unidade: "BRL", variacao: 0.4, score: 68, descricao: "Taxa de câmbio dólar x real — impacto direto na competitividade de exportação.", fonte: "Banco Central do Brasil", favorito: true },
  { id: "preco-soja-sp", nome: "Preço Soja — Paranaguá", sigla: "SOJA-PR", categoria: "mercado", valor: "R$ 172", unidade: "/saca", variacao: 2.1, score: 76, descricao: "Cotação spot da soja no porto de Paranaguá (referência nacional).", fonte: "CEPEA / ESALQ", favorito: true },
  { id: "igr", nome: "Índice Geral de Risco da Safra", sigla: "IGR", categoria: "risco", valor: "34", unidade: "/100", variacao: -3.2, score: 34, descricao: "Índice composto de risco climático, logístico, financeiro e operacional da safra.", fonte: "AgroSense" },
  { id: "iec", nome: "Índice de Estiagem Crítica", sigla: "IEC", categoria: "clima", valor: "42", unidade: "%", variacao: 8.1, score: 42, descricao: "Percentual da área agrícola monitorada com déficit hídrico acima do limite crítico.", fonte: "INMET / CPTEC" },
  { id: "ilu", nome: "Índice de Luminosidade", sigla: "ILU", categoria: "clima", valor: "87", unidade: "MJ/m²/d", variacao: -1.2, score: 87, descricao: "Radiação solar disponível para fotossíntese nas áreas produtoras.", fonte: "INMET" },
  { id: "frete-medio", nome: "Frete Médio MT→Santos", sigla: "FRET-MT", categoria: "logistica", valor: "R$ 312", unidade: "/t", variacao: 12.3, score: 48, descricao: "Custo médio de transporte rodoviário do Mato Grosso ao Porto de Santos.", fonte: "ANTT / Bolsa de Cargas" },
  { id: "congestion", nome: "Índice de Congestionamento Portuário", sigla: "ICP", categoria: "logistica", valor: "62", unidade: "/100", variacao: 15.4, score: 38, descricao: "Nível de congestionamento agregado dos principais portos exportadores.", fonte: "ANTAQ" },
  { id: "prod-media", nome: "Produtividade Média Soja", sigla: "PROD-SOJ", categoria: "producao", valor: "57,4", unidade: "sc/ha", variacao: 2.3, score: 81, descricao: "Produtividade média nacional de soja na safra 2025/26.", fonte: "CONAB" },
  { id: "custo-ha", nome: "Custo de Produção/ha", sigla: "CPH", categoria: "producao", valor: "R$ 4.840", unidade: "/ha", variacao: 6.2, score: 65, descricao: "Custo total de produção por hectare de soja no Mato Grosso.", fonte: "IMEA / CONAB" },
  { id: "margem", nome: "Margem Bruta Estimada", sigla: "MBE", categoria: "financeiro", valor: "31%", unidade: "", variacao: 4.8, score: 78, descricao: "Margem bruta média estimada para a safra 2025/26 de soja.", fonte: "AgroSense" },
  { id: "break-even", nome: "Break-even Soja", sigla: "BEP-SOJ", categoria: "financeiro", valor: "R$ 141", unidade: "/sc", variacao: 3.1, score: 72, descricao: "Preço mínimo necessário para cobrir todos os custos de produção da soja.", fonte: "IMEA" },
  { id: "score-clima", nome: "Score Climático", sigla: "SC-CLM", categoria: "risco", valor: "71", unidade: "/100", variacao: -2.1, score: 71, descricao: "Score composto de condições climáticas para a safra: precipitação, temperatura, anomalias.", fonte: "AgroSense" },
  { id: "score-log", nome: "Score Logístico", sigla: "SC-LOG", categoria: "risco", valor: "52", unidade: "/100", variacao: -8.4, score: 52, descricao: "Score composto de condições logísticas: frete, congestionamento, disponibilidade.", fonte: "AgroSense" },
  { id: "premio-exp", nome: "Prêmio de Exportação", sigla: "PREM-EXP", categoria: "mercado", valor: "+72", unidade: "cts/bu", variacao: 14.3, score: 85, descricao: "Diferencial pago sobre o CBOT para soja exportada pelo Porto de Paranaguá.", fonte: "ESALQ / Cargill" },
  { id: "est-consumo", nome: "Relação Estoque/Consumo Global", sigla: "SEC-GLOB", categoria: "mercado", valor: "27,4%", unidade: "", variacao: -1.2, score: 62, descricao: "Percentual de estoque global de soja em relação ao consumo anual — indicador de pressão de oferta.", fonte: "USDA / FAO" },
];

const categoriasConfig = {
  todos: { label: "Todos", icon: BarChart3 },
  mercado: { label: "Mercado", icon: TrendingUp },
  clima: { label: "Clima", icon: Cloud },
  logistica: { label: "Logística", icon: Truck },
  producao: { label: "Produção", icon: Sprout },
  financeiro: { label: "Financeiro", icon: Wallet },
  risco: { label: "Risco", icon: Activity },
} as const;

const scoreColor = (s: number) =>
  s >= 75 ? "var(--color-risk-low)" :
  s >= 50 ? "var(--color-risk-medium)" :
  s >= 30 ? "var(--color-risk-high)" : "var(--color-risk-critical)";

function IndicadoresPage() {
  const [cat, setCat] = useState<Categoria>("todos");
  const [query, setQuery] = useState("");

  const filtrados = indicadores.filter((ind) => {
    if (cat !== "todos" && ind.categoria !== cat) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return ind.nome.toLowerCase().includes(q) || ind.sigla.toLowerCase().includes(q);
    }
    return true;
  });

  const favoritos = indicadores.filter((i) => i.favorito);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 space-y-6 p-4 lg:p-6">

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                Central de <span className="text-glow text-primary">Indicadores</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Biblioteca completa de índices · métricas · scores · KPIs do agronegócio
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar indicador, sigla…"
                className="h-9 w-64 rounded-lg border border-input bg-secondary/50 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Favoritos */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Indicadores-chave</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {favoritos.map((ind) => (
                <div key={ind.id} className="surface-card group relative overflow-hidden rounded-xl border border-border p-5 transition-all hover:border-primary/40">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{ind.sigla}</p>
                      <p className="mt-1 text-2xl font-bold tracking-tight">{ind.valor}
                        <span className="ml-1 text-sm font-medium text-muted-foreground">{ind.unidade}</span>
                      </p>
                    </div>
                    <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-xs ${ind.variacao >= 0 ? "bg-primary/15 text-primary" : "bg-risk-critical/15 text-risk-critical"}`}>
                      {ind.variacao >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {ind.variacao >= 0 ? "+" : ""}{ind.variacao}%
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold">{ind.nome}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{ind.fonte}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Filtro de categoria */}
          <div className="flex flex-wrap gap-2">
            {(Object.entries(categoriasConfig) as [Categoria, typeof categoriasConfig[keyof typeof categoriasConfig]][]).map(([key, conf]) => {
              const Icone = conf.icon;
              return (
                <button
                  key={key}
                  onClick={() => setCat(key)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                    cat === key ? "border-primary/60 bg-primary/15 text-primary" : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icone className="h-3.5 w-3.5" /> {conf.label}
                </button>
              );
            })}
          </div>

          {/* Grid de indicadores */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtrados.map((ind) => {
              const CatIcone = categoriasConfig[ind.categoria].icon;
              return (
                <div
                  key={ind.id}
                  className="surface-card group rounded-xl border border-border p-4 transition-all hover:border-primary/40 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    {/* Score circular pequeno */}
                    <div className="relative shrink-0" style={{ width: 52, height: 52 }}>
                      <svg width={52} height={52} className="-rotate-90">
                        <circle cx={26} cy={26} r={21} fill="none" stroke="var(--color-secondary)" strokeWidth={5} />
                        <circle
                          cx={26} cy={26} r={21} fill="none"
                          stroke={scoreColor(ind.score)} strokeWidth={5} strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 21}
                          strokeDashoffset={2 * Math.PI * 21 - (ind.score / 100) * 2 * Math.PI * 21}
                          style={{ filter: `drop-shadow(0 0 4px ${scoreColor(ind.score)})` }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-[11px] font-bold" style={{ color: scoreColor(ind.score) }}>{ind.score}</span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <CatIcone className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{ind.sigla}</span>
                        </div>
                        <span className={`flex items-center gap-0.5 font-mono text-[11px] ${ind.variacao >= 0 ? "text-risk-low" : "text-risk-critical"}`}>
                          {ind.variacao >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {Math.abs(ind.variacao)}%
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-semibold">{ind.nome}</p>
                      <p className="mt-0.5 font-mono text-xl font-bold text-foreground">
                        {ind.valor} <span className="text-xs font-normal text-muted-foreground">{ind.unidade}</span>
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{ind.descricao}</p>
                      <p className="mt-1 font-mono text-[10px] text-muted-foreground/60">Fonte: {ind.fonte}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtrados.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <BarChart3 className="mb-3 h-10 w-10 opacity-30" />
              <p className="text-sm">Nenhum indicador encontrado com os filtros atuais.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

