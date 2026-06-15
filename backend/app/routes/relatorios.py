from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from app.auth.dependencies import get_current_user
from app.database.session import get_session
from app.models.observacao import Observacao
from app.models.relatorio import RelatorioIA
from app.models.turma import Turma
from app.models.usuario import Usuario
from app.schemas.relatorio import RelatorioGerarInput, RelatorioRead
from app.services.ia_service import gerar_relatorio_pedagogico

router = APIRouter(prefix="/relatorios", tags=["Relatórios IA"])


@router.post("/gerar", response_model=RelatorioRead, status_code=status.HTTP_201_CREATED)
def gerar_relatorio(
    dados: RelatorioGerarInput,
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Gera um relatório pedagógico com IA (tela 'Gerar Relatório com IA').

    Busca as observações da turma dentro do período informado, envia-as
    ao serviço de IA (`app.services.ia_service`) e persiste o resultado,
    que passa a alimentar a tela 'Relatório com IA' e o histórico de
    relatórios.
    """

    turma = session.get(Turma, dados.turma_id)
    if not turma or turma.usuario_id != usuario_atual.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Turma não encontrada.")

    if dados.data_fim < dados.data_inicio:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A data final deve ser maior ou igual à data inicial.",
        )

    query = (
        select(Observacao)
        .where(Observacao.turma_id == turma.id)
        .where(Observacao.data_observacao >= dados.data_inicio)
        .where(Observacao.data_observacao <= dados.data_fim)
    )
    observacoes = session.exec(query).all()

    if not observacoes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não há observações registradas para esta turma no período informado.",
        )

    resultado = gerar_relatorio_pedagogico(turma=turma, observacoes=observacoes, dimensoes=dados.dimensoes)

    periodo = f"{dados.data_inicio.strftime('%d/%m/%Y')} a {dados.data_fim.strftime('%d/%m/%Y')}"

    relatorio = RelatorioIA(
        turma_id=turma.id,
        usuario_id=usuario_atual.id,
        periodo=periodo,
        data_inicio=dados.data_inicio,
        data_fim=dados.data_fim,
        dimensoes=dados.dimensoes,
        resumo_gerado=resultado["resumo_gerado"],
        pontos_atencao=resultado["pontos_atencao"],
        sugestoes=resultado["sugestoes"],
        aproveitamento=resultado["aproveitamento"],
        indicadores=resultado["indicadores"],
        distribuicao_categorias=resultado["distribuicao_categorias"],
    )

    session.add(relatorio)
    session.commit()
    session.refresh(relatorio)
    return relatorio


@router.get("", response_model=list[RelatorioRead])
def listar_relatorios(
    turma_id: Optional[int] = None,
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Lista o histórico de relatórios gerados pelo professor, do mais
    recente para o mais antigo. Pode ser filtrado por `turma_id`."""

    query = select(RelatorioIA).where(RelatorioIA.usuario_id == usuario_atual.id)
    if turma_id is not None:
        query = query.where(RelatorioIA.turma_id == turma_id)

    query = query.order_by(RelatorioIA.data_geracao.desc())
    return session.exec(query).all()


@router.get("/ultimo", response_model=RelatorioRead)
def ultimo_relatorio(
    turma_id: Optional[int] = None,
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Retorna o relatório mais recente do professor (ou de uma turma
    específica). Usado pelo banner 'Relatório inteligente disponível'
    do Dashboard e pela tela 'Relatório com IA'."""

    query = select(RelatorioIA).where(RelatorioIA.usuario_id == usuario_atual.id)
    if turma_id is not None:
        query = query.where(RelatorioIA.turma_id == turma_id)

    query = query.order_by(RelatorioIA.data_geracao.desc())
    relatorio = session.exec(query).first()

    if not relatorio:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhum relatório encontrado.")

    return relatorio


@router.get("/{relatorio_id}", response_model=RelatorioRead)
def obter_relatorio(
    relatorio_id: int,
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Retorna os detalhes de um relatório específico."""

    relatorio = session.get(RelatorioIA, relatorio_id)
    if not relatorio or relatorio.usuario_id != usuario_atual.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Relatório não encontrado.")

    return relatorio
