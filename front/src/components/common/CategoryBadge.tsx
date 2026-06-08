import type { CategoriaObservacao } from '../../types';

type CategoryBadgeProps = {
  categoria: CategoriaObservacao;
};

const styles: Record<CategoriaObservacao, string> = {
  Aprendizagem: 'bg-yellow-100 text-yellow-800',
  Comportamento: 'bg-red-100 text-red-700',
  Participação: 'bg-green-100 text-green-700',
  Avaliação: 'bg-blue-100 text-blue-700',
  Assiduidade: 'bg-orange-100 text-orange-700',
  Outros: 'bg-slate-100 text-slate-700'
};

export function CategoryBadge({ categoria }: CategoryBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[categoria]}`}>
      {categoria}
    </span>
  );
}
