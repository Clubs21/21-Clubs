import { createFileRoute } from "@tanstack/react-router";
import {
  Ship, Globe, TrendingUp, TrendingDown, Anchor, DollarSign, BarChart3, Package,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RiskBadge } from "@/components/dashboard/RiskBadge";

export const Route = createFileRoute("/exportacao")({
  head: () => ({
    meta: [
      { title: "Exportação — AgroSense" },
      { name: "description", content: "Dashboard de exportação agrícola: portos, navios, fluxos comerciais e prêmio." },
    ],
  }),
  component: ExportacaoPage,
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

const monthlyExport = [
  { m: "Jan", soja: 8.2, milho: 3.1, acucar: 2.4 },
  { m: "Fev", soja: 7.8, milho: 2.9, acucar: 2.1 },
  { m: "Mar", soja: 9.4, milho: 3.8, acucar: 2.7 },
  { m: "Abr", soja: 11.2, milho: 4.2, acucar: 3.1 },
  { m: "Mai", soja: 12.8, milho: 5.1, acucar: 3.4 },
  { m: "Jun", soja: 10.4, milho: 6.3, acucar: 2.9 },
  { m: "Jul", soja: 8.9, milho: 7.1, acucar: 2.6 },
  { m: "Ago", soja: 7.2, milho: 8.4, acucar: 3.2 },
  { m: "Set", soja: 6.1, milho: 7.8, acucar: 3.8 },
];

const premioData = [
  { m: "Jan", premio: 42 }, { m: "Fev", premio: 38 }, { m: "Mar", premio: 51 },
  { m: "Abr", premio: 58 }, { m: "Mai", premio: 64 }, { m: "Jun", premio: 55 },
  { m: "Jul", premio: 49 }, { m: "Ago", premio: 61 }, { m: "Set", premio: 72 },
];

const destinos = [
  { pais: "China", volume: 38.4, share: 58, tendencia: 2.1 },
  { pais: "União Europeia", volume: 12.1, share: 18, tendencia: -0.8 },
  { pais: "Tailândia", volume: 5.2, share: 8, tendencia: 1.4 },
  { pais: "México", volume: 3.8, share: 6, tendencia: 0.9 },
  { pais: "Japão", volume: 2.4, share: 4, tendencia: -0.3 },
  { pais: "Outros", volume: 4.1, share: 6, tendencia: 0.2 },
];

const portos = [
  { nome: "Santos", estado: "SP", volume: 28.4, status: "normal" as const, fila: 12, tempo: "4h" },
  { nome: "Paranaguá", estado: "PR", volume: 18.2, status: "atenção" as const, fila: 24, tempo: "8h" },
  { nome: "São Luís", estado: "MA", volume: 9.8, status: "normal" as const, fila: 8, tempo: "2h" },
  { nome: "Rio Grande", estado: "RS", volume: 7.2, status: "crítico" as const, fila: 41, tempo: "14h" },
  { nome: "Vitória", estado: "ES", volume: 4.1, status: "normal" as const, fila: 5, tempo: "1h" },
];

const statusColor = {
  normal: "text-risk-low",
  atenção: "text-risk-medium",
  crítico: "text-risk-critical",
} as const;

const statusBadge = {
  normal: "low" as const,
  atenção: "medium" as const,
  crítico: "critical" as const,
};

function ExportacaoPage() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 space-y-6 p-4 lg:p-6">

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                Dashboard de <span className="text-glow text-primary">Exportação</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Fluxos comerciais · portos · navios · prêmio de exportação · Safra 2025/26
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-xs text-primary">LIVE · Porto de Santos</span>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="Exportações acumuladas" value="97,4" unit="Mt" delta={4.1} icon={Ship} spark={[50,54,58,60,66,70,74]} />
            <KpiCard label="Prêmio exportação" value="+72" unit="cts/bu" delta={14.3} icon={DollarSign} spark={[42,38,51,58,64,55,72]} />
            <KpiCard label="Navios aguardando" value="147" unit="navios" delta={-3.2} icon={Anchor} spark={[180,172,165,158,151,148,147]} />
            <KpiCard label="Receita exportada" value="R$ 612" unit="bi" delta={6.8} icon={TrendingUp} spark={[420,450,480,520,560,590,612]} />
          </div>

          {/* Volume exportado por mês + Prêmio */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="surface-card lg:col-span-2 rounded-xl border border-border p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Volume Exportado por Commodity</h3>
                  <p className="font-mono text-xs text-muted-foreground">Milhões de toneladas · mensal</p>
                </div>
                <div className="flex gap-3 text-xs">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-chart-1" /> Soja</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-chart-3" /> Milho</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-chart-2" /> Açúcar</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={monthlyExport} margin={{ left: -18, right: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltip} />
                  <Bar dataKey="soja" stackId="a" fill="var(--color-chart-1)" radius={[0,0,0,0]} />
                  <Bar dataKey="milho" stackId="a" fill="var(--color-chart-3)" />
                  <Bar dataKey="acucar" stackId="a" fill="var(--color-chart-2)" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="surface-card rounded-xl border border-border p-5">
              <div className="mb-4">
                <h3 className="font-semibold">Prêmio de Exportação</h3>
                <p className="font-mono text-xs text-muted-foreground">Centavos/bushel · soja Paranaguá</p>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={premioData} margin={{ left: -20, right: 4 }}>
                  <defs>
                    <linearGradient id="gPremio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltip} />
                  <Area type="monotone" dataKey="premio" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#gPremio)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Destinos + Portos */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Destinos */}
            <div className="surface-card rounded-xl border border-border p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Principais Destinos</h3>
                  <p className="font-mono text-xs text-muted-foreground">Participação no volume total exportado</p>
                </div>
                <span className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  FLUXO GLOBAL
                </span>
              </div>
              <div className="space-y-3">
                {destinos.map((d) => (
                  <div key={d.pais} className="flex items-center gap-3">
                    <div className="w-28 shrink-0">
                      <p className="text-sm font-medium">{d.pais}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">{d.volume} Mt</p>
                    </div>
                    <div className="flex-1">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${d.share}%`, opacity: 0.4 + (d.share / 100) * 0.6 }}
                        />
                      </div>
                    </div>
                    <span className="w-8 text-right font-mono text-xs tabular-nums text-muted-foreground">{d.share}%</span>
                    <span className={`flex w-10 items-center justify-end gap-0.5 font-mono text-[11px] tabular-nums ${d.tendencia >= 0 ? "text-risk-low" : "text-risk-critical"}`}>
                      {d.tendencia >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(d.tendencia)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Portos */}
            <div className="surface-card rounded-xl border border-border p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Status dos Portos</h3>
                  <p className="font-mono text-xs text-muted-foreground">Congestionamento e fila de navios</p>
                </div>
                <span className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  OPERACIONAL
                </span>
              </div>
              <div className="space-y-3">
                {portos.map((p) => (
                  <div key={p.nome} className="flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/30 p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Anchor className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold">{p.nome} <span className="font-normal text-muted-foreground">- {p.estado}</span></p>
                        <RiskBadge level={statusBadge[p.status]} label={p.status} />
                      </div>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                        {p.volume} Mt · {p.fila} navios na fila · espera ~{p.tempo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mapa de fluxos globais (visual simulado) */}
          <div className="surface-card rounded-xl border border-border p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Fluxos Comerciais Globais</h3>
                <p className="font-mono text-xs text-muted-foreground">Principais rotas de exportação do agronegócio brasileiro</p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-xs"><span className="h-2 w-5 rounded-full bg-primary opacity-80 block" /> Rota principal</span>
                <span className="flex items-center gap-1.5 text-xs"><span className="h-2 w-5 rounded-full bg-chart-3 opacity-60 block" /> Rota secundária</span>
              </div>
            </div>
            <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-lg border border-border/50 bg-secondary/20">
              <svg viewBox="0 0 800 320" className="w-full h-full opacity-80" style={{ fontFamily: "var(--font-mono)" }}>
                {/* Oceano fundo */}
                <rect width="800" height="320" fill="none" />
                {/* Brasil */}
                <ellipse cx="260" cy="185" rx="50" ry="70" fill="var(--color-forest)" opacity="0.5" />
                <text x="260" y="188" textAnchor="middle" fontSize="10" fill="var(--color-primary)" fontWeight="bold">BRASIL</text>
                {/* China */}
                <ellipse cx="680" cy="130" rx="55" ry="40" fill="var(--color-secondary)" opacity="0.6" />
                <text x="680" y="133" textAnchor="middle" fontSize="10" fill="var(--color-foreground)">CHINA</text>
                {/* Europa */}
                <ellipse cx="430" cy="80" rx="45" ry="30" fill="var(--color-secondary)" opacity="0.5" />
                <text x="430" y="83" textAnchor="middle" fontSize="10" fill="var(--color-foreground)">EUROPA</text>
                {/* EUA */}
                <ellipse cx="160" cy="100" rx="40" ry="28" fill="var(--color-secondary)" opacity="0.4" />
                <text x="160" y="103" textAnchor="middle" fontSize="10" fill="var(--color-foreground)">EUA</text>
                {/* Rotas - Brasil → China */}
                <path d="M 305 175 Q 480 20 625 135" fill="none" stroke="var(--color-chart-1)" strokeWidth="3" strokeOpacity="0.85" strokeDasharray="8 4" />
                <circle cx="625" cy="135" r="5" fill="var(--color-chart-1)" opacity="0.9" />
                {/* Brasil → Europa */}
                <path d="M 295 165 Q 350 90 388 88" fill="none" stroke="var(--color-chart-3)" strokeWidth="2" strokeOpacity="0.7" strokeDasharray="6 4" />
                <circle cx="388" cy="88" r="4" fill="var(--color-chart-3)" opacity="0.8" />
                {/* Labels volumes */}
                <text x="490" y="55" textAnchor="middle" fontSize="9" fill="var(--color-chart-1)">58% · 38,4 Mt</text>
                <text x="345" y="108" textAnchor="middle" fontSize="9" fill="var(--color-chart-3)">18% · 12,1 Mt</text>
                {/* Portos de origem */}
                <circle cx="262" cy="205" r="4" fill="var(--color-primary)" />
                <text x="262" y="222" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Santos</text>
                <circle cx="248" cy="215" r="3" fill="var(--color-primary)" opacity="0.7" />
                <text x="248" y="230" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Paranaguá</text>
              </svg>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

