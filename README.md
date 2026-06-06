# Sensagro — Plataforma de Inteligência para o Agronegócio

---

## Equipe

**Nome da equipe:** Sensagro Dev Team

| Integrante | Função |
|---|---|
| Guilherme Rannov | Programador |
| Cassiano Pommer | Programador |
| Gustavo Traesel | Designer |
| Wagner Prochnow | Negócios |
| Antony Kautzmann | Negócios |

---

## Escopo do Projeto

### Problema

Produtores rurais de médio e grande porte tomam decisões críticas — como **quando vender a soja, qual rota de transporte usar e onde armazenar a safra** — sem acesso consolidado a dados de mercado, clima, logística e custo de produção. Essa fragmentação de informação resulta em perda de margem, exposição a riscos climáticos e logísticos e decisões reativas em vez de estratégicas.

### Solução Proposta

O **Sensagro** é uma plataforma de Business Intelligence voltada ao agronegócio que centraliza, analisa e apresenta os indicadores necessários para a tomada de decisão na cadeia produtiva da soja e do milho. A plataforma:

- **Personaliza a análise por produtor**: cada usuário vê apenas os dados da sua propriedade, sem cruzamento com informações de terceiros.
- **Gera uma recomendação de decisão** (ex.: *AGUARDAR* ou *VENDER AGORA*) com base em um fluxo de análise passo a passo que considera preço de mercado, custo de produção, frete, risco climático e capacidade de armazenagem.
- **Rastreia o impacto dos documentos enviados**: o produtor envia laudos técnicos, contratos de armazenagem e relatórios climáticos, e o sistema mostra como cada documento alterou seus scores e métricas.
- **Apresenta fontes oficiais** (CONAB, INMET, ANTT, CEPEA/ESALQ, Embrapa, CME Group, Banco Central) abaixo de cada indicador, garantindo rastreabilidade.

---

## Stack Tecnológica

### Frontend

| Categoria | Tecnologia | Versão |
|---|---|---|
| Linguagem | TypeScript | 5.8 |
| Framework UI | React | 19.2 |
| Framework de rotas + SSR | TanStack Start / TanStack Router | 1.167–1.168 |
| Bundler | Vite | 7.3 |
| Runtime (dev) | Bun | latest |
| Estilização | Tailwind CSS v4 | 4.2 |
| Componentes base | Radix UI (Primitives) | vários |
| Gráficos | Recharts | 2.15 |
| Ícones | Lucide React | 0.575 |
| Formulários | React Hook Form + Zod | 7.71 / 3.24 |
| State / Data fetching | TanStack Query | 5.83 |
| Notificações toast | Sonner | 2.0 |
| Linting / Format | ESLint + Prettier | 9 / 3.7 |

### Backend

| Categoria | Tecnologia | Versão |
|---|---|---|
| Linguagem | Python | 3.12 |
| Framework API | FastAPI | 0.115 |
| Servidor ASGI | Uvicorn | 0.32 |
| Autenticação | JWT (python-jose + HS256) | 3.3 |
| Hash de senhas | bcrypt | 4.2 |
| Validação | Pydantic v2 | 2.10 |
| HTTP cliente (testes) | HTTPX | 0.28 |
| Variáveis de ambiente | python-dotenv | 1.0 |

### Banco de Dados

> **Estágio atual (demo):** dados simulados em memória (`data/mock_data.py`).
> **Previsto para produção:** PostgreSQL com ORM SQLAlchemy ou MongoDB Atlas para séries temporais de mercado.

### APIs e Fontes de Dados Externas

| Fonte | Dados utilizados |
|---|---|
| CONAB | Safra nacional, custo de produção por estado, produtividade média |
| CEPEA/ESALQ | Preço da soja (R$/sc) no mercado físico |
| CME Group (CBOT) | Contrato futuro de soja (USc/bu) |
| INMET | Índice de risco climático, previsão de seca/estiagem |
| ANTT | Tabela de fretes rodoviários (R$/t) |
| Banco Central do Brasil | Câmbio USD/BRL |
| Embrapa | Parâmetros técnicos de produtividade e custo |

---

## Arquitetura

