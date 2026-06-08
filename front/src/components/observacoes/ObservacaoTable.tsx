import { Eye, Trash2 } from 'lucide-react';
import { CategoryBadge } from '../common/CategoryBadge';
import type { Observacao, Turma } from '../../types';

type ObservacaoTableProps = {
  observacoes: Observacao[];
  turmas: Turma[];
  onDelete: (id: number) => void;
};

export function ObservacaoTable({ observacoes, turmas, onDelete }: ObservacaoTableProps) {
  function getTurmaNome(id: number) {
    return turmas.find((turma) => turma.id === id)?.nome ?? 'Turma não encontrada';
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-4">Título da observação</th>
              <th className="px-5 py-4">Turma</th>
              <th className="px-5 py-4">Categoria</th>
              <th className="px-5 py-4">Data</th>
              <th className="px-5 py-4">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {observacoes.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-500">Nenhuma observação encontrada para os filtros selecionados.</td></tr>
            ) : (
              observacoes.map((obs) => (
                <tr key={obs.id} className="hover:bg-slate-50">
                  <td className="max-w-[390px] px-5 py-4 font-semibold text-ink">{obs.titulo}</td>
                  <td className="px-5 py-4 text-slate-600">{getTurmaNome(obs.turmaId)}</td>
                  <td className="px-5 py-4"><CategoryBadge categoria={obs.categoria} /></td>
                  <td className="px-5 py-4 text-slate-600">{new Date(obs.dataObservacao).toLocaleDateString('pt-BR')}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button type="button" className="btn-secondary !px-3 !py-2"><Eye size={15} /> Visualizar</button>
                      <button type="button" className="btn-danger" onClick={() => onDelete(obs.id)}><Trash2 size={15} /> Excluir</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
