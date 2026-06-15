from datetime import datetime, timedelta, timezone
from typing import Any, Optional

from jose import jwt
from passlib.context import CryptContext

from app.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_senha(senha: str) -> str:
    """Gera o hash bcrypt de uma senha em texto puro."""
    return pwd_context.hash(senha)


def verificar_senha(senha: str, senha_hash: str) -> bool:
    """Verifica se uma senha em texto puro corresponde ao hash armazenado."""
    return pwd_context.verify(senha, senha_hash)


def criar_access_token(subject: str, expires_delta: Optional[timedelta] = None) -> str:
    """Cria um JWT de acesso cujo `sub` é o e-mail do usuário."""
    expira_em = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    payload: dict[str, Any] = {"sub": subject, "exp": expira_em}
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
