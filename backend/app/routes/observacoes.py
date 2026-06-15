from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from app.auth.dependencies import get_current_user
from app.database.session import get_session
from app.models.observacao import Observacao
from app.models.turma import Turma
from app.models.usuario import Usuario
from app.schemas.observacao import ObservacaoCreate, ObservacaoRead

router = APIRouter(prefix="/observacoes", tags=["Observações"])


@router.get("", response_model=list[ObservacaoRead])
def listar_observacoes(
    turma_id: Optional[int] = None,
    categoria: Optional[str] = None,
    busca: Optional[str] = None,
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Lista observações do professor autenticado.

    Suporta os mesmos filtros da tela Histórico: `turma_id`,
    `categoria` e `busca` (título ou descrição).
    """

    query = select(Observacao).where(Observacao.usuario_id == usuario_atual.id)

    if turma_id is not None:
        query = query.where(Observacao.turma_id == turma_id)
    if categoria is not None:
        query = query.where(Observacao.categoria == categoria)

    query = query.order_by(Observacao.data_observacao.desc(), Observacao.id.desc())
    observacoes = session.exec(query).all()

    if busca:
        termo = busca.lower()
        observacoes = [
            obs for obs in observacoes
            if termo in obs.titulo.lower() or termo in obs.descricao.lower()
        ]

    return observacoes


@router.post("", response_model=ObservacaoRead, status_code=status.HTTP_201_CREATED)
def criar_observacao(
    dados: ObservacaoCreate,
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Cria uma nova observação pedagógica (tela Nova Observação)."""

    turma = session.get(Turma, dados.turma_id)
    if not turma or turma.usuario_id != usuario_atual.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Turma não encontrada.")

    observacao = Observacao(**dados.model_dump(), usuario_id=usuario_atual.id)

    session.add(observacao)
    session.commit()
    session.refresh(observacao)
    return observacao


@router.get("/{observacao_id}", response_model=ObservacaoRead)
def obter_observacao(
    observacao_id: int,
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Retorna os detalhes de uma observação específica."""

    observacao = session.get(Observacao, observacao_id)
    if not observacao or observacao.usuario_id != usuario_atual.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Observação não encontrada.")
    return observacao


@router.delete("/{observacao_id}", status_code=status.HTTP_204_NO_CONTENT)
def excluir_observacao(
    observacao_id: int,
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Remove uma observação (botão 'Excluir' da tela Histórico)."""

    observacao = session.get(Observacao, observacao_id)
    if not observacao or observacao.usuario_id != usuario_atual.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Observação não encontrada.")

    session.delete(observacao)
    session.commit()
