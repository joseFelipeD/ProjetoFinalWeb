import { Lightbulb, ListChecks } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { ObservacaoForm } from '../components/observacoes/ObservacaoForm';
import type { NovaObservacaoInput, Observacao, Turma } from '../types';

type NovaObservacaoProps = {
  turmas: Turma[];
  observacoes: Observacao[];
  onAddObservacao: (observacao: NovaObservacaoInput) => void;
};

export function NovaObservacao({ turmas, observacoes, onAddObservacao }: NovaObservacaoProps) {
  const aprendizagem = observacoes.filter((obs) => obs.categoria === 'Aprendizagem').length;
  const comportamento = observacoes.filter((obs) => obs.categoria === 'Comportamento').length;
  const participacao = observacoes.filter((obs) => obs.categoria === 'Participação').length;

  return (
    <>
      <PageHeader title="Nova observação pedagógica" description="Registre fatos relevantes das aulas para posterior análise com IA." />
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.7fr]">
        <ObservacaoForm turmas={turmas} onSubmit={onAddObservacao} />
        <aside className="space-y-5">
          <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div className="mb-3 flex items-center gap-2 font-bold text-blue-900"><Lightbulb size={19} /> Dicas para uma boa observação</div>
            <ul className="space-y-3 text-sm leading-6 text-blue-800">
              <li>• Seja específico sobre a situação observada.</li>
              <li>• Informe o contexto da atividade.</li>
              <li>• Evite registrar apenas aspectos negativos.</li>
              <li>• Descreva estratégias utilizadas e reações da turma.</li>
              <li>• Inclua sinais de aprendizagem, participação ou dificuldade.</li>
            </ul>
          </section>
          <section className="card p-5">
            <div className="mb-4 flex items-center gap-2 font-bold text-ink"><ListChecks size={19} /> Distribuição atual</div>
            <div className="space-y-4 text-sm">
              <div><div className="mb-1 flex justify-between"><span>Aprendizagem</span><strong>{aprendizagem}</strong></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-blue-500" style={{ width: `${Math.min(aprendizagem * 18, 100)}%` }} /></div></div>
              <div><div className="mb-1 flex justify-between"><span>Comportamento</span><strong>{comportamento}</strong></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-red-500" style={{ width: `${Math.min(comportamento * 22, 100)}%` }} /></div></div>
              <div><div className="mb-1 flex justify-between"><span>Participação</span><strong>{participacao}</strong></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-green-500" style={{ width: `${Math.min(participacao * 22, 100)}%` }} /></div></div>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
