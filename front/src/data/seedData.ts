import type { CategoriaObservacao, Observacao, Professor, RelatorioIA, Turma } from '../types';

export const professorInicial: Professor = {
  id: 1,
  nome: 'Maria Aparecida Silva',
  nomeExibicao: 'Profa. Maria Silva',
  email: 'maria@escola.edu.br',
  escola: 'EMEF João Pessoa',
  disciplina: 'Língua Portuguesa'
};

export const categorias: CategoriaObservacao[] = [
  'Aprendizagem',
  'Comportamento',
  'Participação',
  'Avaliação',
  'Assiduidade',
  'Outros'
];

export const turmasIniciais: Turma[] = [
  {
    id: 1,
    nome: '6º Ano A',
    serie: '6º ano',
    anoLetivo: 2026,
    quantidadeAlunos: 29,
    descricao: 'Turma dos anos finais com foco em leitura, interpretação e produção textual.',
    cor: 'azul'
  },
  {
    id: 2,
    nome: '6º Ano B',
    serie: '6º ano',
    anoLetivo: 2026,
    quantidadeAlunos: 31,
    descricao: 'Turma com boa participação em atividades coletivas e desafios de organização.',
    cor: 'roxo'
  },
  {
    id: 3,
    nome: '7º Ano A',
    serie: '7º ano',
    anoLetivo: 2026,
    quantidadeAlunos: 27,
    descricao: 'Turma com registros frequentes sobre comportamento, leitura e avaliação.',
    cor: 'verde'
  },
  {
    id: 4,
    nome: '8º Ano A',
    serie: '8º ano',
    anoLetivo: 2026,
    quantidadeAlunos: 25,
    descricao: 'Turma com maior autonomia, mas com pontos de atenção em assiduidade.',
    cor: 'ciano'
  }
];

export const observacoesIniciais: Observacao[] = [
  {
    id: 1,
    turmaId: 1,
    dataObservacao: '2026-06-03',
    titulo: 'Dificuldades de leitura interpretativa em textos narrativos',
    descricao: 'Durante a atividade de leitura, parte da turma apresentou dificuldade para identificar informações implícitas e justificar respostas com trechos do texto.',
    categoria: 'Aprendizagem'
  },
  {
    id: 2,
    turmaId: 2,
    dataObservacao: '2026-06-03',
    titulo: 'Boa participação em atividade coletiva de Ciências',
    descricao: 'A turma participou bem da dinâmica em grupo, com divisão espontânea de tarefas e troca de ideias entre os alunos.',
    categoria: 'Participação'
  },
  {
    id: 3,
    turmaId: 3,
    dataObservacao: '2026-06-02',
    titulo: 'Conflito entre alunos durante atividade cooperativa',
    descricao: 'Houve conflito verbal entre dois grupos durante uma atividade. Foi necessária mediação e reorganização dos papéis dentro dos grupos.',
    categoria: 'Comportamento'
  },
  {
    id: 4,
    turmaId: 1,
    dataObservacao: '2026-06-01',
    titulo: 'Progresso na resolução de problemas matemáticos contextualizados',
    descricao: 'Os estudantes demonstraram melhor compreensão na interpretação de enunciados quando trabalharam com exemplos próximos do cotidiano.',
    categoria: 'Avaliação'
  },
  {
    id: 5,
    turmaId: 4,
    dataObservacao: '2026-05-31',
    titulo: 'Atrasos recorrentes na entrega de atividades domiciliares',
    descricao: 'Alguns estudantes não entregaram as atividades dentro do prazo. Recomenda-se acompanhar se o problema está ligado a rotina de estudos ou compreensão da proposta.',
    categoria: 'Assiduidade'
  },
  {
    id: 6,
    turmaId: 1,
    dataObservacao: '2026-05-30',
    titulo: 'Interesse em atividades práticas de laboratório',
    descricao: 'A turma demonstrou maior engajamento quando a atividade envolveu observação prática e registro colaborativo dos resultados.',
    categoria: 'Participação'
  }
];

export const relatorioInicial: RelatorioIA = {
  id: 1,
  turmaId: 1,
  periodo: 'Maio e junho de 2026',
  resumoGerado:
    'A turma apresenta boa participação em atividades práticas e colaborativas, mas demonstra dificuldades recorrentes em leitura interpretativa e organização das respostas escritas. Os registros indicam evolução quando as tarefas são contextualizadas e acompanhadas por exemplos guiados.',
  pontosAtencao: [
    'Dificuldade em identificar informações implícitas em textos.',
    'Necessidade de maior acompanhamento na produção de justificativas escritas.',
    'Diferença de engajamento entre atividades expositivas e práticas.'
  ],
  sugestoes: [
    'Utilizar leitura guiada com marcação de pistas no texto.',
    'Propor atividades em duplas produtivas para discussão de respostas.',
    'Retomar conceitos com exemplos curtos antes de avaliações maiores.',
    'Registrar evidências de aprendizagem por semana para acompanhar evolução.'
  ],
  dataGeracao: '2026-06-04',
  aproveitamento: 78
};

export const observacoesPorMes = [
  { mes: 'Jan', total: 4 },
  { mes: 'Fev', total: 7 },
  { mes: 'Mar', total: 8 },
  { mes: 'Abr', total: 6 },
  { mes: 'Mai', total: 10 },
  { mes: 'Jun', total: 6 }
];
