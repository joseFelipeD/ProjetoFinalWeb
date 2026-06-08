import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BarChart3, BrainCircuit, FileText, UsersRound } from 'lucide-react';
import { MetricCard } from '../components/common/MetricCard';
import { PageHeader } from '../components/common/PageHeader';
import { CategoryBadge } from '../components/common/CategoryBadge';
import { observacoesPorMes } from '../data/seedData';
import type { Observacao, Page, RelatorioIA, Turma } from '../types';

type DashboardProps = {
  turmas: Turma[];
  observacoes: Observacao[];
  relatorio: RelatorioIA;
  onNavigate: (page: Page) => void;
};

export function Dashboard({ turmas, observacoes, relatorio, onNavigate }: DashboardProps) {
  const ultimas = observacoes.slice(0, 4);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Resumo da atividade pedagógica nos anos finais do ensino fundamental."
        action={<button className="btn-primary" onClick={() => onNavigate('nova-observacao')}>+ Nova observação</button>}
      />

      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard title="Turmas ativas" value={turmas.length} subtitle="6º ao 9º ano" icon={<UsersRound />} trend="+1 turma" />
        <MetricCard title="Observações registradas" value={observacoes.length} subtitle="últimos 30 dias" icon={<FileText />} trend="+5 esta semana" />
        <MetricCard title="Relatórios gerados" value={1} subtitle="análises pedagógicas" icon={<BarChart3 />} trend="+2 este mês" />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="card p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-ink">Observações por mês</h2>
              <p className="text-sm text-slate-400">Quantidade de registros pedagógicos</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">2026</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={observacoesPorMes} margin={{ left: -20, right: 10, top: 10 }}>
                <defs>
                  <linearGradient id="observacoes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="mes" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={3} fill="url(#observacoes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-bold text-ink">Últimas observações</h2>
            <button className="text-sm font-semibold text-primary" onClick={() => onNavigate('historico')}>Ver todas</button>
          </div>
          <div className="space-y-4">
            {ultimas.map((obs) => (
              <article key={obs.id} className="rounded-2xl border border-slate-100 p-4">
                <p className="font-semibold text-ink">{obs.titulo}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-400">{new Date(obs.dataObservacao).toLocaleDateString('pt-BR')}</span>
                  <CategoryBadge categoria={obs.categoria} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-3xl bg-blue-700 p-6 text-white shadow-card">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/15 p-4"><BrainCircuit /></div>
            <div>
              <h2 className="text-lg font-bold">Relatório inteligente disponível para {turmas[0]?.nome}</h2>
              <p className="text-sm text-blue-100">A IA analisa suas observações para identificar padrões, pontos de atenção e sugestões pedagógicas.</p>
            </div>
          </div>
          <button className="btn-secondary" onClick={() => onNavigate('relatorio-ia')}>Ver relatório</button>
        </div>
      </section>
    </>
  );
}
