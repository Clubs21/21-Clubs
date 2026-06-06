"""
AgroSense — Dados mockados realistas
Empresas reais do agronegócio brasileiro para análise
"""

# Hashes pré-computados com bcrypt (rounds=12)
# Para gerar novos: import bcrypt; bcrypt.hashpw(b"senha", bcrypt.gensalt(12)).decode()

# ─────────────────────────────────────────────
# USUÁRIOS / EMPRESAS DE ACESSO
# ─────────────────────────────────────────────
USERS_DB = {
    "admin@agrosense.io": {
        "id": "usr_001",
        "nome": "Admin AgroSense",
        "email": "admin@agrosense.io",
        "hashed_password": "$2b$12$QlQlx/92uR8Apm66eyqJl.Q1JtYEhwsJ/Znp8BfGa0/kC/4fiZ8hG",
        "empresa": "AgroSense",
        "segmento": "plataforma",
        "perfil": "admin",
        "permissoes": ["all"],
        "avatar": "AL",
    },
    "analista@coodetec.com.br": {
        "id": "usr_002",
        "nome": "Rafael Monteiro",
        "email": "analista@coodetec.com.br",
        "hashed_password": "$2b$12$kudOfEp1.OY.7FQKGoD8dOXMrnuhLF4PHJu9ahMPwIFTisopJ9LLK",
        "empresa": "Coodetec Agrícola",
        "segmento": "cooperativa",
        "perfil": "analista",
        "permissoes": ["dashboard", "producao", "armazenagem", "mercado", "financeiro", "clima", "alertas", "indicadores"],
        "avatar": "RM",
        "empresa_detalhe": {
            "razao_social": "Coodetec Cooperativa de Desenvolvimento Tecnológico",
            "cnpj": "76.659.820/0001-51",
            "estado": "PR",
            "area_ha": 420000,
            "socios": 18400,
            "produto_principal": "Soja",
            "sede": "Cascavel, PR",
        },
    },
    "gestor@bomfuturo.com.br": {
        "id": "usr_003",
        "nome": "Eraí Maggi Jr.",
        "email": "gestor@bomfuturo.com.br",
        "hashed_password": "$2b$12$aJUD5VATger7SgOGNr//8.VPDpWhGww0YIoDfTznkA3p2paGX2fHW",
        "empresa": "Bom Futuro Agro",
        "segmento": "produtor",
        "perfil": "gestor",
        "permissoes": ["dashboard", "producao", "financeiro", "armazenagem", "clima", "alertas"],
        "avatar": "EJ",
        "empresa_detalhe": {
            "razao_social": "Bom Futuro Agropecuária S.A.",
            "cnpj": "03.450.269/0001-74",
            "estado": "MT",
            "area_ha": 310000,
            "socios": None,
            "produto_principal": "Soja / Milho / Algodão",
            "sede": "Sorriso, MT",
        },
    },
    "ops@rumo.com.br": {
        "id": "usr_004",
        "nome": "Carla Vasconcellos",
        "email": "ops@rumo.com.br",
        "hashed_password": "$2b$12$hWwPtA.UBzvoeDP4BG3DouL4ssSj4uybt8vtmwk7AuOCUtA6fN1dC",
        "empresa": "Rumo Logística",
        "segmento": "transportadora",
        "perfil": "operacional",
        "permissoes": ["dashboard", "logistica", "transportadoras", "exportacao", "alertas"],
        "avatar": "CV",
        "empresa_detalhe": {
            "razao_social": "Rumo S.A.",
            "cnpj": "02.940.578/0001-42",
            "estado": "SP",
            "area_ha": None,
            "socios": None,
            "produto_principal": "Logística Ferroviária",
            "sede": "São Paulo, SP",
            "frota_vagoes": 34000,
            "extensao_km": 13000,
        },
    },
    "trader@copersucar.com.br": {
        "id": "usr_005",
        "nome": "Paulo Saltini",
        "email": "trader@copersucar.com.br",
        "hashed_password": "$2b$12$uUErjVF7H9XTz.XjSyKDnuzehYT2WVZJxg3BJ/s/wKE0QkEIYm2Me",
        "empresa": "Copersucar",
        "segmento": "trading",
        "perfil": "trader",
        "permissoes": ["dashboard", "mercado", "exportacao", "financeiro", "correlacoes", "previsoes", "alertas", "indicadores"],
        "avatar": "PS",
        "empresa_detalhe": {
            "razao_social": "Copersucar S.A.",
            "cnpj": "44.734.673/0001-51",
            "estado": "SP",
            "area_ha": None,
            "socios": None,
            "produto_principal": "Açúcar / Etanol / Soja",
            "sede": "São Paulo, SP",
            "volume_anual_mt": 12.4,
        },
    },
    "invest@sollus.com.br": {
        "id": "usr_006",
        "nome": "Gustavo Werneck",
        "email": "invest@sollus.com.br",
        "hashed_password": "$2b$12$s5wgxMgKC0LMIEhtroeyl.6HwWdzoRLUzDCayL5vq4LPo7bdZKjcu",
        "empresa": "Sollus Capital",
        "segmento": "investidor",
        "perfil": "viewer",
        "permissoes": ["executivo", "indicadores", "alertas", "previsoes"],
        "avatar": "GW",
        "empresa_detalhe": {
            "razao_social": "Sollus Capital Gestão de Recursos Ltda.",
            "cnpj": "18.245.930/0001-88",
            "estado": "SP",
            "area_ha": None,
            "socios": None,
            "produto_principal": "Fundos Agro",
            "sede": "São Paulo, SP",
            "aum_bi": 4.2,
        },
    },
}

