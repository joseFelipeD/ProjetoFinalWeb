from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class CamelModel(BaseModel):
    """Modelo Pydantic base que expõe (e aceita) os campos em camelCase.

    Os modelos do banco usam snake_case (ex: `ano_letivo`), mas o
    frontend (`types/index.ts`) usa camelCase (ex: `anoLetivo`). Com esse
    `alias_generator`, o JSON trocado com o frontend já sai/entra em
    camelCase sem precisar renomear nada na API.
    """

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )
