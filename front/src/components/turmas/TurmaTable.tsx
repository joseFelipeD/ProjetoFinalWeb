import type { Observacao, Turma } from '../../types';

type TurmaTableProps = {
  turmas: Turma[];
  observacoes: Observacao[];
};

export function TurmaTable({ turmas, observacoes }: TurmaTableProps) {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="font-bold text-ink">Visão geral das turmas</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-4">Turma</th>
              <th className="px-5 py-4">Série</th>
              <th className="px-5 py-4">Ano letivo</th>
              <th className="px-5 py-4">Alunos</th>
              <th className="px-5 py-4">Observações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {turmas.map((turma) => (
              <tr key={turma.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 font-semibold text-ink">{turma.nome}</td>
                <td className="px-5 py-4 text-slate-600">{turma.serie}</td>
                <td className="px-5 py-4 text-slate-600">{turma.anoLetivo}</td>
                <td className="px-5 py-4 text-slate-600">{turma.quantidadeAlunos}</td>
                <td className="px-5 py-4 text-slate-600">{observacoes.filter((obs) => obs.turmaId === turma.id).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
