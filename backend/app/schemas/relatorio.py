from datetime import date, datetime
from typing import Dict, List

from app.schemas.base import CamelModel


class RelatorioGerarInput(CamelModel):
    """Payload para solicitar a geração de um relatório com IA
    (POST /relatorios/gerar).

    Reflete os parâmetros configurados na tela `GerarRelatorio.tsx`:
    turma, período (`inicio`/`fim`) e dimensões de análise selecionadas.
    """

    turma_id: int
    data_inicio: date
    data_fim: date
    dimensoes: List[str]


class RelatorioRead(CamelModel):
    """Representação de um relatório de IA, equivalente ao tipo
    `RelatorioIA` do frontend, acrescida de `dataInicio`, `dataFim`,
    `dimensoes`, `indicadores` e `distribuicaoCategorias` (usados nos
    gráficos da tela `RelatorioIA.tsx`)."""

    id: int
    turma_id: int
    periodo: str
    data_inicio: date
    data_fim: date
    dimensoes: List[str]
    resumo_gerado: str
    pontos_atencao: List[str]
    sugestoes: List[str]
    aproveitamento: int
    indicadores: Dict[str, int]
    distribuicao_categorias: Dict[str, int]
    data_geracao: datetime
