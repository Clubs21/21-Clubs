import { createFileRoute } from "@tanstack/react-router";
import {
  Settings, Users, Database, Globe, Shield, RefreshCw, CheckCircle2,
  XCircle, Clock, Plus, Trash2, Edit2, Eye, EyeOff, Activity,
} from "lucide-react";
import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";
import { RiskBadge } from "@/components/dashboard/RiskBadge";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administração — AgroSense" },
      { name: "description", content: "Tela administrativa: fontes de dados, APIs, usuários, permissões e atualizações." },
    ],
  }),
  component: AdminPage,
});

const fontes = [
  { nome: "CEPEA / ESALQ", tipo: "API REST", status: "ativo", ultima: "há 4 min", frequencia: "5 min", registros: "84.200" },
  { nome: "CONAB", tipo: "Web Scraping", status: "ativo", ultima: "há 1h", frequencia: "1h", registros: "12.400" },
  { nome: "IBGE — Safras", tipo: "API REST", status: "ativo", ultima: "há 30 min", frequencia: "30 min", registros: "38.100" },
  { nome: "INMET", tipo: "API REST", status: "ativo", ultima: "há 8 min", frequencia: "15 min", registros: "204.800" },
  { nome: "CBOT (Quandl)", tipo: "API REST", status: "ativo", ultima: "há 1 min", frequencia: "1 min", registros: "1.240.000" },
  { nome: "Banco Central", tipo: "API REST", status: "ativo", ultima: "há 2 min", frequencia: "5 min", registros: "18.600" },
  { nome: "ANTT — Fretes", tipo: "Web Scraping", status: "erro", ultima: "há 3h", frequencia: "2h", registros: "5.400" },
  { nome: "Ministério Agricultura", tipo: "FTP", status: "inativo", ultima: "há 2d", frequencia: "Diário", registros: "22.100" },
];

const usuarios = [
  { nome: "Rodrigo Mendes", email: "rodrigo@AgroSense.io", perfil: "Admin", status: "ativo", ultimo: "agora" },
  { nome: "Ana Cavalcanti", email: "ana@coodetec.com.br", perfil: "Analista", status: "ativo", ultimo: "há 2h" },
  { nome: "Carlos Ferreira", email: "carlos@copersucar.com.br", perfil: "Viewer", status: "ativo", ultimo: "há 1d" },
  { nome: "Fernanda Lima", email: "fernanda@AgroSense.io", perfil: "Analista", status: "ativo", ultimo: "há 3h" },
  { nome: "Paulo Silveira", email: "paulo@trading.com.br", perfil: "Viewer", status: "inativo", ultimo: "há 8d" },
];

const perfis = {
  Admin: "bg-primary/15 text-primary border-primary/30",
  Analista: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  Viewer: "bg-secondary text-muted-foreground border-border",
} as const;

