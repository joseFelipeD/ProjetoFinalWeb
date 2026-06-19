"""Serviço de geração de relatórios pedagógicos com IA.

Esta é a funcionalidade de IA exigida pela Sprint 3 (ver `plano.md`,
seção 5 - "Análise Pedagógica Automatizada"): a partir das observações
registradas pelo professor em um período, o sistema gera um resumo,
pontos de atenção e sugestões pedagógicas para a turma.

Duas estratégias são suportadas:

1. `_gerar_relatorio_gemini`: usa a API do Google Gemini para produzir
   uma análise em linguagem natural, caso `GEMINI_API_KEY` esteja
   configurada no `.env`.
2. `_gerar_relatorio_heuristico`: gerador local baseado em regras,
   usado como fallback (ou quando nenhuma chave de API é configurada),
   garantindo que o projeto funcione "fora da caixa" mesmo sem acesso a
   uma IA externa.

Em ambos os casos, `distribuicao_categorias` é sempre calculada a partir
dos dados reais do banco (contagem de observações por categoria no
período), pois é um dado factual e não precisa de IA.
"""

import json
from collections import Counter
from typing import Dict, List

from app.config import settings
from app.models.observacao import Observacao
from app.models.turma import Turma

# Mapeia cada "dimensão de análise" (selecionável em GerarRelatorio.tsx)
# para a categoria de observação mais relacionada a ela.
DIMENSAO_PARA_CATEGORIA: Dict[str, str] = {
    "Comportamento e disciplina": "Comportamento",
    "Desenvolvimento de aprendizagem": "Aprendizagem",
    "Participação e engajamento": "Participação",
    "Avaliações e desempenho": "Avaliação",
    "Relacionamento interpessoal": "Comportamento",
    "Assiduidade e compromisso": "Assiduidade",
}

# Categorias cuja alta frequência indica um ponto de atenção (pioram o
# indicador da dimensão e o aproveitamento geral).
CATEGORIAS_DE_ATENCAO = {"Comportamento", "Assiduidade"}


def _distribuicao_categorias(observacoes: List[Observacao]) -> Dict[str, int]:
    """Conta quantas observações existem por categoria no período."""
    contagem = Counter(obs.categoria for obs in observacoes)
    return dict(contagem)


def _indicadores_por_dimensao(
    distribuicao: Dict[str, int], total: int, dimensoes: List[str]
) -> Dict[str, int]:
    """Calcula um indicador (0-100) para cada dimensão selecionada,
    alimentando o gráfico de barras de `RelatorioIA.tsx`."""

    indicadores: Dict[str, int] = {}
    for dimensao in dimensoes:
        categoria = DIMENSAO_PARA_CATEGORIA.get(dimensao)
        ocorrencias = distribuicao.get(categoria, 0) if categoria else 0
        proporcao = ocorrencias / total if total else 0

        if categoria in CATEGORIAS_DE_ATENCAO:
            # Quanto mais registros de comportamento/assiduidade, menor o indicador.
            indicadores[dimensao] = max(40, round(100 - proporcao * 100))
        else:
            # Quanto mais registros relacionados a aprendizagem/participação/
            # avaliação, maior o indicador (mais material para análise).
            indicadores[dimensao] = min(100, round(60 + proporcao * 100))

    return indicadores


def _calcular_aproveitamento(distribuicao: Dict[str, int], total: int) -> int:
    """Calcula um percentual geral de aproveitamento (0-100) a partir da
    proporção de registros de comportamento/assiduidade."""

    if total == 0:
        return 50

    negativos = sum(distribuicao.get(cat, 0) for cat in CATEGORIAS_DE_ATENCAO)
    proporcao_negativa = negativos / total
    return max(30, min(100, round(100 - proporcao_negativa * 60)))


