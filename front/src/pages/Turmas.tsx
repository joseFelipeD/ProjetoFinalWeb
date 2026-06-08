import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { TurmaCard } from '../components/turmas/TurmaCard';
import { TurmaForm } from '../components/turmas/TurmaForm';
import { TurmaTable } from '../components/turmas/TurmaTable';
import type { NovaTurmaInput, Observacao, Turma } from '../types';

type TurmasProps = {
  turmas: Turma[];
  observacoes: Observacao[];
  onAddTurma: (turma: NovaTurmaInput) => void;
};

export function Turmas({ turmas, observacoes, onAddTurma }: TurmasProps) {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const turmasFiltradas = useMemo(() => {
    return turmas.filter((turma) => turma.nome.toLowerCase().includes(search.toLowerCase()) || turma.serie.toLowerCase().includes(search.toLowerCase()));
  }, [turmas, search]);

  const turmaSelecionada = selectedId ? turmas.find((turma) => turma.id === selectedId) : null;

  return (
    <>
      <PageHeader
        title="Gerenciamento de turmas"
        description="Turmas dos anos finais do Ensino Fundamental."
        action={<button className="btn-primary" onClick={() => setShowModal(true)}><Plus size={18} /> Adicionar turma</button>}
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input className="input max-w-md" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por turma ou série..." />
        <span className="text-sm font-medium text-slate-500">{turmasFiltradas.length} turmas encontradas</span>
      </div>

      {turmaSelecionada && (
        <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
          <strong>Turma selecionada:</strong> {turmaSelecionada.nome}. {turmaSelecionada.descricao}
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-2">
        {turmasFiltradas.map((turma) => (
          <TurmaCard key={turma.id} turma={turma} observacoesCount={observacoes.filter((obs) => obs.turmaId === turma.id).length} onView={setSelectedId} />
        ))}
      </div>

      <div className="mt-6">
        <TurmaTable turmas={turmas} observacoes={observacoes} />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-ink">Adicionar turma</h2>
                <p className="text-sm text-slate-500">Cadastre uma nova turma dos anos finais do Ensino Fundamental.</p>
              </div>
              <button className="rounded-full bg-slate-100 px-3 py-1 text-slate-500" onClick={() => setShowModal(false)}>×</button>
            </div>
            <TurmaForm
              onCancel={() => setShowModal(false)}
              onSubmit={(turma) => {
                onAddTurma(turma);
                setShowModal(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
