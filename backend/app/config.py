from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configurações centrais da aplicação, carregadas do arquivo .env."""

    PROJECT_NAME: str = "EduInsight IA API"

    # Banco de dados (SQLite por padrão, mas pode ser apontado para Postgres etc.)
    DATABASE_URL: str = "sqlite:///./eduinsight.db"

    # JWT
    SECRET_KEY: str = "troque-esta-chave-em-produção"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 horas

    # IA (Anthropic) - opcional. Se não configurado, o serviço de IA
    # usa um gerador heurístico baseado nas observações registradas.
    ANTHROPIC_API_KEY: Optional[str] = None
    ANTHROPIC_MODEL: str = "claude-sonnet-4-6"

    # CORS - origem do frontend Vite
    FRONTEND_ORIGIN: str = "http://localhost:5173"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