def _gerar_relatorio_heuristico(
    turma: Turma, observacoes: List[Observacao], dimensoes: List[str]
) -> dict:
    """Gera o relatório pedagógico sem depender de uma API externa,
    combinando contagens e pequenas regras pedagógicas."""

    distribuicao = _distribuicao_categorias(observacoes)
    total = len(observacoes)
    indicadores = _indicadores_por_dimensao(distribuicao, total, dimensoes)
    aproveitamento = _calcular_aproveitamento(distribuicao, total)

    categoria_mais_frequente = max(distribuicao, key=distribuicao.get) if distribuicao else None

    resumo = (
        f"No período analisado, a turma {turma.nome} ({turma.serie}) registrou "
        f"{total} observação(ões) pedagógica(s)."
    )
    if categoria_mais_frequente:
        resumo += (
            f" A categoria mais recorrente foi '{categoria_mais_frequente}', "
            f"presente em {distribuicao[categoria_mais_frequente]} registro(s)."
        )
    resumo += (
        " Os registros indicam pontos a reforçar e avanços que podem orientar "
        "o planejamento das próximas aulas."
    )

    pontos_atencao: List[str] = []
    sugestoes: List[str] = []

    if distribuicao.get("Comportamento"):
        pontos_atencao.append(
            f"Foram registrados {distribuicao['Comportamento']} episódio(s) "
            "relacionados a comportamento da turma."
        )
        sugestoes.append(
            "Reforçar acordos de convivência e realizar rodas de conversa para "
            "mediar conflitos identificados."
        )

    if distribuicao.get("Aprendizagem"):
        pontos_atencao.append(
            f"Há {distribuicao['Aprendizagem']} registro(s) relacionados a "
            "dificuldades de aprendizagem."
        )
        sugestoes.append(
            "Retomar os conceitos com maior dificuldade usando exemplos "
            "práticos e atividades de reforço em pequenos grupos."
        )

    if distribuicao.get("Assiduidade"):
        pontos_atencao.append(
            f"Foram identificados {distribuicao['Assiduidade']} registro(s) "
            "relacionados à assiduidade/entrega de atividades."
        )
        sugestoes.append(
            "Acompanhar individualmente os estudantes com atrasos recorrentes "
            "e dialogar sobre a rotina de estudos."
        )

    if distribuicao.get("Participação"):
        sugestoes.append(
            "Manter e ampliar atividades práticas e colaborativas, que "
            "apresentaram boa participação da turma."
        )

    if distribuicao.get("Avaliação"):
        sugestoes.append(
            "Utilizar os resultados das avaliações para planejar revisões "
            "direcionadas antes de novas atividades avaliativas."
        )

    if not pontos_atencao:
        pontos_atencao.append(
            "Não foram identificados pontos críticos recorrentes no período analisado."
        )

    if not sugestoes:
        sugestoes.append(
            "Continuar com as estratégias pedagógicas atuais, que vêm "
            "apresentando bons resultados."
        )

    return {
        "resumo_gerado": resumo,
        "pontos_atencao": pontos_atencao,
        "sugestoes": sugestoes,
        "aproveitamento": aproveitamento,
        "indicadores": indicadores,
        "distribuicao_categorias": distribuicao,
    }


def _gerar_relatorio_gemini(
    turma: Turma, observacoes: List[Observacao], dimensoes: List[str]
) -> dict:
    """Gera o relatório pedagógico usando a API do Google Gemini.

    Requer `GEMINI_API_KEY` configurada no `.env`. Em caso de erro
    (rede, parsing, etc.), a exceção é propagada e tratada pela função
    pública `gerar_relatorio_pedagogico`, que recorre ao gerador
    heurístico.
    """

    import google.generativeai as genai

    genai.configure(api_key=settings.GEMINI_API_KEY)
    model = genai.GenerativeModel(settings.GEMINI_MODEL)

    registros = "\n".join(
        f"- [{obs.data_observacao.isoformat()}] ({obs.categoria}) "
        f"{obs.titulo}: {obs.descricao}"
        for obs in observacoes
    )

    prompt = (
        "Você é um assistente pedagógico que auxilia professores da "
        "educação básica.\n\n"
        f"Analise as observações abaixo sobre a turma \"{turma.nome}\" "
        f"({turma.serie}, ano letivo {turma.ano_letivo}).\n\n"
        "Observações registradas pelo professor:\n"
        f"{registros}\n\n"
        f"Dimensões de análise solicitadas: {', '.join(dimensoes)}.\n\n"
        "Responda com um JSON no seguinte formato:\n"
        "{\n"
        '  "resumo_gerado": "resumo com 2 a 4 frases sobre a turma",\n'
        '  "pontos_atencao": ["ponto 1", "ponto 2"],\n'
        '  "sugestoes": ["sugestão 1", "sugestão 2"],\n'
        '  "aproveitamento": numero_inteiro_de_0_a_100,\n'
        '  "indicadores": {"dimensao": numero_inteiro_de_0_a_100}\n'
        "}\n\n"
        "O campo \"indicadores\" deve conter exatamente uma chave para "
        "cada dimensão solicitada, com valores entre 0 e 100."
    )

    resposta = model.generate_content(
        prompt,
        generation_config={"response_mime_type": "application/json"},
    )

    dados = json.loads(resposta.text)

    # A distribuição por categoria é sempre calculada a partir dos dados reais.
    dados["distribuicao_categorias"] = _distribuicao_categorias(observacoes)

    # Garante que todos os campos esperados existam mesmo que o modelo
    # esqueça algum (evita erro de validação do schema de resposta).
    dados.setdefault("pontos_atencao", [])
    dados.setdefault("sugestoes", [])
    dados.setdefault("indicadores", {})
    dados.setdefault("aproveitamento", 50)

    return dados


def gerar_relatorio_pedagogico(
    turma: Turma, observacoes: List[Observacao], dimensoes: List[str]
) -> dict:
    """Ponto de entrada do serviço de IA.

    Tenta usar a API do Gemini caso esteja configurada; em qualquer falha
    (ou se a chave não estiver configurada), recorre ao gerador
    heurístico local, garantindo que `POST /relatorios/gerar` sempre
    retorne um resultado válido.
    """

    if settings.GEMINI_API_KEY:
        try:
            return _gerar_relatorio_gemini(turma, observacoes, dimensoes)
        except Exception:
            return _gerar_relatorio_heuristico(turma, observacoes, dimensoes)

    return _gerar_relatorio_heuristico(turma, observacoes, dimensoes)
