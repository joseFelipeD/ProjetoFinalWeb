# EduInsight IA — Backend (Sprint 3)

API em **FastAPI + SQLModel** para a plataforma EduInsight IA, com autenticação
**JWT** e geração de relatórios pedagógicos com **IA** (Anthropic Claude, com
fallback heurístico local).

Esta API foi modelada diretamente a partir do frontend da Sprint 2
(`front/src/types/index.ts` e `front/src/data/seedData.ts`), substituindo os
dados mockados por persistência real em banco de dados.

## Estrutura do projeto

```
backend/
├── app/
│   ├── main.py                # ponto de entrada da aplicação FastAPI
│   ├── config.py              # configurações (lidas do .env)
│   ├── database/
│   │   └── session.py         # engine, criação de tabelas e Session
│   ├── models/                # modelos SQLModel (tabelas do banco)
│   │   ├── usuario.py         # Usuario (Professor)
│   │   ├── turma.py           # Turma
│   │   ├── observacao.py      # Observacao
│   │   └── relatorio.py       # RelatorioIA
│   ├── schemas/                # schemas Pydantic (entrada/saída da API)
│   │   ├── base.py             # CamelModel (alias camelCase <-> snake_case)
│   │   ├── usuario.py
│   │   ├── turma.py
│   │   ├── observacao.py
│   │   ├── relatorio.py
│   │   ├── dashboard.py
│   │   └── auth.py
│   ├── auth/
│   │   ├── security.py         # hashing de senha e criação de JWT
│   │   └── dependencies.py     # get_current_user (proteção das rotas)
│   ├── services/
│   │   └── ia_service.py       # funcionalidade de IA (geração de relatórios)
│   └── routes/
│       ├── auth.py              # /auth/registrar, /auth/login, /auth/me
│       ├── usuarios.py          # /usuarios/me
│       ├── turmas.py            # /turmas
│       ├── observacoes.py       # /observacoes
│       ├── relatorios.py        # /relatorios
│       └── dashboard.py         # /dashboard
├── seed.py                      # popula o banco com dados iniciais de exemplo
├── requirements.txt
├── .env.example
└── README.md
```

## Como executar

### 1. Pré-requisitos

- Python 3.11+

### 2. Criar ambiente virtual e instalar dependências

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` se desejar:

- `SECRET_KEY`: troque por um valor aleatório/secreto.
- `ANTHROPIC_API_KEY`: **opcional**. Se preenchida, os relatórios pedagógicos
  são gerados pela API da Anthropic (Claude). Se deixada em branco, o sistema
  usa automaticamente um gerador heurístico local — a API funciona
  normalmente em ambos os casos.

### 4. (Opcional) Popular o banco com dados de exemplo

Cria o mesmo professor, turmas e observações que existiam em
`seedData.ts`, agora persistidos no banco:

```bash
python seed.py
```

Login de teste criado pelo seed:

- **E-mail:** `maria@escola.edu.br`
- **Senha:** `123456`

### 5. Rodar o servidor

```bash
uvicorn app.main:app --reload --port 8000
```

A API ficará disponível em `http://localhost:8000`, e a documentação
interativa (Swagger) em `http://localhost:8000/docs`.

O banco de dados SQLite (`eduinsight.db`) é criado automaticamente na primeira
execução, na raiz da pasta `backend/`.

## Referência de endpoints

Todas as rotas, exceto `/auth/registrar` e `/auth/login`, exigem o header
`Authorization: Bearer <token>` e retornam/recebem JSON em **camelCase**
(alinhado com `front/src/types/index.ts`).

### Autenticação (`/auth`)

| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/registrar` | Cria um novo professor (corpo JSON: `nome`, `nomeExibicao`, `email`, `senha`, `escola`, `disciplina`) |
| POST | `/auth/login` | Autentica (form `application/x-www-form-urlencoded`: `username`=e-mail, `password`=senha) e retorna `{ accessToken, tokenType }` |
| GET | `/auth/me` | Retorna o professor autenticado |

### Usuário / Perfil (`/usuarios`)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/usuarios/me` | Perfil do professor (tela Perfil) |
| PUT | `/usuarios/me` | Atualiza dados do perfil |

### Turmas (`/turmas`)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/turmas?search=` | Lista turmas do professor (com `totalObservacoes`) |
| POST | `/turmas` | Cria turma (`nome`, `serie`, `anoLetivo`, `quantidadeAlunos`, `descricao`) |
| GET | `/turmas/{id}` | Detalhe de uma turma |
| PUT | `/turmas/{id}` | Atualiza uma turma |
| DELETE | `/turmas/{id}` | Remove uma turma (e suas observações/relatórios) |