function AdminPage() {
  const [aba, setAba] = useState<"fontes" | "usuarios" | "apis">("fontes");

  const ativas = fontes.filter((f) => f.status === "ativo").length;
  const erros = fontes.filter((f) => f.status === "erro").length;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 space-y-6 p-4 lg:p-6">

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                Tela <span className="text-glow text-primary">Administrativa</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Fontes de dados · APIs · usuários · permissões · atualizações do sistema
              </p>
            </div>
          </div>

          {/* KPIs rápidos */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="surface-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary"><Database className="h-5 w-5" /></div>
                <span className="font-mono text-2xl font-bold text-primary">{ativas}</span>
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Fontes ativas</p>
            </div>
            <div className="surface-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-risk-critical/15 text-risk-critical"><XCircle className="h-5 w-5" /></div>
                <span className="font-mono text-2xl font-bold text-risk-critical">{erros}</span>
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Com erros</p>
            </div>
            <div className="surface-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground"><Users className="h-5 w-5" /></div>
                <span className="font-mono text-2xl font-bold">{usuarios.filter((u) => u.status === "ativo").length}</span>
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Usuários ativos</p>
            </div>
            <div className="surface-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/15 text-chart-2"><Activity className="h-5 w-5" /></div>
                <span className="font-mono text-2xl font-bold text-chart-2">2,1 M</span>
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Registros hoje</p>
            </div>
          </div>

          {/* Abas */}
          <div className="surface-card rounded-xl border border-border">
            <div className="flex gap-1 border-b border-border p-2">
              {(["fontes", "usuarios", "apis"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setAba(t)}
                  className={`rounded-lg px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                    aba === t ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t === "fontes" ? "Fontes de Dados" : t === "usuarios" ? "Usuários" : "Configurações de API"}
                </button>
              ))}
            </div>

            <div className="p-5">
              {aba === "fontes" && (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-mono text-xs text-muted-foreground">{fontes.length} fontes configuradas</p>
                    <button className="flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-primary hover:border-primary hover:bg-primary/20 transition-colors">
                      <Plus className="h-3.5 w-3.5" /> Nova fonte
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-border text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          <th className="py-2 pr-4">Fonte</th>
                          <th className="py-2 pr-4">Tipo</th>
                          <th className="py-2 pr-4">Status</th>
                          <th className="py-2 pr-4">Última atualização</th>
                          <th className="py-2 pr-4">Frequência</th>
                          <th className="py-2 pr-4">Registros</th>
                          <th className="py-2">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fontes.map((f) => (
                          <tr key={f.nome} className="border-b border-border/40 transition-colors last:border-0 hover:bg-secondary/30">
                            <td className="py-3 pr-4 font-semibold">{f.nome}</td>
                            <td className="py-3 pr-4 text-muted-foreground">{f.tipo}</td>
                            <td className="py-3 pr-4">
                              <span className={`flex items-center gap-1.5 font-mono text-[10px] ${
                                f.status === "ativo" ? "text-risk-low" : f.status === "erro" ? "text-risk-critical" : "text-muted-foreground"
                              }`}>
                                {f.status === "ativo" ? <CheckCircle2 className="h-3.5 w-3.5" /> : f.status === "erro" ? <XCircle className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                                {f.status}
                              </span>
                            </td>
                            <td className="py-3 pr-4 font-mono text-muted-foreground">{f.ultima}</td>
                            <td className="py-3 pr-4 font-mono text-muted-foreground">{f.frequencia}</td>
                            <td className="py-3 pr-4 font-mono tabular-nums">{f.registros}</td>
                            <td className="py-3">
                              <div className="flex items-center gap-1">
                                <button className="rounded p-1 text-muted-foreground hover:text-primary transition-colors"><RefreshCw className="h-3.5 w-3.5" /></button>
                                <button className="rounded p-1 text-muted-foreground hover:text-foreground transition-colors"><Edit2 className="h-3.5 w-3.5" /></button>
                                <button className="rounded p-1 text-muted-foreground hover:text-risk-critical transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {aba === "usuarios" && (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-mono text-xs text-muted-foreground">{usuarios.length} usuários cadastrados</p>
                    <button className="flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-primary hover:border-primary hover:bg-primary/20 transition-colors">
                      <Plus className="h-3.5 w-3.5" /> Convidar usuário
                    </button>
                  </div>
                  <div className="space-y-3">
                    {usuarios.map((u) => (
                      <div key={u.email} className="flex flex-wrap items-center gap-4 rounded-lg border border-border/60 bg-secondary/30 p-3 transition-colors hover:border-primary/30">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[image:var(--gradient-neon)] text-xs font-bold text-neon-foreground">
                          {u.nome.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold">{u.nome}</p>
                          <p className="font-mono text-xs text-muted-foreground">{u.email}</p>
                        </div>
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium ${perfis[u.perfil as keyof typeof perfis]}`}>
                          <Shield className="mr-1 h-3 w-3" /> {u.perfil}
                        </span>
                        <span className={`font-mono text-[10px] ${u.status === "ativo" ? "text-risk-low" : "text-muted-foreground"}`}>
                          {u.ultimo}
                        </span>
                        <div className="flex items-center gap-1">
                          <button className="rounded p-1 text-muted-foreground hover:text-foreground transition-colors"><Edit2 className="h-3.5 w-3.5" /></button>
                          <button className="rounded p-1 text-muted-foreground hover:text-risk-critical transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {aba === "apis" && (
                <div className="space-y-4">
                  {[
                    { label: "Chave API CEPEA", valor: "sk-cepea-••••••••••••••••••••••••6f2a", ativa: true },
                    { label: "Chave API INMET", valor: "sk-inmet-••••••••••••••••••••••••9b1c", ativa: true },
                    { label: "Token CBOT / Nasdaq Data", valor: "qdl_••••••••••••••••••••••••••••••••3d8e", ativa: true },
                    { label: "API Banco Central (Open Data)", valor: "Pública — sem autenticação", ativa: true },
                    { label: "Webhook de Alertas", valor: "https://hooks.AgroSense.io/••••••••••••", ativa: false },
                  ].map((api) => (
                    <div key={api.label} className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-secondary/20 p-4">
                      <Globe className="h-4 w-4 shrink-0 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">{api.label}</p>
                        <p className="mt-0.5 font-mono text-sm text-foreground">{api.valor}</p>
                      </div>
                      <span className={`font-mono text-[10px] ${api.ativa ? "text-risk-low" : "text-muted-foreground"}`}>
                        {api.ativa ? "● Ativa" : "○ Inativa"}
                      </span>
                      <button className="rounded p-1.5 text-muted-foreground hover:text-foreground transition-colors border border-border bg-secondary/50">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

