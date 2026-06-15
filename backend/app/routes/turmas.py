from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from app.auth.dependencies import get_current_user
from app.database.session import get_session
from app.models.observacao import Observacao
from app.models.turma import Turma
from app.models.usuario import Usuario
from app.schemas.turma import TurmaComContagem, TurmaCreate, TurmaRead, TurmaUpdate

router = APIRouter(prefix="/turmas", tags=["Turmas"])

# Mesma sequência de cores usada em `App.tsx` (`cores` em `addTurma`).
CORES_DISPONIVEIS = ["azul", "roxo", "verde", "ciano"]


@router.get("", response_model=list[TurmaComContagem])
def listar_turmas(
    search: Optional[str] = None,
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Lista as turmas do professor autenticado.

    O parâmetro `search` filtra por nome ou série (igual ao campo de
    busca da tela Turmas), e cada turma retorna `totalObservacoes`,
    usado pelos componentes `TurmaCard` e `TurmaTable`.
    """

    turmas = session.exec(
        select(Turma).where(Turma.usuario_id == usuario_atual.id)
    ).all()

    if search:
        termo = search.lower()
        turmas = [
            t for t in turmas
            if termo in t.nome.lower() or termo in t.serie.lower()
        ]

    resultado: list[TurmaComContagem] = []
    for turma in turmas:
        total = session.exec(
            select(Observacao).where(Observacao.turma_id == turma.id)
        ).all()
        resultado.append(
            TurmaComContagem(**turma.model_dump(), total_observacoes=len(total))
        )

    return resultado


@router.post("", response_model=TurmaRead, status_code=status.HTTP_201_CREATED)
def criar_turma(
    dados: TurmaCreate,
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Cria uma nova turma para o professor autenticado (modal 'Adicionar
    turma' da tela Turmas).

    A cor é atribuída automaticamente em rotação, da mesma forma que o
    frontend fazia em `App.tsx`.
    """

    turmas_atuais = session.exec(
        select(Turma).where(Turma.usuario_id == usuario_atual.id)
    ).all()
    cor = CORES_DISPONIVEIS[len(turmas_atuais) % len(CORES_DISPONIVEIS)]

    turma = Turma(**dados.model_dump(), cor=cor, usuario_id=usuario_atual.id)

    session.add(turma)
    session.commit()
    session.refresh(turma)
    return turma


@router.get("/{turma_id}", response_model=TurmaRead)
def obter_turma(
    turma_id: int,
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Retorna os detalhes de uma turma específica."""

    turma = session.get(Turma, turma_id)
    if not turma or turma.usuario_id != usuario_atual.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Turma não encontrada.")
    return turma


@router.put("/{turma_id}", response_model=TurmaRead)
def atualizar_turma(
    turma_id: int,
    dados: TurmaUpdate,
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Atualiza dados de uma turma existente."""

    turma = session.get(Turma, turma_id)
    if not turma or turma.usuario_id != usuario_atual.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Turma não encontrada.")

    atualizacoes = dados.model_dump(exclude_unset=True)
    for campo, valor in atualizacoes.items():
        setattr(turma, campo, valor)

    session.add(turma)
    session.commit()
    session.refresh(turma)
    return turma


@router.delete("/{turma_id}", status_code=status.HTTP_204_NO_CONTENT)
def excluir_turma(
    turma_id: int,
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Remove uma turma (e, em cascata, suas observações e relatórios)."""

    turma = session.get(Turma, turma_id)
    if not turma or turma.usuario_id != usuario_atual.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Turma não encontrada.")

    session.delete(turma)
    session.commit()
