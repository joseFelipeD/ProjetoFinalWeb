from datetime import date, datetime

from app.schemas.base import CamelModel


class ObservacaoBase(CamelModel):
    turma_id: int
    data_observacao: date
    titulo: str
    descricao: str
    categoria: str
    # "Aprendizagem" | "Comportamento" | "Participação" | "Avaliação"
    # | "Assiduidade" | "Outros"


class ObservacaoCreate(ObservacaoBase):
    """Payload para criação de observação (POST /observacoes).

    Equivale ao tipo `NovaObservacaoInput` do frontend (`Omit<Observacao,
    'id'>`).
    """


class ObservacaoRead(ObservacaoBase):
    """Representação de uma observação, equivalente ao tipo `Observacao`
    do frontend, acrescida de `id` e `dataCriacao`."""

    id: int
    data_criacao: datetime
