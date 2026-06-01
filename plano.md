# Plano de Execução – EduInsight IA

## 1. Descrição do Problema

Professores da educação básica realizam observações constantes sobre suas turmas durante as aulas, registrando aspectos como participação, dificuldades de aprendizagem, comportamento, engajamento e desempenho em atividades.

Essas informações geralmente ficam dispersas em anotações pessoais, dificultando a análise do progresso da turma ao longo do tempo e a identificação de padrões que possam auxiliar no planejamento pedagógico.

O projeto propõe um sistema web que permite registrar observações pedagógicas e utilizar Inteligência Artificial para gerar análises automáticas, resumos e sugestões de estratégias de ensino.

---

## 2. Usuários-Alvo

### Usuário Principal

* Professores da Educação Básica

### Usuários Secundários

* Coordenadores pedagógicos
* Equipe gestora da escola

---

## 3. Solução Proposta

O sistema permitirá que o professor registre observações sobre suas turmas após as aulas.

Essas observações poderão incluir informações sobre:

* Participação dos alunos
* Dificuldades identificadas
* Comportamento da turma
* Conteúdos com maior dificuldade
* Resultados de atividades realizadas

Com base nesses registros, a Inteligência Artificial será utilizada para:

* Gerar resumos periódicos da turma
* Identificar pontos de atenção recorrentes
* Destacar tendências observadas
* Sugerir estratégias para as próximas aulas

---

## 4. Entidades do Sistema

### Usuário

Campos:

* id
* nome
* email
* senha
* data_criacao

### Turma

Campos:

* id
* nome
* serie
* ano_letivo
* descricao

### Observacao

Campos:

* id
* turma_id
* usuario_id
* data_observacao
* titulo
* descricao
* categoria
* data_criacao

### RelatorioIA

Campos:

* id
* turma_id
* periodo
* resumo_gerado
* pontos_atencao
* sugestoes
* data_geracao

---

## 5. Funcionalidade de Inteligência Artificial

### Análise Pedagógica Automatizada

A IA receberá um conjunto de observações registradas pelo professor durante determinado período.

Com base nesses registros, ela será capaz de:

* Resumir os acontecimentos mais relevantes
* Identificar dificuldades recorrentes
* Detectar padrões de comportamento ou aprendizagem
* Sugerir abordagens pedagógicas para aulas futuras

### Exemplo

Entrada:

* Baixa participação em atividades de matemática.
* Dificuldade recorrente com frações.
* Boa participação em atividades práticas.

Saída:

Resumo:
"A turma apresentou bom engajamento em atividades práticas, porém demonstrou dificuldades frequentes em conteúdos relacionados a frações."

Pontos de atenção:

* Baixa participação em matemática.
* Dificuldade em frações.

Sugestões:

* Utilizar materiais concretos.
* Aplicar atividades colaborativas.
* Revisar conceitos fundamentais antes de avançar para novos conteúdos.

---

## 6. Fluxo Principal do Sistema

1. Professor realiza login.
2. Seleciona uma turma.
3. Registra observações pedagógicas.
4. As observações são armazenadas no banco de dados.
5. O professor solicita uma análise do período.
6. A IA processa os registros.
7. O sistema gera relatório pedagógico inteligente.
8. O professor consulta os resultados e utiliza as sugestões no planejamento das próximas aulas.

---

## 7. Distribuição Preliminar das Sprints

### Sprint 1

* Definição do escopo
* Modelagem das entidades
* Plano de execução
* Protótipo visual

### Sprint 2

* Desenvolvimento do frontend React
* Telas com dados simulados
* Componentes reutilizáveis

### Sprint 3

* Backend FastAPI
* Banco de dados SQLModel
* Autenticação JWT
* Integração com IA para geração dos relatórios

### Sprint 4

* Testes
* Deploy
* Manual do usuário
* Documentação final
* Ajustes e correções

