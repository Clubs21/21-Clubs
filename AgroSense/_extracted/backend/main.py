"""
AgroSense — Backend API
Business Intelligence para o Agronegócio

Execução:
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000

Docs interativa: http://localhost:8000/docs
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from auth.router import router as auth_router
from routers.mercado import router as mercado_router
from routers.logistica import router as logistica_router
from routers.producao import router as producao_router
from routers.scores import router as scores_router

app = FastAPI(
    title="AgroSense API",
    description="Business Intelligence para o Agronegócio — mercado, clima, logística, cadeia produtiva",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS — aceita requisições do frontend local
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://localhost:5173,http://localhost:4173"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router, prefix="/api")
app.include_router(mercado_router, prefix="/api")
app.include_router(logistica_router, prefix="/api")
app.include_router(producao_router, prefix="/api")
app.include_router(scores_router, prefix="/api")


@app.get("/", tags=["root"])
def root():
    return {
        "app": "AgroSense API",
        "version": "1.0.0",
        "status": "online",
        "docs": "/docs",
        "endpoints": {
            "auth": "/api/auth/login | /api/auth/verify-2fa | /api/auth/me",
            "mercado": "/api/mercado/ticker | /api/mercado/soja | /api/mercado/kpis",
            "logistica": "/api/logistica/transportadoras | /api/logistica/fretes | /api/logistica/portos",
            "producao": "/api/producao/safra | /api/producao/armazenagem | /api/producao/clima",
            "inteligencia": "/api/inteligencia/scores | /api/inteligencia/alertas | /api/inteligencia/oportunidades | /api/inteligencia/previsoes",
        },
    }


@app.get("/health", tags=["root"])
def health():
    return {"status": "healthy", "ambiente": os.getenv("ENVIRONMENT", "development")}
