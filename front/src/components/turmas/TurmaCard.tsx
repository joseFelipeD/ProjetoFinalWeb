import { Eye, UsersRound } from 'lucide-react';
import { StatBox } from '../ui';
import type { Turma } from '../../types';

type TurmaCardProps = {
  turma: Turma;
  observacoesCount: number;
  onView: (turmaId: number) => void;
};

const colorMap = {
  azul: 'border-t-blue-600 bg-blue-50/60 text-blue-700',
  roxo: 'border-t-violet-600 bg-violet-50/60 text-violet-700',
  verde: 'border-t-emerald-600 bg-emerald-50/60 text-emerald-700',
  ciano: 'border-t-cyan-600 bg-cyan-50/60 text-cyan-700'
};

export function TurmaCard({ turma, observacoesCount, onView }: TurmaCardProps) {
  return (
    <article className={`card border-t-4 p-5 ${colorMap[turma.cor]}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-ink">{turma.nome}</h3>
          <p className="mt-1 text-sm text-slate-500">{turma.serie} • Ano letivo {turma.anoLetivo}</p>
        </div>
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <UsersRound size={18} />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500">{turma.descricao}</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <StatBox value={turma.quantidadeAlunos} label="alunos" />
        <StatBox value={observacoesCount} label="observações" />
      </div>
      <button type="button" onClick={() => onView(turma.id)} className="mt-4 flex w-full items-center justify-between rounded-xl border border-current/20 bg-white/70 px-4 py-3 text-sm font-semibold">
        <span className="flex items-center gap-2"><Eye size={16} /> Visualizar turma</span>
        <span>›</span>
      </button>
    </article>
  );
}
