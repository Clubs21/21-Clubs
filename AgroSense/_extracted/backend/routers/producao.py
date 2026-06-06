from fastapi import APIRouter
from data.mock_data import PRODUCAO

router = APIRouter(prefix="/producao", tags=["producao"])


@router.get("/safra")
def get_safra():
    return PRODUCAO


@router.get("/armazenagem")
def get_armazenagem():
    return {
        "capacidade_estatica_mt": 181.7,
        "ocupado_mt": 153.3,
        "livre_mt": 28.4,
        "ocupacao_pct": 84,
        "deficit_mt": 28.4,
        "custo_medio_sc_mes": 2.74,
        "por_estado": [
            {"estado": "MT", "total": 48.2, "ocupado": 34.1, "livre": 14.1},
            {"estado": "PR", "total": 38.6, "ocupado": 31.2, "livre": 7.4},
            {"estado": "RS", "total": 29.4, "ocupado": 22.8, "livre": 6.6},
            {"estado": "GO", "total": 22.1, "ocupado": 15.4, "livre": 6.7},
            {"estado": "MS", "total": 18.8, "ocupado": 11.9, "livre": 6.9},
            {"estado": "MG", "total": 14.2, "ocupado": 9.8, "livre": 4.4},
            {"estado": "BA", "total": 10.4, "ocupado": 6.2, "livre": 4.2},
        ],
    }


@router.get("/clima")
def get_clima():
    return {
        "indice_estiagem_pct": 42,
        "anomalia_temperatura_c": 1.8,
        "precipitacao_anomalia_pct": -28,
        "risco_safra": "medio",
        "por_regiao": [
            {"regiao": "MT", "precipitacao_pct_normal": 62, "temperatura_anomalia": 2.1, "risco": "alto"},
            {"regiao": "PR", "precipitacao_pct_normal": 140, "temperatura_anomalia": 0.8, "risco": "baixo"},
            {"regiao": "RS", "precipitacao_pct_normal": 88, "temperatura_anomalia": 1.2, "risco": "medio"},
            {"regiao": "GO", "precipitacao_pct_normal": 75, "temperatura_anomalia": 1.6, "risco": "medio"},
            {"regiao": "BA", "precipitacao_pct_normal": 58, "temperatura_anomalia": 2.4, "risco": "alto"},
            {"regiao": "MA", "precipitacao_pct_normal": 95, "temperatura_anomalia": 0.6, "risco": "baixo"},
        ],
    }
