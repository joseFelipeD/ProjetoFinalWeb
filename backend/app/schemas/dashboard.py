from app.schemas.base import CamelModel


class ResumoDashboard(CamelModel):
    """Métricas exibidas nos `MetricCard` da tela Dashboard."""

    turmas_ativas: int
    observacoes_total: int
    relatorios_total: int


class ObservacoesPorMes(CamelModel):
    """Ponto do gráfico 'Observações por mês' da tela Dashboard.

    Equivale a cada item de `observacoesPorMes` em `seedData.ts`.
    """

    mes: str
    total: int
