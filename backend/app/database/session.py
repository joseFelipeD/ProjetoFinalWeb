from sqlmodel import Session, SQLModel, create_engine

from app.config import settings

# O parâmetro check_same_thread só é necessário para SQLite.
connect_args = (
    {"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {}
)

engine = create_engine(settings.DATABASE_URL, echo=False, connect_args=connect_args)


def init_db() -> None:
    """Cria todas as tabelas no banco de dados, caso ainda não existam.

    Os modelos precisam estar importados para que o SQLModel registre
    seus metadados antes de chamar create_all.
    """
    from app.models import observacao, relatorio, turma, usuario  # noqa: F401

    SQLModel.metadata.create_all(engine)


def get_session():
    """Dependência do FastAPI que fornece uma sessão de banco de dados."""
    with Session(engine) as session:
        yield session
