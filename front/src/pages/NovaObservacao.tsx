import { Lightbulb, ListChecks } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { ObservacaoForm } from '../components/observacoes/ObservacaoForm';
import { BulletList, Card, InfoCallout, LabeledProgress } from '../components/ui';
import type { NovaObservacaoInput, Observacao, Turma } from '../types';

type NovaObservacaoProps = {
  turmas: Turma[];
  observacoes: Observacao[];
  onAddObservacao: (observacao: NovaObservacaoInput) => void | Promise<void>;
};

const dicas = [
  'Seja específico sobre a situação observada.',
  'Informe o contexto da atividade.',
  'Evite registrar apenas aspectos negativos.',
  'Descreva estratégias utilizadas e reações da turma.',
  'Inclua sinais de aprendizagem, participação ou dificuldade.'
];

export function NovaObservacao({ turmas, observacoes, onAddObservacao }: NovaObservacaoProps) {
  const distribuicao = [
    { label: 'Aprendizagem', total: observacoes.filter((obs) => obs.categoria === 'Aprendizagem').length, fator: 18, cor: 'bg-blue-500' },
    { label: 'Comportamento', total: observacoes.filter((obs) => obs.categoria === 'Comportamento').length, fator: 22, cor: 'bg-red-500' },
    { label: 'Participação', total: observacoes.filter((obs) => obs.categoria === 'Participação').length, fator: 22, cor: 'bg-green-500' }
  ];

  return (
    <>
      <PageHeader title="Nova observação pedagógica" description="Registre fatos relevantes das aulas para posterior análise com IA." />
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.7fr]">
        <ObservacaoForm turmas={turmas} onSubmit={onAddObservacao} />
        <aside className="space-y-5">
          <InfoCallout className="p-5" title="Dicas para uma boa observação" icon={<Lightbulb size={19} />}>
            <BulletList items={dicas} className="space-y-3 text-sm leading-6 text-blue-800" />
          </InfoCallout>

          <Card className="p-5" title="Distribuição atual" icon={<ListChecks size={19} className="text-ink" />}>
            <div className="space-y-4 text-sm">
              {distribuicao.map((item) => (
                <LabeledProgress
                  key={item.label}
                  label={item.label}
                  value={item.total}
                  percent={item.total * item.fator}
                  barClassName={item.cor}
                />
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </>
  );
}