# ─────────────────────────────────────────────
# DADOS DE MERCADO
# ─────────────────────────────────────────────
MERCADO_DATA = {
    "ticker": [
        {"sigla": "SOJA-PR", "nome": "Soja Paranaguá", "valor": "R$ 172,40", "var": "+2.1%", "positivo": True},
        {"sigla": "MILHO-SP", "nome": "Milho Campinas", "valor": "R$ 64,80", "var": "+0.8%", "positivo": True},
        {"sigla": "CAFE-NY", "nome": "Café NY C", "valor": "USD 2,18/lb", "var": "-0.4%", "positivo": False},
        {"sigla": "CBOT-SOY", "nome": "CBOT Soja", "valor": "USD 1.484 cts", "var": "+1.8%", "positivo": True},
        {"sigla": "USD/BRL", "nome": "Dólar", "valor": "R$ 5,82", "var": "+0.4%", "positivo": True},
        {"sigla": "ACUCAR-NY11", "nome": "Açúcar NY11", "valor": "USD 22,4 cts", "var": "-1.2%", "positivo": False},
        {"sigla": "ALGODAO-NY2", "nome": "Algodão NY2", "valor": "USD 76,8 cts", "var": "+0.6%", "positivo": True},
        {"sigla": "TRIGO-KC", "nome": "Trigo KC", "valor": "USD 550 cts", "var": "-5.1%", "positivo": False},
    ],
    "historico_preco": [
        {"m": "Jan", "soja": 142, "milho": 98, "acucar": 2.1},
        {"m": "Fev", "soja": 148, "milho": 102, "acucar": 2.3},
        {"m": "Mar", "soja": 139, "milho": 110, "acucar": 2.0},
        {"m": "Abr", "soja": 156, "milho": 108, "acucar": 2.4},
        {"m": "Mai", "soja": 168, "milho": 121, "acucar": 2.6},
        {"m": "Jun", "soja": 161, "milho": 130, "acucar": 2.2},
        {"m": "Jul", "soja": 178, "milho": 126, "acucar": 2.8},
        {"m": "Ago", "soja": 190, "milho": 138, "acucar": 3.1},
        {"m": "Set", "soja": 185, "milho": 145, "acucar": 2.9},
    ],
    "kpis": {
        "producao_total_mt": 284.6,
        "receita_projetada_tri": 1.84,
        "exportacoes_mt": 97.4,
        "frete_medio_t": 312,
    },
}

