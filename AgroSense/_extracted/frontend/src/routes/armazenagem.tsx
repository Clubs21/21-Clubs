import { createFileRoute } from "@tanstack/react-router";
import { Warehouse, TrendingUp, TrendingDown, MapPin, Package, DollarSign, BarChart3 } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from "recharts";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { CircularIndicator } from "@/components/dashboard/CircularIndicator";

export const Route = createFileRoute("/armazenagem")({
  head: () => ({
    meta: [
      { title: "Armazenagem — AgroSense" },
      { name: "description", content: "Dashboard de armazenagem: silos, capacidade regional e projeção de ganho." },
    ],
  }),
  component: ArmazenagemPage,
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

const capacidadeRegional = [
  { estado: "MT", total: 48.2, ocupado: 34.1, livre: 14.1 },
  { estado: "PR", total: 38.6, ocupado: 31.2, livre: 7.4 },
  { estado: "RS", total: 29.4, ocupado: 22.8, livre: 6.6 },
  { estado: "GO", total: 22.1, ocupado: 15.4, livre: 6.7 },
  { estado: "MS", total: 18.8, ocupado: 11.9, livre: 6.9 },
  { estado: "MG", total: 14.2, ocupado: 9.8, livre: 4.4 },
  { estado: "BA", total: 10.4, ocupado: 6.2, livre: 4.2 },
];

const projecaoGanho = [
  { m: "Out", ganho: 4.2 }, { m: "Nov", ganho: 5.8 }, { m: "Dez", ganho: 7.4 },
  { m: "Jan", ganho: 9.1 }, { m: "Fev", ganho: 11.3 }, { m: "Mar", ganho: 13.8 },
];

const custosArm = [
  { m: "Jan", custo: 2.8 }, { m: "Fev", custo: 2.6 }, { m: "Mar", custo: 2.9 },
  { m: "Abr", custo: 3.1 }, { m: "Mai", custo: 3.4 }, { m: "Jun", custo: 3.2 },
];

const silos = [
  { nome: "Coodetec MT", tipo: "Cooperativa", capacidade: 820, ocupacao: 78, custo: "R$ 2,80/sc/mês", estado: "MT" },
  { nome: "Coamo PR", tipo: "Cooperativa", capacidade: 640, ocupacao: 91, custo: "R$ 3,10/sc/mês", estado: "PR" },
  { nome: "Terminal Rondonópolis", tipo: "Privado", capacidade: 480, ocupacao: 65, custo: "R$ 2,40/sc/mês", estado: "MT" },
  { nome: "Bunge Armazéns", tipo: "Exportadora", capacidade: 390, ocupacao: 82, custo: "R$ 2,60/sc/mês", estado: "PR" },
  { nome: "Agrex Goiás", tipo: "Privado", capacidade: 280, ocupacao: 54, custo: "R$ 2,20/sc/mês", estado: "GO" },
];

const occupancyColor = (v: number) =>
  v >= 90 ? "var(--color-risk-critical)" :
  v >= 75 ? "var(--color-risk-medium)" :
  "var(--color-primary)";

function ArmazenagemPage() {
  const totalCapacidade = capacidadeRegional.reduce((s, r) => s + r.total, 0);
  const totalOcupado = capacidadeRegional.reduce((s, r) => s + r.ocupado, 0);
  const ocupacaoGeral = Math.round((totalOcupado / totalCapacidade) * 100);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 space-y-6 p-4 lg:p-6">

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                Dashboard de <span className="text-glow text-primary">Armazenagem</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Silos · capacidade · ocupação regional · projeção de ganho · Safra 2025/26
              </p>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="Capacidade estática total" value="181,7" unit="Mt" delta={2.4} icon={Warehouse} spark={[165,168,171,174,177,180,182]} />
            <KpiCard label="Déficit de armazenagem" value="28,4" unit="Mt" delta={-5.1} icon={Package} spark={[38,36,35,33,31,30,28]} />
            <KpiCard label="Custo médio/saca/mês" value="R$ 2,74" unit="" delta={3.8} icon={DollarSign} spark={[2.4,2.5,2.5,2.6,2.7,2.7,2.7]} />
            <KpiCard label="Ganho médio ao armazenar" value="R$ 8,40" unit="/saca" delta={12.3} icon={TrendingUp} spark={[4.2,5.8,7.4,9.1,11.3,13.8,8.4]} />
          </div>

          {/* Ocupação Geral + Capacidade Regional */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="surface-card flex flex-col items-center justify-center gap-4 rounded-xl border border-border p-5">
              <CircularIndicator
                value={ocupacaoGeral}
                label="Ocupação Nacional"
                sublabel={`${totalOcupado.toFixed(1)} de ${totalCapacidade.toFixed(1)} Mt`}
                color="var(--color-risk-medium)"
              />
              <div className="grid grid-cols-2 gap-3 w-full text-center">
                <div className="rounded-lg border border-border bg-secondary/30 p-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Livre</p>
                  <p className="mt-1 text-lg font-bold text-primary">
                    {(totalCapacidade - totalOcupado).toFixed(1)} Mt
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/30 p-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Silos</p>
                  <p className="mt-1 text-lg font-bold text-foreground">4.218</p>
                </div>
              </div>
            </div>

            <div className="surface-card lg:col-span-2 rounded-xl border border-border p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Capacidade por Estado</h3>
                  <p className="font-mono text-xs text-muted-foreground">Milhões de toneladas · ocupado vs. livre</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={capacidadeRegional} margin={{ left: -18, right: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="estado" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltip} />
                  <Bar dataKey="ocupado" stackId="a" fill="var(--color-chart-3)" name="Ocupado" radius={[0,0,0,0]} />
                  <Bar dataKey="livre" stackId="a" fill="var(--color-primary)" name="Livre" opacity={0.5} radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Projeção de Ganho + Custo */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="surface-card rounded-xl border border-border p-5">
              <div className="mb-4">
                <h3 className="font-semibold">Projeção de Ganho ao Armazenar</h3>
                <p className="font-mono text-xs text-muted-foreground">R$/saca · acumulado desde colheita</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={projecaoGanho} margin={{ left: -18, right: 4 }}>
                  <defs>
                    <linearGradient id="gGanho" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltip} />
                  <Area type="monotone" dataKey="ganho" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#gGanho)" name="Ganho R$/sc" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="surface-card rounded-xl border border-border p-5">
              <div className="mb-4">
                <h3 className="font-semibold">Custo de Armazenagem</h3>
                <p className="font-mono text-xs text-muted-foreground">R$/saca/mês · média nacional</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={custosArm} margin={{ left: -20, right: 4 }}>
                  <defs>
                    <linearGradient id="gCusto" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltip} />
                  <Area type="monotone" dataKey="custo" stroke="var(--color-chart-3)" strokeWidth={2} fill="url(#gCusto)" name="Custo R$/sc/mês" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tabela de Silos */}
          <div className="surface-card rounded-xl border border-border p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Principais Unidades Armazenadoras</h3>
                <p className="font-mono text-xs text-muted-foreground">Capacidade estática e ocupação atual</p>
              </div>
              <span className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                TOP SILOS
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    <th className="py-2 pr-4">Unidade</th>
                    <th className="py-2 pr-4">Tipo</th>
                    <th className="py-2 pr-4">Estado</th>
                    <th className="py-2 pr-4">Capacidade (Kt)</th>
                    <th className="py-2 pr-4">Ocupação</th>
                    <th className="py-2">Custo</th>
                  </tr>
                </thead>
                <tbody>
                  {silos.map((s) => (
                    <tr key={s.nome} className="border-b border-border/40 transition-colors last:border-0 hover:bg-secondary/30">
                      <td className="py-3 pr-4 font-semibold">{s.nome}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{s.tipo}</td>
                      <td className="py-3 pr-4">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-primary" />{s.estado}</span>
                      </td>
                      <td className="py-3 pr-4 font-mono tabular-nums">{s.capacidade}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                            <div className="h-full rounded-full" style={{ width: `${s.ocupacao}%`, background: occupancyColor(s.ocupacao) }} />
                          </div>
                          <span className="font-mono text-[10px] tabular-nums" style={{ color: occupancyColor(s.ocupacao) }}>{s.ocupacao}%</span>
                        </div>
                      </td>
                      <td className="py-3 font-mono text-muted-foreground">{s.custo}</td>
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