```
┌────────────────────────────────────────────────────────────────────┐
│                         NAVEGADOR / CLIENTE                        │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │               Frontend — TanStack Start (SSR)                │  │
│  │                                                              │  │
│  │  /auth          Login + 2FA (JWT via API)                    │  │
│  │  /              Dashboard executivo (KPIs, gráficos)         │  │
│  │  /fazenda        Perfil da fazenda + documentos enviados     │  │
│  │  /analise        Fluxo de análise de decisão (6 etapas)      │  │
│  │  /oportunidades  Oportunidades personalizadas                │  │
│  │  /alertas        Alertas de risco e mercado                  │  │
│  │  /soja           Preço de mercado + CBOT                     │  │
│  │  /logistica      Transportadoras + fretes                    │  │
│  │  /armazenagem    Silos e capacidade                          │  │
│  │  /risco          Scores de risco climático e logístico       │  │
│  │  /previsoes      Projeção de preços 90 dias                  │  │
│  │  /exportacao     Portos e exportação                         │  │
│  │  /admin          Painel administrativo                       │  │
│  │                                                              │  │
│  │  Componentes: KpiCard · TrendChart · RadarPanel · Heatmap    │  │
│  │               BrazilMap · MarketTicker · WeatherPanel        │  │
│  │                                                              │  │
│  │  Auth guard: localStorage sensagro_token / sensagro_user     │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
└─────────────────────────────│──────────────────────────────────────┘
                              │ HTTP/JSON  (porta 5173 → 8000)
                              │ Authorization: Bearer <JWT>
┌─────────────────────────────▼──────────────────────────────────────┐
│                    Backend — FastAPI + Uvicorn                      │
│                                                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────┐  │
│  │  /api/auth  │  │/api/fazenda │  │ /api/mercado│  │/api/      │  │
│  │  login      │  │  perfil     │  │  ticker     │  │logistica  │  │
│  │  verify-2fa │  │  documentos │  │  soja       │  │  fretes   │  │
│  │  me / logout│  │  alertas    │  │  kpis       │  │  portos   │  │
│  └──────┬──────┘  │  oportunid.│  └─────────────┘  └──────────┘  │
│         │         └──────┬──────┘                                  │
│  ┌──────▼──────────────────▼──────────────────────────────────┐    │
│  │              Camada de Segurança                           │    │
│  │  JWT HS256 · bcrypt · OAuth2PasswordBearer · CORS          │    │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             │                                      │
│  ┌──────────────────────────▼───────────────────────────────────┐  │
│  │              Dados (mock_data.py — em memória)               │  │
│  │                                                              │  │
│  │  USERS_DB             → credenciais + perfil por e-mail      │  │
│  │  SCORES               → scores globais de risco              │  │
│  │  ALERTAS_POR_USUARIO  → alertas isolados por usuário         │  │
│  │  OPORTUNIDADES_POR_USUARIO → oportunidades por usuário       │  │
│  │                                                              │  │
│  │  [Produção → PostgreSQL / MongoDB Atlas]                     │  │
│  └──────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘

Fluxo de autenticação:
  1. POST /api/auth/login        → valida e-mail + senha (bcrypt)
  2. POST /api/auth/verify-2fa   → valida código 2FA → retorna JWT
  3. Demais endpoints            → Bearer <JWT> → decode → usuário

Isolamento de dados por usuário:
  Todos os endpoints /api/fazenda/* decodificam o JWT,
  identificam o usuário pelo campo "sub" e retornam
  SOMENTE os dados associados àquele e-mail.
  Nenhuma resposta contém dados de terceiros.
```

---

## Situação do Projeto

### Requisitos implementados

