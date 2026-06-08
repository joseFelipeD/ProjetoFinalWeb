# EduInsight IA — Frontend

Interface web em React para uma plataforma pedagógica voltada a professores dos anos finais do Ensino Fundamental, do 6º ao 9º ano. O sistema permite gerenciar turmas, registrar observações pedagógicas, consultar histórico e gerar relatórios com apoio de IA.

## Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Recharts

## Como executar

```bash
npm install
npm run dev
```

Depois, acesse o endereço exibido no terminal, normalmente:

```txt
http://localhost:5173
```

## Escopo implementado

- Login da professora.
- Dashboard com métricas, gráfico e últimas observações.
- Gerenciamento de turmas dos anos finais do Ensino Fundamental.
- Formulário de nova observação com validação e feedback visual.
- Histórico de observações com filtros por busca, turma e categoria.
- Geração de relatório pedagógico com IA.
- Visualização do relatório com resumo, pontos de atenção e sugestões.
- Perfil do professor.

## Organização do projeto

```txt
src/
  components/
    common/          # componentes reutilizáveis gerais
    layout/          # layout, menu lateral e estrutura da aplicação
    observacoes/     # formulário e tabela de observações
    turmas/          # cards, tabela e formulário de turmas
  data/              # dados iniciais do domínio
  pages/             # telas principais
  styles/            # estilos globais
  types/             # tipos TypeScript do domínio
```

## Componentes principais

- `AppLayout`: estrutura principal com menu lateral e área de conteúdo.
- `Sidebar`: navegação entre as telas do sistema.
- `MetricCard`: card reutilizável para indicadores do dashboard.
- `CategoryBadge`: marcador visual reutilizado para categorias de observação.
- `TurmaCard`: resumo visual de cada turma.
- `TurmaTable`: listagem consolidada das turmas.
- `TurmaForm`: formulário de cadastro de turma.
- `ObservacaoForm`: formulário de registro pedagógico com validação.
- `ObservacaoTable`: tabela do histórico com ações de visualização e exclusão.

## Relação com o domínio

O sistema trabalha com as entidades previstas no planejamento do projeto:

- Professor
- Turma
- Observação
- Relatório com IA

A interface foi delimitada para o papel de professor, evitando excesso de complexidade nesta etapa e mantendo o foco no fluxo principal: registrar observações pedagógicas, acompanhar as turmas e consultar análises para apoiar o planejamento das próximas aulas.