# ─────────────────────────────────────────────
# TRANSPORTADORAS (para o Ranking)
# ─────────────────────────────────────────────
TRANSPORTADORAS = [
    {
        "id": "tr_001", "nome": "Rumo Logística", "hq": "São Paulo, SP", "modal": "Ferroviário",
        "region": "Sudeste", "cost": 92, "leadTime": 88, "reliability": 94,
        "rating": 4.8, "capacity": 96, "cert": ["ISO 9001", "ISO 14001", "SASSMAQ"],
        "trend": 3.2, "frota": "34.000 vagões", "extensao_km": 13000,
        "descricao": "Maior operadora ferroviária do Brasil. Especializada no escoamento de grãos e açúcar do Centro-Oeste ao Porto de Santos.",
    },
    {
        "id": "tr_002", "nome": "Brado Logística", "hq": "Curitiba, PR", "modal": "Ferroviário",
        "region": "Sul", "cost": 88, "leadTime": 85, "reliability": 91,
        "rating": 4.6, "capacity": 84, "cert": ["ISO 9001", "SASSMAQ"],
        "trend": 2.1, "frota": "4.200 vagões", "extensao_km": 2100,
        "descricao": "Braço ferroviário da América Latina Logística. Forte presença no corredor Sul–Santos.",
    },
    {
        "id": "tr_003", "nome": "Transcarga Norte", "hq": "Sinop, MT", "modal": "Rodoviário",
        "region": "Centro-Oeste", "cost": 82, "leadTime": 79, "reliability": 86,
        "rating": 4.3, "capacity": 78, "cert": ["ISO 9001"],
        "trend": 1.8, "frota": "1.240 caminhões", "extensao_km": None,
        "descricao": "Líder em fretes rodoviários no Mato Grosso. Principal rota: Sorriso–Rondonópolis–Santos.",
    },
    {
        "id": "tr_004", "nome": "Agrotrans Sul", "hq": "Cascavel, PR", "modal": "Rodoviário",
        "region": "Sul", "cost": 79, "leadTime": 83, "reliability": 84,
        "rating": 4.4, "capacity": 72, "cert": ["ISO 9001", "SASSMAQ"],
        "trend": 0.9, "frota": "820 caminhões", "extensao_km": None,
        "descricao": "Transportadora paranaense com forte integração com cooperativas da região Sul.",
    },
    {
        "id": "tr_005", "nome": "Cooperativo MT", "hq": "Lucas do Rio Verde, MT", "modal": "Rodoviário",
        "region": "Centro-Oeste", "cost": 85, "leadTime": 77, "reliability": 82,
        "rating": 4.2, "capacity": 74, "cert": ["ISO 9001"],
        "trend": 2.4, "frota": "640 caminhões", "extensao_km": None,
        "descricao": "Cooperativa de transporte do produtor rural mato-grossense. Preço mais competitivo para associados.",
    },
    {
        "id": "tr_006", "nome": "LogiAgro Nordeste", "hq": "Luís Eduardo Magalhães, BA", "modal": "Rodoviário",
        "region": "Nordeste", "cost": 76, "leadTime": 72, "reliability": 79,
        "rating": 4.0, "capacity": 68, "cert": [],
        "trend": 4.8, "frota": "380 caminhões", "extensao_km": None,
        "descricao": "Transportadora em expansão no corredor MATOPIBA–Porto de Itaqui (MA).",
    },
    {
        "id": "tr_007", "nome": "TransGrão Fluvial", "hq": "Santarém, PA", "modal": "Hidroviário",
        "region": "Norte", "cost": 94, "leadTime": 68, "reliability": 77,
        "rating": 3.9, "capacity": 62, "cert": ["ANTAQ"],
        "trend": 6.2, "frota": "28 barcaças", "extensao_km": None,
        "descricao": "Operador hidroviário no Rio Tapajós. Modal mais barato por tonelada — rota Santarém–Porto de Barcarena.",
    },
    {
        "id": "tr_008", "nome": "Nortetrans Multimodal", "hq": "Palmas, TO", "modal": "Multimodal",
        "region": "Norte", "cost": 80, "leadTime": 74, "reliability": 80,
        "rating": 4.1, "capacity": 71, "cert": ["ISO 9001"],
        "trend": 3.7, "frota": "280 caminhões + 8 locomotivas", "extensao_km": None,
        "descricao": "Especialista no corredor Norte-Sul. Integra rodovia + ferrovia FNS + hidrovia Araguaia.",
    },
]

