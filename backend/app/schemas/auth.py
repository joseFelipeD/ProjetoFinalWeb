from app.schemas.base import CamelModel


class Token(CamelModel):
    access_token: str
    token_type: str = "bearer"
