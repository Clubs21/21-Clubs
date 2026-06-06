import { createFileRoute } from "@tanstack/react-router";
import {
  DollarSign, TrendingUp, TrendingDown, Wallet, BarChart3, ArrowUpRight, ArrowDownRight, Calculator,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line,
  ComposedChart, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { CircularIndicator } from "@/components/dashboard/CircularIndicator";

export const Route = createFileRoute("/financeiro")({
  head: () => ({
    meta: [
      { title: "Financeiro — AgroSense" },
      { name: "description", content: "Dashboard financeiro: margem, custo por hectare, break-even e fluxo de caixa." },
    ],
  }),
  component: FinanceiroPage,
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

const fluxoCaixa = [
  { m: "Jan", entrada: 820, saida: 610, saldo: 210 },
  { m: "Fev", entrada: 640, saida: 720, saldo: -80 },
  { m: "Mar", entrada: 910, saida: 680, saldo: 230 },
  { m: "Abr", entrada: 1240, saida: 740, saldo: 500 },
  { m: "Mai", entrada: 1580, saida: 820, saldo: 760 },
  { m: "Jun", entrada: 1320, saida: 890, saldo: 430 },
  { m: "Jul", entrada: 980, saida: 750, saldo: 230 },
  { m: "Ago", entrada: 860, saida: 680, saldo: 180 },
  { m: "Set", entrada: 740, saida: 620, saldo: 120 },
];

const custoPorInsumo = [
  { item: "Fertilizantes", valor: 42 },
  { item: "Defensivos", valor: 22 },
  { item: "Sementes", valor: 14 },
  { item: "Combustível", valor: 11 },
  { item: "M. de obra", valor: 7 },
  { item: "Outros", valor: 4 },
];

const margemHistorica = [
  { ano: "2021", margem: 18 }, { ano: "2022", margem: 24 },
  { ano: "2023", margem: 16 }, { ano: "2024", margem: 21 },
  { ano: "2025", margem: 28 }, { ano: "2026e", margem: 31 },
];

const breakEvenData = [
  { preco: 120, lucro: -18 }, { preco: 130, lucro: -10 }, { preco: 140, lucro: -2 },
  { preco: 145, lucro: 3 }, { preco: 150, lucro: 8 }, { preco: 160, lucro: 18 },
  { preco: 170, lucro: 28 }, { preco: 180, lucro: 38 },
];

const culturas = [
  { nome: "Soja", custo: 4840, receita: 7200, margem: 33, breakEven: 141 },
  { nome: "Milho 2ª", custo: 2180, receita: 3120, margem: 30, breakEven: 58 },
  { nome: "Algodão", custo: 8200, receita: 10800, margem: 24, breakEven: 3.8 },
  { nome: "Trigo", custo: 1920, receita: 2350, margem: 18, breakEven: 72 },
];

function FinanceiroPage() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 space-y-6 p-4 lg:p-6">

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                Dashboard <span className="text-glow text-primary">Financeiro</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Margem · custo/ha · break-even · fluxo de caixa · custo/saca · Safra 2025/26
              </p>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="Custo médio/ha" value="R$ 4.840" unit="" delta={6.2} icon={BarChart3} spark={[4100,4250,4400,4520,4640,4780,4840]} />
            <KpiCard label="Margem bruta média" value="31%" unit="" delta={4.8} icon={TrendingUp} spark={[18,24,16,21,28,31,31]} />
            <KpiCard label="Break-even soja" value="R$ 141" unit="/sc" delta={3.1} icon={Calculator} spark={[128,131,134,137,139,140,141]} />
            <KpiCard label="Saldo de caixa" value="R$ 2,37" unit="bi" delta={-8.4} icon={Wallet} spark={[2.8,2.6,2.5,2.4,2.5,2.4,2.4]} />
          </div>

          {/* Fluxo de caixa + Margem histórica */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="surface-card lg:col-span-2 rounded-xl border border-border p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Fluxo de Caixa</h3>
                  <p className="font-mono text-xs text-muted-foreground">R$ milhões · entradas, saídas e saldo mensal</p>
                </div>
                <div className="flex gap-3 text-xs">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-chart-1" /> Entrada</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-risk-critical" /> Saída</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={fluxoCaixa} margin={{ left: -10, right: 4 }}>
                  <defs>
                    <linearGradient id="gEntrada" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltip} />
                  <ReferenceLine y={0} stroke="var(--color-border)" strokeDasharray="4 2" />
                  <Area type="monotone" dataKey="entrada" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#gEntrada)" name="Entrada" />
                  <Bar dataKey="saida" fill="var(--color-risk-critical)" opacity={0.5} radius={[3,3,0,0]} name="Saída" />
                  <Line type="monotone" dataKey="saldo" stroke="var(--color-chart-3)" strokeWidth={2} dot={{ r: 3, fill: "var(--color-chart-3)" }} name="Saldo" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="surface-card rounded-xl border border-border p-5">
              <div className="mb-4">
                <h3 className="font-semibold">Margem Histórica</h3>
                <p className="font-mono text-xs text-muted-foreground">Margem bruta média por safra</p>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={margemHistorica} margin={{ left: -20, right: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="ano" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} unit="%" />
                  <Tooltip {...tooltip} />
                  <Bar dataKey="margem" fill="var(--color-primary)" opacity={0.8} radius={[4,4,0,0]} name="Margem %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Break-even + Custo por insumo */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="surface-card rounded-xl border border-border p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Análise de Break-Even</h3>
                  <p className="font-mono text-xs text-muted-foreground">Soja · lucro/ha por preço de venda</p>
                </div>
                <span className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  SIMULAÇÃO
                </span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={breakEvenData} margin={{ left: -14, right: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="preco" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} unit="/sc" />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltip} />
                  <ReferenceLine y={0} stroke="var(--color-primary)" strokeWidth={2} strokeDasharray="6 3" label={{ value: "Break-even", fill: "var(--color-primary)", fontSize: 10, position: "insideTopRight" }} />
                  <Bar dataKey="lucro" name="Lucro R$/ha" radius={[3,3,0,0]}
                    fill="var(--color-chart-1)"
                    label={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2">
                <Calculator className="h-4 w-4 text-primary shrink-0" />
                <p className="font-mono text-xs text-foreground">Break-even atual: <span className="text-primary font-bold">R$ 141/saca</span> · preço corrente: <span className="text-primary">R$ 172/sc</span> → margem de R$ 31/sc</p>
              </div>
            </div>

            <div className="surface-card rounded-xl border border-border p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Custo por Insumo</h3>
                  <p className="font-mono text-xs text-muted-foreground">Participação percentual no CPV</p>
                </div>
              </div>
              <div className="space-y-3">
                {custoPorInsumo.map((c) => (
                  <div key={c.item} className="flex items-center gap-3">
                    <span className="w-28 shrink-0 text-sm">{c.item}</span>
                    <div className="flex-1">
                      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${c.valor}%`, opacity: 0.4 + (c.valor / 50) * 0.6 }} />
                      </div>
                    </div>
                    <span className="w-8 text-right font-mono text-xs tabular-nums text-muted-foreground">{c.valor}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabela por cultura */}
          <div className="surface-card rounded-xl border border-border p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Análise por Cultura</h3>
                <p className="font-mono text-xs text-muted-foreground">Custo, receita estimada, margem e break-even</p>
              </div>
              <span className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                MULTI-CULTURA
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    <th className="py-2 pr-6">Cultura</th>
                    <th className="py-2 pr-6">Custo/ha</th>
                    <th className="py-2 pr-6">Receita estimada/ha</th>
                    <th className="py-2 pr-6">Margem bruta</th>
                    <th className="py-2">Break-even</th>
                  </tr>
                </thead>
                <tbody>
                  {culturas.map((c) => (
                    <tr key={c.nome} className="border-b border-border/40 transition-colors last:border-0 hover:bg-secondary/30">
                      <td className="py-3 pr-6 font-semibold">{c.nome}</td>
                      <td className="py-3 pr-6 font-mono tabular-nums text-muted-foreground">R$ {c.custo.toLocaleString("pt-BR")}</td>
                      <td className="py-3 pr-6 font-mono tabular-nums">
                        <span className="flex items-center gap-1 text-primary">
                          <ArrowUpRight className="h-3.5 w-3.5" /> R$ {c.receita.toLocaleString("pt-BR")}
                        </span>
                      </td>
                      <td className="py-3 pr-6">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${c.margem}%` }} />
                          </div>
                          <span className={`font-mono text-xs font-bold ${c.margem >= 25 ? "text-risk-low" : c.margem >= 20 ? "text-risk-medium" : "text-risk-high"}`}>
                            {c.margem}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 font-mono tabular-nums text-muted-foreground">
                        R$ {c.breakEven}{c.nome === "Algodão" ? "/@ " : c.nome === "Milho 2ª" ? "/sc" : "/sc"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