# ─────────────────────────────────────────────
# ALERTAS DO SISTEMA
# ─────────────────────────────────────────────
ALERTAS = [
    {
        "id": 1, "categoria": "Clima", "titulo": "Estiagem prolongada — MT",
        "descricao": "Déficit hídrico acima de 40% na região central de MT. Impacto estimado de -8% na produtividade da soja.",
        "impacto": "Produção: -8% estimado", "nivel": "critical", "tipo": "risco", "tempo": "há 12 min", "lido": False,
    },
    {
        "id": 2, "categoria": "Mercado", "titulo": "Queda de preço — Trigo",
        "descricao": "Recuo de 5,1% no mercado spot internacional. CBOT abaixo de 550 cts/bu.",
        "impacto": "Receita: -R$ 120/t", "nivel": "high", "tipo": "risco", "tempo": "há 38 min", "lido": False,
    },
    {
        "id": 3, "categoria": "Logística", "titulo": "Congestionamento — Porto de Paranaguá",
        "descricao": "Fila de 41 navios aguardando atracação. Tempo médio de espera: 14 horas.",
        "impacto": "Custo extra: +R$ 85/t", "nivel": "high", "tipo": "gargalo", "tempo": "há 1h", "lido": False,
    },
    {
        "id": 4, "categoria": "Produção", "titulo": "Foco de praga — Algodão BA",
        "descricao": "Detecção de bicudo em 3 talhões monitorados em Luís Eduardo Magalhães.",
        "impacto": "Área de risco: 1.200 ha", "nivel": "medium", "tipo": "risco", "tempo": "há 2h", "lido": False,
    },
    {
        "id": 5, "categoria": "Logística", "titulo": "Oportunidade de frete — Sul do MT",
        "descricao": "Retorno disponível no eixo Sorriso–Rondonópolis. Frete 22% abaixo da média regional.",
        "impacto": "Economia: R$ 28/t", "nivel": "low", "tipo": "oportunidade", "tempo": "há 3h", "lido": True,
    },
    {
        "id": 6, "categoria": "Mercado", "titulo": "Alta do dólar — janela de venda",
        "descricao": "Dólar acima de R$ 5,80 abre janela favorável para fixação de exportação.",
        "impacto": "Margem: +R$ 4,20/sc", "nivel": "low", "tipo": "oportunidade", "tempo": "há 4h", "lido": True,
    },
]

# ─────────────────────────────────────────────
# SCORES / ÍNDICE GERAL DE RISCO
# ─────────────────────────────────────────────
SCORES = {
    "igr": 34,
    "score_climatico": 71,
    "score_financeiro": 78,
    "score_logistico": 52,
    "score_operacional": 84,
    "score_mercado": 76,
    "score_exportacao": 81,
    "interpretacao": "Risco geral BAIXO. Principal atenção: gargalo logístico (score 52) e estiagem em MT.",
}

# ─────────────────────────────────────────────
# PRODUÇÃO
# ─────────────────────────────────────────────
PRODUCAO = {
    "safra": "2025/26",
    "producao_soja_mt": 162.4,
    "area_plantada_mha": 47.8,
    "produtividade_sc_ha": 57.4,
    "custo_medio_ha": 4840,
    "por_estado": [
        {"estado": "MT", "producao": 38.2, "area": 11.8, "produtividade": 58.1},
        {"estado": "PR", "producao": 22.4, "area": 6.1, "produtividade": 63.2},
        {"estado": "RS", "producao": 19.8, "area": 6.4, "produtividade": 55.4},
        {"estado": "GO", "producao": 14.2, "area": 4.2, "produtividade": 60.8},
        {"estado": "MS", "producao": 11.6, "area": 3.8, "produtividade": 54.7},
        {"estado": "MG", "producao": 7.4, "area": 2.4, "produtividade": 55.0},
        {"estado": "BA", "producao": 5.8, "area": 1.9, "produtividade": 54.3},
        {"estado": "Outros", "producao": 43.0, "area": 11.2, "produtividade": 51.8},
    ],
}