### Observações (`/observacoes`)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/observacoes?turmaId=&categoria=&busca=` | Lista observações com filtros (tela Histórico) |
| POST | `/observacoes` | Cria observação (`turmaId`, `dataObservacao`, `titulo`, `descricao`, `categoria`) |
| GET | `/observacoes/{id}` | Detalhe de uma observação |
| DELETE | `/observacoes/{id}` | Remove uma observação |

### Dashboard (`/dashboard`)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/dashboard/resumo` | `{ turmasAtivas, observacoesTotal, relatoriosTotal }` para os `MetricCard` |
| GET | `/dashboard/observacoes-por-mes?ano=` | Série mensal para o gráfico de área |

### Relatórios IA (`/relatorios`)

| Método | Rota | Descrição |
|---|---|---|
| POST | `/relatorios/gerar` | Gera (e salva) um relatório de IA. Corpo: `turmaId`, `dataInicio`, `dataFim`, `dimensoes` (lista de strings) |
| GET | `/relatorios?turmaId=` | Histórico de relatórios |
| GET | `/relatorios/ultimo?turmaId=` | Relatório mais recente (banner do Dashboard / tela Relatório IA) |
| GET | `/relatorios/{id}` | Detalhe de um relatório |

## Funcionalidade de IA

`POST /relatorios/gerar` recebe a turma, o período e as dimensões de análise
selecionadas em `GerarRelatorio.tsx`, busca as observações da turma nesse
período e chama `app/services/ia_service.py`:

- Se `ANTHROPIC_API_KEY` estiver definida, o serviço monta um prompt com as
  observações e pede ao modelo um JSON com `resumoGerado`, `pontosAtencao`,
  `sugestoes`, `aproveitamento` e `indicadores` (um valor de 0 a 100 por
  dimensão, usado no gráfico de barras de `RelatorioIA.tsx`).
- Caso contrário (ou se a chamada falhar), um gerador heurístico local produz
  o mesmo formato de resposta a partir da contagem de categorias das
  observações, garantindo que a funcionalidade funcione sem dependências
  externas.

Em ambos os casos, `distribuicaoCategorias` (gráfico de pizza) é calculada
diretamente a partir das observações reais do período.

## Conectando o frontend existente

O frontend atual (`front/`) não faz nenhuma chamada HTTP — tudo vem de
`src/data/seedData.ts` e do estado local em `App.tsx`. Para integrá-lo a esta
API, os principais ajustes são:

1. **Cliente HTTP** — criar `front/src/services/api.ts` centralizando a base
   URL (`http://localhost:8000`), o armazenamento do token JWT (em
   memória/contexto React) e o envio do header `Authorization: Bearer <token>`.

2. **Login (`Login.tsx`)** — em vez de chamar `onLogin()` direto, enviar
   `POST /auth/login` como `application/x-www-form-urlencoded` com
   `username`/`password`, guardar o `accessToken` retornado e só então chamar
   `onLogin()`.

3. **`App.tsx`** — substituir os estados inicializados com
   `turmasIniciais`/`observacoesIniciais`/`relatorioInicial` por chamadas
   `GET /turmas`, `GET /observacoes` e `GET /relatorios/ultimo` em um
   `useEffect` após o login. `addTurma` e `addObservacao` passam a chamar
   `POST /turmas` / `POST /observacoes` e atualizar o estado com a resposta da
   API; `deleteObservacao` passa a chamar `DELETE /observacoes/{id}`.

4. **Dashboard (`Dashboard.tsx`)** — trocar o array `observacoesPorMes`
   importado de `seedData.ts` por `GET /dashboard/observacoes-por-mes`, e os
   três `MetricCard` por `GET /dashboard/resumo`.

5. **Gerar Relatório / Relatório IA** — o botão "Gerar relatório" de
   `GerarRelatorio.tsx` passa a chamar `POST /relatorios/gerar` com
   `turmaId`, `dataInicio` (`inicio`), `dataFim` (`fim`) e `dimensoes`
   (`selecionadas`); o resultado é exibido em `RelatorioIA.tsx`, cujos
   gráficos de barras/pizza passam a usar `indicadores` e
   `distribuicaoCategorias` retornados pela API em vez dos arrays fixos
   `barras`/`pizza`.

6. **Perfil (`Perfil.tsx`)** — passa a receber os dados de `GET /usuarios/me`
   em vez de `professorInicial`.

Como os schemas usam `alias_generator=to_camel`, os nomes dos campos retornados
pela API já correspondem aos tipos `Turma`, `Observacao`, `RelatorioIA` e
`Professor` definidos em `front/src/types/index.ts`, então essas trocas são,
em sua maioria, apenas de "origem do dado" (mock → `fetch`), sem precisar
remodelar os componentes.

Se desejar, posso gerar na sequência os arquivos do frontend já adaptados
(`api.ts`, `Login.tsx`, `App.tsx`, etc.) para consumir esta API.