| # | Requisito | Status |
|---|---|---|
| 1 | Autenticação com e-mail + senha (bcrypt) | ✅ Implementado |
| 2 | Verificação em dois fatores (2FA — código demo fixo) | ✅ Implementado |
| 3 | JWT com expiração configurável (8h padrão) | ✅ Implementado |
| 4 | 3 perfis de usuário: admin, produtor PR, produtor MT | ✅ Implementado |
| 5 | Dashboard executivo com KPIs de mercado | ✅ Implementado |
| 6 | Ticker de mercado em tempo real (simulado) | ✅ Implementado |
| 7 | Tela "Minha Fazenda" com perfil e documentos enviados | ✅ Implementado |
| 8 | Impacto de documentos nas métricas (antes/depois/variação) | ✅ Implementado |
| 9 | Fluxo de análise de decisão em 6 etapas (/analise) | ✅ Implementado |
| 10 | Recomendação personalizada: AGUARDAR vs VENDER AGORA | ✅ Implementado |
| 11 | Alertas personalizados por usuário (/alertas) | ✅ Implementado |
| 12 | Oportunidades personalizadas por usuário (/oportunidades) | ✅ Implementado |
| 13 | Isolamento de dados: cada usuário vê apenas as próprias informações | ✅ Implementado |
| 14 | Fontes oficiais exibidas abaixo de cada indicador | ✅ Implementado |
| 15 | Tela de logística com transportadoras e fretes | ✅ Implementado |
| 16 | Tela de armazenagem com mapa de silos | ✅ Implementado |
| 17 | Scores de risco climático e logístico por produtor | ✅ Implementado |
| 18 | Previsões de preço da soja (90 dias) | ✅ Implementado |
| 19 | Tela de exportação (portos e rotas) | ✅ Implementado |
| 20 | Painel administrativo (/admin) | ✅ Implementado |
| 21 | Design responsivo (mobile + desktop) | ✅ Implementado |
| 22 | Tema escuro (dark mode nativo) | ✅ Implementado |
| 23 | Logo e identidade visual Sensagro integrados | ✅ Implementado |
| 24 | SSR (Server-Side Rendering) com TanStack Start | ✅ Implementado |
| 25 | CORS configurável por variável de ambiente | ✅ Implementado |

### Requisitos planejados / em andamento

| # | Requisito | Status |
|---|---|---|
| 26 | Banco de dados relacional (PostgreSQL) em produção | 🔲 Planejado |
| 27 | 2FA real com TOTP (Google Authenticator / pyotp) | 🔲 Planejado |
| 28 | Upload real de documentos (PDF/CSV com parsing automático) | 🔲 Planejado |
| 29 | Integração com API CEPEA/ESALQ (preço real da soja) | 🔲 Planejado |
| 30 | Integração com API INMET (clima em tempo real) | 🔲 Planejado |
| 31 | Integração com CBOT / CME (futuros de soja em tempo real) | 🔲 Planejado |
| 32 | Notificações push (alertas de preço e clima) | 🔲 Planejado |
| 33 | Módulo de simulação de cenários (preço × estoque × frete) | 🔲 Planejado |
| 34 | Exportação de relatórios em PDF | 🔲 Planejado |
| 35 | Multi-tenancy (múltiplas fazendas por usuário) | 🔲 Planejado |
| 36 | Aplicativo mobile (React Native ou PWA) | 🔲 Planejado |
| 37 | Deploy em nuvem (AWS / GCP / Railway) com CI/CD | 🔲 Planejado |

---

## Como executar localmente

> **Pré-requisitos:** [Python 3.12+](https://python.org/downloads) · [Node.js 18+](https://nodejs.org) · [Bun](https://bun.sh) · Git

**1. Clone o repositório**

```bash
git clone https://github.com/Clubs21/21-Clubs.git
cd 21-Clubs
```

**2. Inicie o backend**

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

> API disponível em http://localhost:8000 · Documentação em http://localhost:8000/docs

**3. Inicie o frontend** *(em outro terminal)*

```bash
cd frontend
bun install
bun run dev
```

> Aplicação disponível em http://localhost:5173

**4. Acesse e faça login**

Abra http://localhost:5173/auth e use uma das contas abaixo:

| Usuário | E-mail | Senha | Código 2FA |
|---|---|---|---|
| João Melo — Produtor PR | joao@fazendaparana.com.br | Parana@2026 | 123456 |
| Carlos Lima — Produtor MT | carlos@agromato.com.br | Agromato@2026 | 123456 |
| Admin Sensagro | admin@sensagro.io | Admin@2026 | 123456 |

---

*© 2026 Sensagro — Plataforma enterprise de inteligência para o agronegócio*
