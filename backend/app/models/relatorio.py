from datetime import date, datetime
from typing import TYPE_CHECKING, Dict, List, Optional

from sqlalchemy import JSON, Column
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.turma import Turma
    from app.models.usuario import Usuario


class RelatorioIA(SQLModel, table=True):
    """Relatório pedagógico gerado por IA a partir das observações de uma
    turma em um determinado período.

    Corresponde ao tipo `RelatorioIA` do frontend (turmaId, periodo,
    resumoGerado, pontosAtencao, sugestoes, dataGeracao, aproveitamento),
    acrescido de `data_inicio`/`data_fim`/`dimensoes` (parâmetros usados em
    `GerarRelatorio.tsx`) e de `indicadores`/`distribuicao_categorias`,
    que alimentam os gráficos de barras e de pizza exibidos em
    `RelatorioIA.tsx` (hoje preenchidos com dados fixos no frontend).
    """

    __tablename__ = "relatorios_ia"

    id: Optional[int] = Field(default=None, primary_key=True)
    turma_id: int = Field(foreign_key="turmas.id")
    usuario_id: int = Field(foreign_key="usuarios.id")

    periodo: str  # ex: "01/05/2026 a 08/06/2026"
    data_inicio: date
    data_fim: date

    dimensoes: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    resumo_gerado: str
    pontos_atencao: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    sugestoes: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    aproveitamento: int

    # {"Comportamento e disciplina": 80, ...} -> gráfico de barras
    indicadores: Dict[str, int] = Field(default_factory=dict, sa_column=Column(JSON))
    # {"Aprendizagem": 3, "Participação": 2, ...} -> gráfico de pizza
    distribuicao_categorias: Dict[str, int] = Field(
        default_factory=dict, sa_column=Column(JSON)
    )

    data_geracao: datetime = Field(default_factory=datetime.utcnow)

    turma: Optional["Turma"] = Relationship(back_populates="relatorios")
    professor: Optional["Usuario"] = Relationship(back_populates="relatorios")
