from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.auth.dependencies import get_current_user
from app.database.session import get_session
from app.models.usuario import Usuario
from app.schemas.usuario import UsuarioRead, UsuarioUpdate

router = APIRouter(prefix="/usuarios", tags=["Usuários"])


@router.get("/me", response_model=UsuarioRead)
def obter_perfil(usuario_atual: Usuario = Depends(get_current_user)):
    """Retorna o perfil do professor autenticado (tela Perfil)."""
    return usuario_atual


@router.put("/me", response_model=UsuarioRead)
def atualizar_perfil(
    dados: UsuarioUpdate,
    usuario_atual: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Atualiza dados cadastrais do professor autenticado (tela Perfil)."""

    atualizacoes = dados.model_dump(exclude_unset=True)
    for campo, valor in atualizacoes.items():
        setattr(usuario_atual, campo, valor)

    session.add(usuario_atual)
    session.commit()
    session.refresh(usuario_atual)
    return usuario_atual
