from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select

from app.auth.dependencies import get_current_user
from app.auth.security import criar_access_token, hash_senha, verificar_senha
from app.database.session import get_session
from app.models.usuario import Usuario
from app.schemas.auth import Token
from app.schemas.usuario import UsuarioCreate, UsuarioRead

router = APIRouter(prefix="/auth", tags=["Autenticação"])


@router.post("/registrar", response_model=UsuarioRead, status_code=status.HTTP_201_CREATED)
def registrar(dados: UsuarioCreate, session: Session = Depends(get_session)):
    """Cria um novo professor (usuário) na plataforma."""

    existente = session.exec(select(Usuario).where(Usuario.email == dados.email)).first()
    if existente:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="E-mail já cadastrado.")

    usuario = Usuario(
        nome=dados.nome,
        nome_exibicao=dados.nome_exibicao,
        email=dados.email,
        senha_hash=hash_senha(dados.senha),
        escola=dados.escola,
        disciplina=dados.disciplina,
    )

    session.add(usuario)
    session.commit()
    session.refresh(usuario)
    return usuario


@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session),
):
    """Autentica o professor e retorna um JWT.

    Segue o padrão `OAuth2PasswordRequestForm` do FastAPI: o formulário
    deve enviar `username` (e-mail) e `password` (senha) como
    `application/x-www-form-urlencoded`. Isso permite usar o botão
    "Authorize" do Swagger e é o formato esperado pela maioria dos
    clientes HTTP (incluindo `fetch` com `URLSearchParams`).
    """

    usuario = session.exec(select(Usuario).where(Usuario.email == form_data.username)).first()

    if not usuario or not verificar_senha(form_data.password, usuario.senha_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = criar_access_token(subject=usuario.email)
    return Token(access_token=access_token)


@router.get("/me", response_model=UsuarioRead)
def me(usuario_atual: Usuario = Depends(get_current_user)):
    """Retorna os dados do professor autenticado."""
    return usuario_atual
