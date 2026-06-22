# Manual do Usuário — EduInsight IA

**Plataforma pedagógica para registro de observações e geração de relatórios inteligentes**

🌐 Acesse em: https://projeto-final-web-phi.vercel.app

---

## O que é o EduInsight IA?

O EduInsight IA é uma plataforma para professores da educação básica registrarem observações sobre suas turmas e receberem análises automáticas geradas por Inteligência Artificial.

Com ele você pode:
- Registrar o que aconteceu nas suas aulas de forma organizada
- Consultar o histórico de observações por turma e período
- Gerar relatórios pedagógicos automáticos com IA
- Identificar padrões e receber sugestões para suas próximas aulas

---

## Primeiros Passos

### 1. Criar sua conta

1. Acesse https://projeto-final-web-phi.vercel.app
2. Clique em **Criar conta**
3. Preencha seus dados:
   - Nome completo
   - Nome de exibição
   - E-mail
   - Senha
   - Escola onde leciona
   - Disciplina que ensina
4. Clique em **Cadastrar**

---

### 2. Fazer login

1. Na tela inicial, informe seu **e-mail** e **senha**
2. Clique em **Entrar**
3. Você será direcionado ao **Dashboard**

---

## Telas do Sistema

### Dashboard

A tela inicial após o login. Exibe um resumo das suas atividades:

- Total de turmas cadastradas
- Total de observações registradas
- Gráficos com a distribuição das observações por categoria
- Acesso rápido ao último relatório gerado

---

### Turmas

Gerencie suas turmas nesta tela.

**Para adicionar uma turma:**
1. Clique em **Adicionar Turma**
2. Preencha o nome da turma (ex: "Turma A"), a série (ex: "9º ano") e o ano letivo
3. Clique em **Salvar**

**Para excluir uma turma:**
1. Localize a turma na listagem
2. Clique no ícone de exclusão
3. Confirme a ação

> ⚠️ Ao excluir uma turma, todas as observações e relatórios vinculados a ela também serão removidos.

---

### Nova Observação

Registre o que aconteceu na aula.

1. Clique em **Nova Observação** no menu lateral
2. Selecione a **turma**
3. Informe a **data da observação**
4. Dê um **título** para a observação (ex: "Atividade de frações")
5. Escolha a **categoria**:
   - Participação
   - Dificuldade
   - Comportamento
   - Desempenho
   - Engajamento
   - Outro
6. Escreva a **descrição** detalhada do que foi observado
7. Clique em **Salvar**

---

### Histórico

Consulte todas as observações já registradas.

- Use o **filtro por turma** para ver observações de uma turma específica
- Use o **filtro por categoria** para focar em um tipo de observação
- Use a **barra de busca** para encontrar observações por palavra-chave no título ou descrição

---

### Gerar Relatório com IA

Solicite uma análise automática das suas observações.

1. Clique em **Gerar Relatório** no menu lateral
2. Selecione a **turma**
3. Informe o **período** (data de início e data de fim)
4. Selecione as **dimensões** que deseja analisar (ex: participação, dificuldades)
5. Clique em **Gerar Relatório**
6. Aguarde alguns segundos enquanto a IA processa os dados

> ℹ️ É necessário ter ao menos uma observação registrada no período para gerar o relatório.

---

### Relatório com IA

Visualize o relatório gerado mais recentemente.

O relatório apresenta:
- **Resumo geral** da turma no período
- **Pontos de atenção** identificados pela IA
- **Sugestões** de estratégias para as próximas aulas
- **Indicadores** de aproveitamento
- **Gráficos** de distribuição por categoria

---

### Perfil

Visualize e edite suas informações pessoais: nome de exibição, escola e disciplina.

---

## Dúvidas Frequentes

**O sistema é gratuito?**
Sim, o acesso à plataforma é gratuito.

**Posso ter mais de uma turma?**
Sim, não há limite de turmas cadastradas.

**O que acontece se eu não tiver observações no período selecionado para o relatório?**
O sistema exibirá uma mensagem informando que não há observações para o período. Registre ao menos uma observação antes de gerar o relatório.

**Meus dados são privados?**
Sim. Cada professor acessa apenas as suas próprias turmas, observações e relatórios. Os dados são protegidos por autenticação JWT.

**O sistema pode ficar lento ao carregar?**
No plano gratuito do Render, o servidor pode demorar até 50 segundos para responder após um período de inatividade. Basta aguardar e a página carregará normalmente.

---

## Suporte

Em caso de dúvidas ou problemas, entre em contato com a equipe de desenvolvimento pelo repositório do projeto no GitHub:
https://github.com/joseFelipeD/ProjetoFinalWeb
