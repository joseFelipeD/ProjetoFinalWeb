import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import type { RelatorioIA, Turma } from '../types';

type RelatorioIAPageProps = {
  relatorio: RelatorioIA;
  turmas: Turma[];
};

const barras = [
  { nome: 'Aprendizagem', valor: 72 },
  { nome: 'Participação', valor: 86 },
  { nome: 'Comportamento', valor: 68 },
  { nome: 'Avaliação', valor: 75 }
];

const pizza = [
  { name: 'Aprendizagem', value: 38 },
  { name: 'Participação', value: 25 },
  { name: 'Comportamento', value: 21 },
  { name: 'Outros', value: 16 }
];

export function RelatorioIAPage({ relatorio, turmas }: RelatorioIAPageProps) {
  const turma = turmas.find((item) => item.id === relatorio.turmaId);

  return (
    <>
      <PageHeader title="Relatório com IA" description={`Análise pedagógica de ${turma?.nome ?? 'turma'} • ${relatorio.periodo}`} />
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="card p-6">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-ink">Resumo pedagógico</h2>
              <p className="text-sm text-slate-500">Gerado em {new Date(relatorio.dataGeracao).toLocaleDateString('pt-BR')}</p>
            </div>
            <div className="rounded-2xl bg-blue-50 px-5 py-3 text-center">
              <strong className="block text-3xl text-primary">{relatorio.aproveitamento}%</strong>
              <span className="text-xs font-semibold text-blue-700">aproveitamento</span>
            </div>
          </div>
          <p className="rounded-2xl bg-slate-50 p-5 leading-7 text-slate-700">{relatorio.resumoGerado}</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="h-72 rounded-2xl border border-slate-100 p-4">
              <h3 className="mb-3 font-bold text-ink">Indicadores por dimensão</h3>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={barras} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="nome" tick={{ fontSize: 11 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="valor" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="h-72 rounded-2xl border border-slate-100 p-4">
              <h3 className="mb-3 font-bold text-ink">Distribuição dos registros</h3>
              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie data={pizza} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={4}>
                    {pizza.map((_entry, index) => <Cell key={index} fill={['#2563eb', '#16a34a', '#ef4444', '#94a3b8'][index]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <section className="card p-5">
            <h2 className="mb-4 flex items-center gap-2 font-bold text-ink"><AlertTriangle className="text-amber-500" /> Pontos de atenção</h2>
            <div className="space-y-3">
              {relatorio.pontosAtencao.map((item, index) => (
                <div key={item} className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-900">
                  <span className="mb-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-amber-700">Prioridade {index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-5">
            <h2 className="mb-4 flex items-center gap-2 font-bold text-ink"><Lightbulb className="text-blue-600" /> Sugestões pedagógicas</h2>
            <div className="space-y-3">
              {relatorio.sugestoes.map((item) => (
                <div key={item} className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
                  <p className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0" /> {item}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
