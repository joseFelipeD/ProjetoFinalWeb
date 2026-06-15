"""Script de seed: popula o banco com dados iniciais equivalentes aos de
`front/src/data/seedData.ts`, agora persistidos no banco de dados real.

Uso:
    python seed.py

Cria (se ainda não existirem):
  - o professor "Maria Aparecida Silva" (login: maria@escola.edu.br / 123456)
  - as 4 turmas (6º Ano A, 6º Ano B, 7º Ano A, 8º Ano A)
  - as observações iniciais de exemplo

Assim, ao subir o backend e o frontend integrados, a tela inicial fica
parecida com a versão mockada da Sprint 2 — mas com dados reais.
"""

from datetime import date

from sqlmodel import Session, select

from app.auth.security import hash_senha
from app.database.session import engine, init_db
from app.models.observacao import Observacao
from app.models.turma import Turma
from app.models.usuario import Usuario

PROFESSOR_EMAIL = "maria@escola.edu.br"
PROFESSOR_SENHA = "123456"


def seed() -> None:
    init_db()

    with Session(engine) as session:
        professor = session.exec(
            select(Usuario).where(Usuario.email == PROFESSOR_EMAIL)
        ).first()

        if professor:
            print("Seed já aplicado anteriormente - nada a fazer.")
            return

        professor = Usuario(
            nome="Maria Aparecida Silva",
            nome_exibicao="Profa. Maria Silva",
            email=PROFESSOR_EMAIL,
            senha_hash=hash_senha(PROFESSOR_SENHA),
            escola="EMEF João Pessoa",
            disciplina="Língua Portuguesa",
        )
        session.add(professor)
        session.commit()
        session.refresh(professor)

        turmas_iniciais = [
            Turma(
                nome="6º Ano A",
                serie="6º ano",
                ano_letivo=2026,
                quantidade_alunos=29,
                descricao="Turma dos anos finais com foco em leitura, interpretação e produção textual.",
                cor="azul",
                usuario_id=professor.id,
            ),
            Turma(
                nome="6º Ano B",
                serie="6º ano",
                ano_letivo=2026,
                quantidade_alunos=31,
                descricao="Turma com boa participação em atividades coletivas e desafios de organização.",
                cor="roxo",
                usuario_id=professor.id,
            ),
            Turma(
                nome="7º Ano A",
                serie="7º ano",
                ano_letivo=2026,
                quantidade_alunos=27,
                descricao="Turma com registros frequentes sobre comportamento, leitura e avaliação.",
                cor="verde",
                usuario_id=professor.id,
            ),
            Turma(
                nome="8º Ano A",
                serie="8º ano",
                ano_letivo=2026,
                quantidade_alunos=25,
                descricao="Turma com maior autonomia, mas com pontos de atenção em assiduidade.",
                cor="ciano",
                usuario_id=professor.id,
            ),
        ]
        session.add_all(turmas_iniciais)
        session.commit()
        for turma in turmas_iniciais:
            session.refresh(turma)

        turma_6a, turma_6b, turma_7a, turma_8a = turmas_iniciais

        observacoes_iniciais = [
            Observacao(
                turma_id=turma_6a.id,
                usuario_id=professor.id,
                data_observacao=date(2026, 6, 3),
                titulo="Dificuldades de leitura interpretativa em textos narrativos",
                descricao=(
                    "Durante a atividade de leitura, parte da turma apresentou "
                    "dificuldade para identificar informações implícitas e "
                    "justificar respostas com trechos do texto."
                ),
                categoria="Aprendizagem",
            ),
            Observacao(
                turma_id=turma_6b.id,
                usuario_id=professor.id,
                data_observacao=date(2026, 6, 3),
                titulo="Boa participação em atividade coletiva de Ciências",
                descricao=(
                    "A turma participou bem da dinâmica em grupo, com divisão "
                    "espontânea de tarefas e troca de ideias entre os alunos."
                ),
                categoria="Participação",
            ),
            Observacao(
                turma_id=turma_7a.id,
                usuario_id=professor.id,
                data_observacao=date(2026, 6, 2),
                titulo="Conflito entre alunos durante atividade cooperativa",
                descricao=(
                    "Houve conflito verbal entre dois grupos durante uma "
                    "atividade. Foi necessária mediação e reorganização dos "
                    "papéis dentro dos grupos."
                ),
                categoria="Comportamento",
            ),
            Observacao(
                turma_id=turma_6a.id,
                usuario_id=professor.id,
                data_observacao=date(2026, 6, 1),
                titulo="Progresso na resolução de problemas matemáticos contextualizados",
                descricao=(
                    "Os estudantes demonstraram melhor compreensão na "
                    "interpretação de enunciados quando trabalharam com "
                    "exemplos próximos do cotidiano."
                ),
                categoria="Avaliação",
            ),
            Observacao(
                turma_id=turma_8a.id,
                usuario_id=professor.id,
                data_observacao=date(2026, 5, 31),
                titulo="Atrasos recorrentes na entrega de atividades domiciliares",
                descricao=(
                    "Alguns estudantes não entregaram as atividades dentro do "
                    "prazo. Recomenda-se acompanhar se o problema está ligado "
                    "à rotina de estudos ou compreensão da proposta."
                ),
                categoria="Assiduidade",
            ),
            Observacao(
                turma_id=turma_6a.id,
                usuario_id=professor.id,
                data_observacao=date(2026, 5, 30),
                titulo="Interesse em atividades práticas de laboratório",
                descricao=(
                    "A turma demonstrou maior engajamento quando a atividade "
                    "envolveu observação prática e registro colaborativo dos "
                    "resultados."
                ),
                categoria="Participação",
            ),
        ]
        session.add_all(observacoes_iniciais)
        session.commit()

        print("Seed aplicado com sucesso!")
        print(f"Professor: {PROFESSOR_EMAIL} / senha: {PROFESSOR_SENHA}")
        print(f"{len(turmas_iniciais)} turmas e {len(observacoes_iniciais)} observações criadas.")


if __name__ == "__main__":
    seed()
