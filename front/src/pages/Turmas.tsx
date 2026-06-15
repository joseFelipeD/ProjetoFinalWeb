import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { TurmaCard } from '../components/turmas/TurmaCard';
import { TurmaForm } from '../components/turmas/TurmaForm';
import { TurmaTable } from '../components/turmas/TurmaTable';
import { Button, InfoCallout, Modal } from '../components/ui';
import type { NovaTurmaInput, Observacao, Turma } from '../types';

type TurmasProps = {
  turmas: Turma[];
  observacoes: Observacao[];
  onAddTurma: (turma: NovaTurmaInput) => void | Promise<void>;
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
        action={<Button icon={<Plus size={18} />} onClick={() => setShowModal(true)}>Adicionar turma</Button>}
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input className="input max-w-md" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por turma ou série..." />
        <span className="text-sm font-medium text-slate-500">{turmasFiltradas.length} turmas encontradas</span>
      </div>

      {turmaSelecionada && (
        <InfoCallout className="mb-5 p-4">
          <strong>Turma selecionada:</strong> {turmaSelecionada.nome}. {turmaSelecionada.descricao}
        </InfoCallout>
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
        <Modal
          title="Adicionar turma"
          description="Cadastre uma nova turma dos anos finais do Ensino Fundamental."
          onClose={() => setShowModal(false)}
        >
          <TurmaForm
            onCancel={() => setShowModal(false)}
            onSubmit={async (turma) => {
              await onAddTurma(turma);
              setShowModal(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}
