from datetime import datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.observacao import Observacao
    from app.models.relatorio import RelatorioIA
    from app.models.usuario import Usuario


class Turma(SQLModel, table=True):
    """Turma escolar (6º ao 9º ano).

    Corresponde ao tipo `Turma` do frontend: nome, serie, anoLetivo,
    quantidadeAlunos, descricao e cor. O campo `cor` é atribuído
    automaticamente pelo backend, da mesma forma que `App.tsx` fazia em
    `addTurma`. Cada turma pertence a um professor (`usuario_id`).
    """

    __tablename__ = "turmas"

    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    serie: str  # "6º ano" | "7º ano" | "8º ano" | "9º ano"
    ano_letivo: int
    quantidade_alunos: int
    descricao: str
    cor: str = Field(default="azul")  # "azul" | "roxo" | "verde" | "ciano"
    data_criacao: datetime = Field(default_factory=datetime.utcnow)

    usuario_id: Optional[int] = Field(default=None, foreign_key="usuarios.id")

    professor: Optional["Usuario"] = Relationship(back_populates="turmas")
    observacoes: List["Observacao"] = Relationship(
        back_populates="turma",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"},
    )
    relatorios: List["RelatorioIA"] = Relationship(
        back_populates="turma",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"},
    )
