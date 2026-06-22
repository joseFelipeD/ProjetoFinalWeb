# Testes Documentados — EduInsight IA

**Sprint 4 | Modalidade:** Testes Manuais  
**Ambiente testado:** Produção (https://projeto-final-web-phi.vercel.app)  
**Data:** 22/06/2026

---

## Metodologia

Os testes foram realizados manualmente seguindo o fluxo principal do sistema. Cada caso de teste descreve a ação executada, o resultado esperado e o resultado obtido. Os testes cobrem os fluxos críticos de autenticação, gerenciamento de turmas, registro de observações e geração de relatórios com IA.

---

## CT-01 — Cadastro de novo usuário

**Fluxo:** Autenticação  
**Pré-condição:** Nenhuma conta cadastrada com o e-mail usado no teste

| Campo | Valor |
|---|---|
| **Ação** | Acessar `/docs` → `POST /auth/registrar` → preencher nome, e-mail, senha, escola e disciplina → Execute |
| **Resultado esperado** | Status `201 Created` com dados do usuário criado |
| **Resultado obtido** | ✅ Status `201 Created` — usuário criado com sucesso |

---

## CT-02 — Login com credenciais válidas

**Fluxo:** Autenticação  
**Pré-condição:** Usuário cadastrado (CT-01)

| Campo | Valor |
|---|---|
| **Ação** | Acessar a tela de login → informar e-mail e senha cadastrados → clicar em Entrar |
| **Resultado esperado** | Redirecionamento para o Dashboard |
| **Resultado obtido** | ✅ Login realizado com sucesso — Dashboard exibido |

---

## CT-03 — Login com credenciais inválidas

**Fluxo:** Autenticação  
**Pré-condição:** Nenhuma

| Campo | Valor |
|---|---|
| **Ação** | Informar e-mail correto e senha errada → clicar em Entrar |
| **Resultado esperado** | Mensagem de erro "E-mail ou senha incorretos" |
| **Resultado obtido** | ✅ Erro exibido corretamente, acesso negado |

---

## CT-04 — Criação de turma

**Fluxo:** Turmas  
**Pré-condição:** Usuário autenticado

| Campo | Valor |
|---|---|
| **Ação** | Navegar para Turmas → clicar em "Adicionar Turma" → preencher nome, série e ano letivo → Salvar |
| **Resultado esperado** | Turma aparece na listagem com os dados informados |
| **Resultado obtido** | ✅ Turma criada e exibida corretamente na listagem |

---

## CT-05 — Listagem de turmas

**Fluxo:** Turmas  
**Pré-condição:** Pelo menos uma turma cadastrada (CT-04)

| Campo | Valor |
|---|---|
| **Ação** | Navegar para a tela Turmas |
| **Resultado esperado** | Turmas do professor autenticado são exibidas com nome, série e total de observações |
| **Resultado obtido** | ✅ Listagem exibida corretamente |

---

## CT-06 — Registro de observação pedagógica

**Fluxo:** Observações  
**Pré-condição:** Pelo menos uma turma cadastrada

| Campo | Valor |
|---|---|
| **Ação** | Navegar para "Nova Observação" → selecionar turma → preencher título, categoria, data e descrição → Salvar |
| **Resultado esperado** | Observação salva e acessível no histórico |
| **Resultado obtido** | ✅ Observação registrada com sucesso |

---

## CT-07 — Histórico de observações com filtro

**Fluxo:** Histórico  
**Pré-condição:** Pelo menos uma observação registrada (CT-06)

| Campo | Valor |
|---|---|
| **Ação** | Navegar para Histórico → aplicar filtro por turma |
| **Resultado esperado** | Apenas observações da turma filtrada são exibidas |
| **Resultado obtido** | ✅ Filtro funcionando corretamente |

---

## CT-08 — Geração de relatório com IA

**Fluxo:** Relatório IA  
**Pré-condição:** Pelo menos uma observação registrada em uma turma

| Campo | Valor |
|---|---|
| **Ação** | Navegar para "Gerar Relatório" → selecionar turma e período → clicar em Gerar |
| **Resultado esperado** | Relatório gerado com resumo, pontos de atenção e sugestões |
| **Resultado obtido** | ✅ Relatório gerado com sucesso pela IA |

---

## CT-09 — Acesso a rota protegida sem autenticação

**Fluxo:** Segurança  
**Pré-condição:** Nenhuma sessão ativa

| Campo | Valor |
|---|---|
| **Ação** | Tentar acessar `/turmas` diretamente pela URL sem estar logado |
| **Resultado esperado** | Redirecionamento para a tela de login |
| **Resultado obtido** | ✅ Redirecionamento realizado corretamente |

---

## CT-10 — Exclusão de turma

**Fluxo:** Turmas  
**Pré-condição:** Pelo menos uma turma cadastrada

| Campo | Valor |
|---|---|
| **Ação** | Selecionar turma na listagem → clicar em Excluir → confirmar ação |
| **Resultado esperado** | Turma removida da listagem |
| **Resultado obtido** | ✅ Turma excluída com sucesso |

---

## CT-11 — Dashboard com métricas

**Fluxo:** Dashboard  
**Pré-condição:** Pelo menos uma observação e um relatório registrados

| Campo | Valor |
|---|---|
| **Ação** | Navegar para o Dashboard |
| **Resultado esperado** | Gráficos e métricas atualizados com os dados do professor |
| **Resultado obtido** | ✅ Dashboard exibindo métricas e gráficos corretamente |

---

## CT-12 — Persistência de sessão

**Fluxo:** Autenticação  
**Pré-condição:** Usuário autenticado

| Campo | Valor |
|---|---|
| **Ação** | Fechar e reabrir o navegador → acessar o sistema |
| **Resultado esperado** | Sessão mantida, usuário não precisa fazer login novamente |
| **Resultado obtido** | ✅ Sessão persistida via token JWT no localStorage |

---

## Resumo dos Resultados

| Total de casos | Passou | Falhou |
|---|---|---|
| 12 | ✅ 12 | ❌ 0 |

---

## O que ficou fora do escopo por limitação de tempo

- Testes automatizados (unitários e de integração com pytest)
- Testes de carga e performance
- Testes em múltiplos navegadores (apenas Chrome testado)
- Testes de acessibilidade (WCAG)
- Recuperação de senha
- Edição de observações já registradas
