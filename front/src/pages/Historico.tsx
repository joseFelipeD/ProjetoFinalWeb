import { PageHeader } from '../components/common/PageHeader';
import { ObservacaoTable } from '../components/observacoes/ObservacaoTable';
import { Select } from '../components/ui';
import { useObservacaoFilters } from '../hooks/useObservacaoFilters';
import { categorias } from '../data/seedData';
import type { CategoriaObservacao, Observacao, Turma } from '../types';

type HistoricoProps = {
  turmas: Turma[];
  observacoes: Observacao[];
  onDelete: (id: number) => void | Promise<void>;
};

export function Historico({ turmas, observacoes, onDelete }: HistoricoProps) {
  const { busca, setBusca, turmaId, setTurmaId, categoria, setCategoria, filtradas } = useObservacaoFilters(observacoes);

  return (
    <>
      <PageHeader title="Histórico de observações" description={`${observacoes.length} observações registradas no total.`} />
      <div className="mb-5 grid gap-3 md:grid-cols-[1fr_220px_220px]">
        <input className="input" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar observações..." />
        <Select
          value={turmaId}
          onChange={(e) => setTurmaId(e.target.value)}
          options={[{ value: 'todas', label: 'Todas as turmas' }, ...turmas.map((turma) => ({ value: turma.id, label: turma.nome }))]}
        />
        <Select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value as CategoriaObservacao | 'todas')}
          options={[{ value: 'todas', label: 'Todas as categorias' }, ...categorias.map((item) => ({ value: item, label: item }))]}
        />
      </div>
      <ObservacaoTable observacoes={filtradas} turmas={turmas} onDelete={onDelete} />
      <p className="mt-4 text-sm text-slate-500">Mostrando {filtradas.length} de {observacoes.length} observações.</p>
    </>
  );
}
