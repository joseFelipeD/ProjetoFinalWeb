from datetime import datetime
from typing import Optional

from app.schemas.base import CamelModel


class TurmaBase(CamelModel):
    nome: str
    serie: str
    ano_letivo: int
    quantidade_alunos: int
    descricao: str


class TurmaCreate(TurmaBase):
    """Payload para criação de turma (POST /turmas).

    Equivale ao tipo `NovaTurmaInput` do frontend (`Omit<Turma, 'id' |
    'cor'>`) - a cor é definida automaticamente pelo backend.
    """


class TurmaUpdate(CamelModel):
    """Payload para edição parcial de uma turma (PUT /turmas/{id})."""

    nome: Optional[str] = None
    serie: Optional[str] = None
    ano_letivo: Optional[int] = None
    quantidade_alunos: Optional[int] = None
    descricao: Optional[str] = None
    cor: Optional[str] = None


class TurmaRead(TurmaBase):
    """Representação de uma turma, equivalente ao tipo `Turma` do frontend."""

    id: int
    cor: str
    data_criacao: datetime


class TurmaComContagem(TurmaRead):
    """Turma acrescida da contagem de observações.

    Usado em `GET /turmas`, que alimenta `TurmaCard` (campo
    `observacoesCount`) e `TurmaTable` na tela Turmas.
    """

    total_observacoes: int = 0
