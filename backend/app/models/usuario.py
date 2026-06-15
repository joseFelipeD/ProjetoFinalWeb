from datetime import datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.observacao import Observacao
    from app.models.relatorio import RelatorioIA
    from app.models.turma import Turma


class Usuario(SQLModel, table=True):
    """Professor(a) que utiliza a plataforma.

    Corresponde ao tipo `Professor` do frontend (id, nome, nomeExibicao,
    email, escola, disciplina) acrescido dos campos `senha` e
    `data_criacao` previstos no plano da Sprint 1, necessários para a
    autenticação JWT.
    """

    __tablename__ = "usuarios"

    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    nome_exibicao: str
    email: str = Field(unique=True, index=True)
    senha_hash: str
    escola: str
    disciplina: str
    data_criacao: datetime = Field(default_factory=datetime.utcnow)

    turmas: List["Turma"] = Relationship(back_populates="professor")
    observacoes: List["Observacao"] = Relationship(back_populates="professor")
    relatorios: List["RelatorioIA"] = Relationship(back_populates="professor")
