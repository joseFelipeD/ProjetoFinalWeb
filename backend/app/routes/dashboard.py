from collections import OrderedDict
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.auth.dependencies import get_current_user
from app.database.session import get_session
from app.models.observacao import Observacao
from app.models.relatorio import RelatorioIA
from app.models.turma import Turma
from app.models.usuario import Usuario
from app.schemas.dashboard import ObservacoesPorMes, ResumoDashboard

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]


@router.get("/resumo", response_model=ResumoDashboard)
def resumo(
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Métricas exibidas nos cards do topo do Dashboard:
    turmas ativas, observações registradas e relatórios gerados."""

    turmas = session.exec(select(Turma).where(Turma.usuario_id == usuario_atual.id)).all()
    observacoes = session.exec(
        select(Observacao).where(Observacao.usuario_id == usuario_atual.id)
    ).all()
    relatorios = session.exec(
        select(RelatorioIA).where(RelatorioIA.usuario_id == usuario_atual.id)
    ).all()

    return ResumoDashboard(
        turmas_ativas=len(turmas),
        observacoes_total=len(observacoes),
        relatorios_total=len(relatorios),
    )


@router.get("/observacoes-por-mes", response_model=list[ObservacoesPorMes])
def observacoes_por_mes(
    ano: Optional[int] = None,
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Quantidade de observações por mês do ano informado (ou do ano
    atual, se não informado). Alimenta o gráfico de área do Dashboard,
    substituindo o array fixo `observacoesPorMes` de `seedData.ts`."""

    ano_referencia = ano or datetime.utcnow().year

    observacoes = session.exec(
        select(Observacao).where(Observacao.usuario_id == usuario_atual.id)
    ).all()

    contagem: "OrderedDict[str, int]" = OrderedDict((mes, 0) for mes in MESES)
    for obs in observacoes:
        if obs.data_observacao.year == ano_referencia:
            contagem[MESES[obs.data_observacao.month - 1]] += 1

    return [ObservacoesPorMes(mes=mes, total=total) for mes, total in contagem.items()]
