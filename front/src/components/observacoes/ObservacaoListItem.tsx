import { CategoryBadge } from '../common/CategoryBadge';
import type { Observacao } from '../../types';

type ObservacaoListItemProps = {
  observacao: Observacao;
};

export function ObservacaoListItem({ observacao }: ObservacaoListItemProps) {
  return (
    <article className="rounded-2xl border border-slate-100 p-4">
      <p className="font-semibold text-ink">{observacao.titulo}</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-xs text-slate-400">{new Date(observacao.dataObservacao).toLocaleDateString('pt-BR')}</span>
        <CategoryBadge categoria={observacao.categoria} />
      </div>
    </article>
  );
}
