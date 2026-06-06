import { createFileRoute } from "@tanstack/react-router";
import { Sprout, DollarSign, Download, Filter, Ship, Truck } from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { RadarPanel } from "@/components/dashboard/RadarPanel";
import { Heatmap } from "@/components/dashboard/Heatmap";
import { AnalyticsTable } from "@/components/dashboard/AnalyticsTable";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { CircularIndicator } from "@/components/dashboard/CircularIndicator";
import { MarketTicker } from "@/components/dashboard/MarketTicker";
import { BrazilMap } from "@/components/dashboard/BrazilMap";
import { WeatherPanel } from "@/components/dashboard/WeatherPanel";
import { LogisticsPanel } from "@/components/dashboard/LogisticsPanel";
import { ExportPanel } from "@/components/dashboard/ExportPanel";
import { MarketTimeline } from "@/components/dashboard/MarketTimeline";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgroSense — Plataforma de Inteligência Agrícola" },
      {
        name: "description",
        content:
          "Plataforma enterprise de inteligência analítica para o agronegócio: KPIs, risco, mercado e geoanálise em tempo real.",
      },
      { property: "og:title", content: "AgroSense" },
      {
        property: "og:description",
        content: "Inteligência analítica premium para o agronegócio.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 space-y-6 p-4 lg:p-6">
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                Visão Geral <span className="text-glow text-primary">Setorial</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Inteligência analítica em tempo real · Safra 2025/26
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="premium" size="sm">
                <Filter className="h-4 w-4" /> Filtros
              </Button>
              <Button variant="neon" size="sm">
                <Download className="h-4 w-4" /> Exportar
              </Button>
            </div>
          </div>

          {/* Live market ticker */}
          <MarketTicker />

          {/* KPIs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="Produção total" value="284,6" unit="Mt" delta={3.2} icon={Sprout} spark={[40, 44, 42, 50, 55, 53, 62]} />
            <KpiCard label="Receita projetada" value="R$ 1,84" unit="tri" delta={5.7} icon={DollarSign} spark={[30, 38, 36, 45, 52, 60, 68]} />
            <KpiCard label="Exportações" value="97,4" unit="Mt" delta={4.1} icon={Ship} spark={[50, 54, 58, 60, 66, 70, 74]} />
            <KpiCard label="Frete médio" value="R$ 312" unit="/t" delta={3.1} icon={Truck} spark={[28, 30, 33, 31, 36, 38, 41]} />
          </div>

          {/* Map + Risk + Weather */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <BrazilMap />
            </div>
            <div className="surface-card flex flex-col items-center justify-center gap-2 rounded-xl border border-border p-5">
              <CircularIndicator value={34} label="Índice Geral de Risco" sublabel="safra 2025/26" color="var(--color-risk-medium)" />
            </div>
          </div>

          {/* Trend + Radar */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TrendChart />
            </div>
            <RadarPanel />
          </div>

          {/* Weather + Logistics + Export */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <WeatherPanel />
            <LogisticsPanel />
            <ExportPanel />
          </div>

          {/* Scores + Heatmap */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="surface-card flex items-center justify-around gap-4 rounded-xl border border-border p-5">
              <CircularIndicator value={88} label="Sustentabilidade" sublabel="ESG composto" />
              <CircularIndicator value={71} label="Solvência" sublabel="crédito rural" color="var(--color-risk-medium)" />
            </div>
            <div className="lg:col-span-2">
              <Heatmap />
            </div>
          </div>

          {/* Table + Timeline + Alerts */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <AnalyticsTable />
            </div>
            <MarketTimeline />
          </div>

          <AlertsPanel />

        </main>
      </div>
    </div>
  );
}

