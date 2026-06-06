from fastapi import APIRouter, Query
from data.mock_data import TRANSPORTADORAS

router = APIRouter(prefix="/logistica", tags=["logistica"])


@router.get("/transportadoras")
def get_transportadoras(
    modal: str = Query(default="Todos"),
    region: str = Query(default="Todas"),
    min_score: int = Query(default=0, ge=0, le=100),
):
    result = TRANSPORTADORAS.copy()

    def score_of(t):
        return round(
            t["cost"] * 0.18
            + t["leadTime"] * 0.18
            + t["reliability"] * 0.22
            + t["rating"] * 20 * 0.12
            + t["capacity"] * 0.14
            + (len(t["cert"]) * 8)
        )

    for t in result:
        t["score"] = min(100, score_of(t))

    if modal != "Todos":
        result = [t for t in result if t["modal"] == modal]
    if region != "Todas":
        result = [t for t in result if t["region"] == region]
    result = [t for t in result if t["score"] >= min_score]
    result.sort(key=lambda x: x["score"], reverse=True)
    return result


@router.get("/transportadoras/{transportadora_id}")
def get_transportadora(transportadora_id: str):
    for t in TRANSPORTADORAS:
        if t["id"] == transportadora_id:
            return t
    return {"error": "Transportadora não encontrada"}


@router.get("/fretes")
def get_fretes():
    return {
        "frete_medio_mt_santos": 312,
        "variacao_pct": 12.3,
        "historico": [
            {"m": "Jan", "rodoviario": 268, "ferroviario": 180, "hidroviario": 95},
            {"m": "Fev", "rodoviario": 275, "ferroviario": 182, "hidroviario": 98},
            {"m": "Mar", "rodoviario": 282, "ferroviario": 185, "hidroviario": 96},
            {"m": "Abr", "rodoviario": 290, "ferroviario": 188, "hidroviario": 102},
            {"m": "Mai", "rodoviario": 298, "ferroviario": 191, "hidroviario": 104},
            {"m": "Jun", "rodoviario": 305, "ferroviario": 193, "hidroviario": 101},
            {"m": "Jul", "rodoviario": 308, "ferroviario": 196, "hidroviario": 99},
            {"m": "Ago", "rodoviario": 310, "ferroviario": 198, "hidroviario": 103},
            {"m": "Set", "rodoviario": 312, "ferroviario": 200, "hidroviario": 105},
        ],
    }


@router.get("/portos")
def get_portos():
    return [
        {"nome": "Santos", "estado": "SP", "volume_mt": 28.4, "status": "normal", "fila_navios": 12, "tempo_espera_h": 4},
        {"nome": "Paranaguá", "estado": "PR", "volume_mt": 18.2, "status": "atenção", "fila_navios": 24, "tempo_espera_h": 8},
        {"nome": "São Luís (Itaqui)", "estado": "MA", "volume_mt": 9.8, "status": "normal", "fila_navios": 8, "tempo_espera_h": 2},
        {"nome": "Rio Grande", "estado": "RS", "volume_mt": 7.2, "status": "crítico", "fila_navios": 41, "tempo_espera_h": 14},
        {"nome": "Vitória", "estado": "ES", "volume_mt": 4.1, "status": "normal", "fila_navios": 5, "tempo_espera_h": 1},
    ]
