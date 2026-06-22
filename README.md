# EduInsight IA

Plataforma pedagógica para registro de observações de turmas e geração de relatórios inteligentes com IA.

> **Sistema em produção:**
> - 🌐 Frontend: https://projeto-final-web-phi.vercel.app
> - ⚙️ API: https://eduinsight-back.onrender.com
> - 📄 Documentação da API: https://eduinsight-back.onrender.com/docs

---

## Funcionalidades

- Cadastro e autenticação de professores (JWT)
- Gerenciamento de turmas
- Registro de observações pedagógicas por categoria
- Geração de relatórios com IA (Google Gemini)
- Dashboard com gráficos e métricas
- Histórico de observações com filtros

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS |
| Backend | FastAPI + SQLModel + Python 3.11 |
| Banco de dados | PostgreSQL (produção) / SQLite (desenvolvimento) |
| Autenticação | JWT (python-jose) |
| IA | Google Gemini 2.0 Flash |
| Deploy | Render (backend + banco) + Vercel (frontend) |

---

## Estrutura do Repositório

```
ProjetoFinalWeb/
├── backend/          # API FastAPI
│   ├── app/
│   │   ├── auth/         # JWT e dependências de autenticação
│   │   ├── database/     # Sessão e init do banco
│   │   ├── models/       # Modelos SQLModel
│   │   ├── routes/       # Endpoints da API
│   │   ├── schemas/      # Schemas Pydantic
│   │   ├── services/     # Serviço de IA
│   │   └── main.py       # Entry point da API
│   ├── .env.example
│   ├── requirements.txt
│   └── seed.py
└── front/            # Aplicação React
    ├── src/
    │   ├── components/   # Componentes reutilizáveis
    │   ├── pages/        # Telas da aplicação
    │   ├── services/     # Integração com a API
    │   └── contexts/     # AuthContext
    ├── .env.example
    └── vercel.json
```

---

## Como rodar localmente

### Pré-requisitos

- Python 3.11+
- Node.js 18+
- Git

---

### Backend

```bash
# 1. Entre na pasta do backend
cd backend

# 2. Crie e ative o ambiente virtual
python3 -m venv .venv
source .venv/bin/activate        # Linux/macOS
.venv\Scripts\activate           # Windows

# 3. Instale as dependências
pip install -r requirements.txt

# 4. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com seus valores (SECRET_KEY obrigatória)

# 5. Inicie o servidor
uvicorn app.main:app --reload
```

A API estará disponível em: http://localhost:8000
Documentação interativa: http://localhost:8000/docs

---

### Frontend

```bash
# 1. Entre na pasta do frontend
cd front

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Defina VITE_API_URL=http://localhost:8000

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em: http://localhost:5173

---

## Variáveis de Ambiente

### Backend (`backend/.env`)

| Variável | Descrição | Obrigatória |
|---|---|---|
| `DATABASE_URL` | URL de conexão com o banco (SQLite ou PostgreSQL) | Sim |
| `SECRET_KEY` | Chave secreta para assinar os tokens JWT | Sim |
| `ALGORITHM` | Algoritmo JWT (padrão: `HS256`) | Sim |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Tempo de expiração do token em minutos | Sim |
| `FRONTEND_ORIGIN` | URL do frontend (para configuração do CORS) | Sim |
| `GEMINI_API_KEY` | Chave da API do Google Gemini (opcional) | Não |
| `GEMINI_MODEL` | Modelo do Gemini (padrão: `gemini-2.0-flash`) | Não |

> ⚠️ **Nunca commite o arquivo `.env` no repositório.** O arquivo `.env.example` serve como referência e não contém valores reais.

### Frontend (`front/.env`)

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base da API do backend |

---

## Gerando a SECRET_KEY

```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

---

## Deploy em Produção

Consulte o arquivo `DEPLOY_GUIDE.md` para instruções completas de deploy no Render + Vercel.
