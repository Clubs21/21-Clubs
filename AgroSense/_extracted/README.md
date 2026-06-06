# AgroSense

**Business Intelligence para o Agronegócio**

O AgroSense é uma plataforma de BI que integra dados de mercado, clima, logística e cadeia produtiva para gerar análises, rankings e dashboards inteligentes. Utilizando inteligência artificial para identificar padrões e tendências, a plataforma auxilia produtores, cooperativas e empresas na tomada de decisões estratégicas baseadas em dados.

---

## Estrutura do Projeto

```
agrosense/
├── frontend/     React 19 + Vite + TanStack Router + TailwindCSS
└── backend/      Python 3.11+ + FastAPI + JWT
```

---

## Telas da Plataforma (18 telas)

| # | Tela | Rota |
|---|---|---|
| 1 | Login + 2FA | `/auth` |
| 2 | Dashboard Principal | `/` |
| 3 | Dashboard da Soja | `/soja` |
| 4 | Mapa Climático | `/mapa-climatico` |
| 5 | Dashboard Logístico | `/logistica` |
| 6 | Ranking de Transportadoras | `/transportadoras` |
| 7 | Correlações | `/correlacoes` |
| 8 | Dashboard de Risco | `/risco` |
| 9 | Previsões | `/previsoes` |
| 10 | Dashboard de Exportação | `/exportacao` |
| 11 | Dashboard de Armazenagem | `/armazenagem` |
| 12 | Central de Alertas | `/alertas` |
| 13 | Dashboard Financeiro | `/financeiro` |
| 14 | Oportunidades | `/oportunidades` |
| 15 | Cadeia Produtiva | `/cadeia` |
| 16 | Administração | `/admin` |
| 17 | Central de Indicadores | `/indicadores` |
| 18 | Dashboard Executivo | `/executivo` |

---

## Como Executar

### Backend (FastAPI)

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 8000
```

API disponível em: `http://localhost:8000`
Documentação interativa: `http://localhost:8000/docs`

### Frontend (React + Vite)

```bash
cd frontend
npm install          # ou: bun install
npm run dev          # ou: bun dev
```

Frontend disponível em: `http://localhost:5173`

---

## Usuários de Demonstração

| Empresa | Segmento | Email | Senha | Perfil |
|---|---|---|---|---|
| AgroSense (Admin) | Plataforma | `admin@agrosense.io` | `AgroSense@2026` | Acesso total |

| Coodetec Agrícola | Cooperativa | `analista@coodetec.com.br` | `Coodetec@2026` | Analista completo |
| Bom Futuro Agro | Produtor Rural | `gestor@bomfuturo.com.br` | `BomFuturo@2026` | Produção + Financeiro |
| Rumo Logística | Transportadora | `ops@rumo.com.br` | `Rumo@2026` | Logística |
| Copersucar | Trading | `trader@copersucar.com.br` | `Copersucar@2026` | Mercado + Exportação |
| Sollus Capital | Investidor | `invest@sollus.com.br` | `Sollus@2026` | Dashboard Executivo |

> **Código 2FA (demo):** `123456` — funciona para todos os usuários

---

## Stack Tecnológica

### Frontend
- React 19 + TypeScript
- Vite 7 + TanStack Router + TanStack Start
- TailwindCSS 4 — tema dark enterprise (preto + grafite + verde neon)
- Recharts — gráficos e dashboards
- Lucide React — ícones
- Fontes: Space Grotesk + JetBrains Mono

### Backend
- Python 3.11+ + FastAPI
- JWT (python-jose) — autenticação stateless
- Passlib/bcrypt — hash de senhas
- Pydantic v2 — validação de dados
- Uvicorn — servidor ASGI

---

## API Endpoints

```
POST  /api/auth/login           Login (email + senha)
POST  /api/auth/verify-2fa      Verificação 2FA → retorna JWT
GET   /api/auth/me              Dados do usuário autenticado

GET   /api/mercado/ticker       Ticker ao vivo de commodities
GET   /api/mercado/soja         Dashboard soja completo
GET   /api/mercado/kpis         KPIs de mercado

GET   /api/logistica/transportadoras   Ranking de transportadoras
GET   /api/logistica/fretes            Histórico de fretes
GET   /api/logistica/portos            Status dos portos

GET   /api/producao/safra        Dados da safra atual
GET   /api/producao/armazenagem  Capacidade estática nacional
GET   /api/producao/clima        Índices climáticos por região

GET   /api/inteligencia/scores        Scores e IGR
GET   /api/inteligencia/alertas       Alertas ativos
GET   /api/inteligencia/oportunidades Oportunidades identificadas
GET   /api/inteligencia/previsoes     Previsões estatísticas
```

---

## Identidade Visual

- **Estilo:** Futurista · Clean · Enterprise · Data-driven
- **Referências:** Bloomberg Terminal, TradingView, SAP Analytics
- **Cores:** Preto `oklch(0.16)` · Grafite · Verde escuro · Verde neon `oklch(0.82 0.23 145)`
- **Fontes:** Space Grotesk (UI) + JetBrains Mono (dados/métricas)

---

## Roadmap — Fase 2

- [ ] Integração real com CEPEA / ESALQ (webscraping)
- [ ] Integração INMET (clima em tempo real)
- [ ] CBOT via Nasdaq Data Link API
- [ ] Banco de dados PostgreSQL + ClickHouse
- [ ] Motor de IA: Prophet (previsões) + XGBoost (scores)
- [ ] WebSocket para alertas em tempo real
- [ ] Deploy: Railway (backend) + Vercel (frontend)

---

*AgroSense © 2026 — Business Intelligence para o Agronegócio*
