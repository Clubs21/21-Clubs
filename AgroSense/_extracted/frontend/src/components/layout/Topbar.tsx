import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Bell, ChevronDown, Activity, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-xl lg:px-6">
      <div className="flex items-center gap-2 lg:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[image:var(--gradient-neon)]">
          <Activity className="h-4 w-4 text-neon-foreground" />
        </div>
        <span className="font-bold">AgroSense</span>
      </div>

      <div className="relative hidden flex-1 max-w-md md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Buscar ativos, regiões, indicadores…"
          className="h-9 w-full rounded-lg border border-input bg-secondary/50 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-xs text-primary">LIVE · Mercado aberto</span>
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-risk-critical" />
        </Button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-2 py-1.5 hover:bg-secondary"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[image:var(--gradient-neon)] text-xs font-bold text-neon-foreground">
              AL
            </div>
            <span className="hidden text-sm font-medium sm:block">Analista</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-surface-card p-1 shadow-xl animate-fade-in">
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Perfil</span>
              </div>
              <Link
                to="/auth"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
              >
                <LogOut className="h-4 w-4 text-primary" />
                <span>Sair</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

