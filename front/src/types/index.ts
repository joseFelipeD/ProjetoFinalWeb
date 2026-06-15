export type Page =
  | 'dashboard'
  | 'turmas'
  | 'nova-observacao'
  | 'historico'
  | 'gerar-relatorio'
  | 'relatorio-ia'
  | 'perfil';

export type Professor = {
  id: number;
  nome: string;
  nomeExibicao: string;
  email: string;
  escola: string;
  disciplina: string;
};

export type Turma = {
  id: number;
  nome: string;
  serie: '6º ano' | '7º ano' | '8º ano' | '9º ano';
  anoLetivo: number;
  quantidadeAlunos: number;
  descricao: string;
  cor: 'azul' | 'roxo' | 'verde' | 'ciano';
};

export type CategoriaObservacao =
  | 'Aprendizagem'
  | 'Comportamento'
  | 'Participação'
  | 'Avaliação'
  | 'Assiduidade'
  | 'Outros';

export type Observacao = {
  id: number;
  turmaId: number;
  dataObservacao: string;
  titulo: string;
  descricao: string;
  categoria: CategoriaObservacao;
};

export type RelatorioIA = {
  id: number;
  turmaId: number;
  periodo: string;
  resumoGerado: string;
  pontosAtencao: string[];
  sugestoes: string[];
  dataGeracao: string;
  aproveitamento: number;
  dataInicio: string;
  dataFim: string;
  dimensoes: string[];
  indicadores: Record<string, number>;
  distribuicaoCategorias: Record<string, number>;
};

export type NovaObservacaoInput = Omit<Observacao, 'id'>;
export type NovaTurmaInput = Omit<Turma, 'id' | 'cor'>;
