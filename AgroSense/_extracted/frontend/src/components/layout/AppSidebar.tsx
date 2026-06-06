import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Sprout, LineChart, ShieldAlert, Droplets,
  Truck, Ship, Warehouse, Bell, Wallet, GitBranch,
  Settings, Radar, Library, BarChart3, Star,
} from "lucide-react";

const sections = [
  {
    label: "Principal",
    items: [
      { title: "Visão Geral", url: "/", icon: LayoutDashboard },
      { title: "Dashboard Executivo", url: "/executivo", icon: Star },
    ],
  },
  {
    label: "Mercado & Produção",
    items: [
      { title: "Mercado / Soja", url: "/soja", icon: Sprout },
      { title: "Financeiro", url: "/financeiro", icon: Wallet },
      { title: "Previsões", url: "/previsoes", icon: LineChart },
      { title: "Correlações", url: "/correlacoes", icon: Radar },
    ],
  },
  {
    label: "Operações",
    items: [
      { title: "Clima & Mapa", url: "/mapa-climatico", icon: Droplets },
      { title: "Logística", url: "/logistica", icon: Truck },
      { title: "Transportadoras", url: "/transportadoras", icon: Truck },
      { title: "Armazenagem", url: "/armazenagem", icon: Warehouse },
      { title: "Exportação", url: "/exportacao", icon: Ship },
    ],
  },
  {
    label: "Inteligência",
    items: [
      { title: "Risco & Scores", url: "/risco", icon: ShieldAlert },
      { title: "Cadeia Produtiva", url: "/cadeia", icon: GitBranch },
      { title: "Oportunidades", url: "/oportunidades", icon: BarChart3 },
      { title: "Alertas", url: "/alertas", icon: Bell },
      { title: "Indicadores", url: "/indicadores", icon: Library },
    ],
  },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[image:var(--gradient-neon)] glow-ring">
          <Sprout className="h-5 w-5 text-neon-foreground" />
        </div>
        <div className="leading-tight">
          <p className="font-bold tracking-tight text-sidebar-foreground">AgroSense</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Intelligence</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-4 px-3 py-2 pb-4">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = path === item.url;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      active
                        ? "bg-sidebar-accent text-primary shadow-[inset_2px_0_0_var(--color-primary)]"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                    }`}
                  >
                    <item.icon
                      className={`h-4 w-4 transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}
                    />
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Settings */}
      <div className="border-t border-sidebar-border p-3">
        <Link
          to="/admin"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            path === "/admin" ? "bg-sidebar-accent text-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60"
          }`}
        >
          <Settings className="h-4 w-4" />
          Administração
        </Link>
      </div>
    </aside>
  );
}

