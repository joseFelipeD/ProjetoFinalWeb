from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlmodel import Session, select

from app.config import settings
from app.database.session import get_session
from app.models.usuario import Usuario

# tokenUrl indica ao Swagger UI onde obter o token (botão "Authorize").
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: Session = Depends(get_session),
) -> Usuario:
    """Decodifica o JWT enviado no header `Authorization: Bearer <token>`
    e retorna o `Usuario` (professor) correspondente.

    Usado como dependência em todas as rotas protegidas, garantindo que
    cada professor só acesse suas próprias turmas, observações e
    relatórios.
    """

    credenciais_invalidas = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str | None = payload.get("sub")
        if email is None:
            raise credenciais_invalidas
    except JWTError:
        raise credenciais_invalidas

    usuario = session.exec(select(Usuario).where(Usuario.email == email)).first()
    if usuario is None:
        raise credenciais_invalidas

    return usuario
