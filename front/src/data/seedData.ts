import type { CategoriaObservacao } from '../types';

// Lista fixa de categorias usadas nos selects/filtros e botões de categoria.
// Os demais dados (turmas, observações, relatório, professor) agora vêm da API.
export const categorias: CategoriaObservacao[] = [
  'Aprendizagem',
  'Comportamento',
  'Participação',
  'Avaliação',
  'Assiduidade',
  'Outros'
];
