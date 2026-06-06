from fastapi import APIRouter
from data.mock_data import SCORES, ALERTAS

router = APIRouter(prefix="/inteligencia", tags=["inteligencia"])


@router.get("/scores")
def get_scores():
    return SCORES


@router.get("/alertas")
def get_alertas():
    return ALERTAS


@router.get("/alertas/nao-lidos")
def get_alertas_nao_lidos():
    return [a for a in ALERTAS if not a["lido"]]


@router.get("/oportunidades")
def get_oportunidades():
    return [
        {
            "tipo": "venda",
            "titulo": "Janela de venda — Soja Nov/Dez",
            "descricao": "Combinação favorável: dólar acima de R$5,80 + CBOT em alta + demanda chinesa aquecida.",
            "ganho": "+R$ 14/saca vs. preço atual",
            "validade": "Estimativa: 18–32 dias",
            "score": 94,
        },
        {
            "tipo": "logistica",
            "titulo": "Frete de retorno — MT → Santos",
            "descricao": "Caminhões com retorno disponível. Frete 22% abaixo da tabela ANTT.",
            "ganho": "Economia de R$ 28/t",
            "validade": "Disponível até 10/dez",
            "score": 87,
        },
        {
            "tipo": "armazenagem",
            "titulo": "Armazenagem estratégica — PR",
            "descricao": "Silo com capacidade livre em Maringá. Ganho projetado em 60 dias.",
            "ganho": "Projeção: +R$ 9,40/saca em 60 dias",
            "validade": "Capacidade: 45 Kt",
            "score": 82,
        },
        {
            "tipo": "regiao",
            "titulo": "Expansão produtiva — MATOPIBA",
            "descricao": "Custo de arrendamento 40% menor que MT. Produtividade crescente.",
            "ganho": "Custo/ha 40% menor que MT",
            "validade": "Janela: out–dez",
            "score": 78,
        },
    ]


@router.get("/previsoes")
def get_previsoes():
    return {
        "preco_soja_90d": {"min": 178, "max": 195, "unidade": "R$/sc", "cenario": "otimista"},
        "preco_milho_60d": {"min": 62, "max": 68, "unidade": "R$/sc", "cenario": "neutro"},
        "dolar_trimestral": {"min": 5.60, "max": 5.95, "unidade": "BRL", "cenario": "neutro"},
        "producao_soja_final": {"min": 160, "max": 165, "unidade": "Mt", "cenario": "otimista"},
        "frete_30d": {"variacao_min": 5, "variacao_max": 9, "unidade": "%", "cenario": "pessimista"},
        "series": {
            "preco_soja": [
                {"m": "Out", "real": 185, "prev_otm": None, "prev_neu": None, "prev_pes": None},
                {"m": "Nov", "real": None, "prev_otm": 192, "prev_neu": 188, "prev_pes": 182},
                {"m": "Dez", "real": None, "prev_otm": 195, "prev_neu": 190, "prev_pes": 178},
                {"m": "Jan", "real": None, "prev_otm": 198, "prev_neu": 191, "prev_pes": 175},
            ],
        },
    }
