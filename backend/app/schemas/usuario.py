from datetime import datetime
from typing import Optional

from app.schemas.base import CamelModel


class UsuarioBase(CamelModel):
    nome: str
    nome_exibicao: str
    email: str
    escola: str
    disciplina: str


class UsuarioCreate(UsuarioBase):
    """Payload para cadastro de um novo professor (POST /auth/registrar)."""

    senha: str


class UsuarioUpdate(CamelModel):
    """Payload para edição do perfil (PUT /usuarios/me).

    Todos os campos são opcionais para permitir atualização parcial.
    """

    nome: Optional[str] = None
    nome_exibicao: Optional[str] = None
    email: Optional[str] = None
    escola: Optional[str] = None
    disciplina: Optional[str] = None


class UsuarioRead(UsuarioBase):
    """Representação pública do professor (sem a senha).

    Equivale ao tipo `Professor` do frontend, acrescido de `id` e
    `dataCriacao`.
    """

    id: int
    data_criacao: datetime
