from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database.session import init_db
from app.routes import auth, dashboard, observacoes, relatorios, turmas, usuarios

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=(
        "API do EduInsight IA - plataforma pedagógica para registro de "
        "observações de turmas e geração de relatórios com IA."
    ),
    version="1.0.0",
)

# Libera o acesso a partir do frontend (Vite, padrão na porta 5173).
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_ORIGIN,
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    """Cria as tabelas do banco de dados na inicialização da aplicação."""
    init_db()


app.include_router(auth.router)
app.include_router(usuarios.router)
app.include_router(turmas.router)
app.include_router(observacoes.router)
app.include_router(relatorios.router)
app.include_router(dashboard.router)


@app.get("/", tags=["Status"])
def raiz():
    """Endpoint simples para verificar se a API está no ar."""
    return {"status": "ok", "projeto": settings.PROJECT_NAME}
