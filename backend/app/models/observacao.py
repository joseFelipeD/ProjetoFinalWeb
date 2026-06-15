from datetime import date, datetime
from typing import TYPE_CHECKING, Optional

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.turma import Turma
    from app.models.usuario import Usuario


class Observacao(SQLModel, table=True):
    """Observação pedagógica registrada pelo professor sobre uma turma.

    Corresponde ao tipo `Observacao` do frontend: turmaId, dataObservacao,
    titulo, descricao, categoria. O campo `usuario_id` identifica o
    professor que fez o registro, e `data_criacao` guarda quando o
    registro foi salvo (auditoria).
    """

    __tablename__ = "observacoes"

    id: Optional[int] = Field(default=None, primary_key=True)
    turma_id: int = Field(foreign_key="turmas.id")
    usuario_id: int = Field(foreign_key="usuarios.id")

    data_observacao: date
    titulo: str
    descricao: str
    categoria: str
    # "Aprendizagem" | "Comportamento" | "Participação" | "Avaliação"
    # | "Assiduidade" | "Outros"

    data_criacao: datetime = Field(default_factory=datetime.utcnow)

    turma: Optional["Turma"] = Relationship(back_populates="observacoes")
    professor: Optional["Usuario"] = Relationship(back_populates="observacoes")
