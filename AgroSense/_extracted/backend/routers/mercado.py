from fastapi import APIRouter
from data.mock_data import MERCADO_DATA

router = APIRouter(prefix="/mercado", tags=["mercado"])


@router.get("/ticker")
def get_ticker():
    return MERCADO_DATA["ticker"]


@router.get("/historico-preco")
def get_historico():
    return MERCADO_DATA["historico_preco"]


@router.get("/kpis")
def get_kpis():
    return MERCADO_DATA["kpis"]


@router.get("/soja")
def get_soja():
    return {
        "preco_paranagua": 172.40,
        "cbot_cts_bu": 1484,
        "dolar": 5.82,
        "premio_cts_bu": 72,
        "exportacoes_mt": 97.4,
        "producao_mt": 162.4,
        "produtividade_sc_ha": 57.4,
        "variacao_preco_pct": 2.1,
        "tendencia": "alta",
        "historico": [
            {"m": "Jan", "preco": 142, "cbot": 1280, "dolar": 5.10},
            {"m": "Fev", "preco": 148, "cbot": 1310, "dolar": 5.20},
            {"m": "Mar", "preco": 139, "cbot": 1290, "dolar": 5.15},
            {"m": "Abr", "preco": 156, "cbot": 1340, "dolar": 5.35},
            {"m": "Mai", "preco": 168, "cbot": 1380, "dolar": 5.48},
            {"m": "Jun", "preco": 161, "cbot": 1360, "dolar": 5.42},
            {"m": "Jul", "preco": 178, "cbot": 1420, "dolar": 5.55},
            {"m": "Ago", "preco": 190, "cbot": 1460, "dolar": 5.72},
            {"m": "Set", "preco": 185, "cbot": 1484, "dolar": 5.82},
        ],
    }
