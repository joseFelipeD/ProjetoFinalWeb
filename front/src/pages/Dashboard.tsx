import { BarChart3, FileText, UsersRound } from 'lucide-react';
import { MetricCard } from '../components/common/MetricCard';
import { PageHeader } from '../components/common/PageHeader';
import { AIReportBanner } from '../components/common/AIReportBanner';
import { ObservacaoListItem } from '../components/observacoes/ObservacaoListItem';
import { ObservacoesAreaChart } from '../components/charts/ObservacoesAreaChart';
import { Button, Card } from '../components/ui';
import { observacoesPorMes } from '../data/seedData';
import type { Observacao, Page, Turma } from '../types';

type DashboardProps = {
  turmas: Turma[];
  observacoes: Observacao[];
  onNavigate: (page: Page) => void;
};

export function Dashboard({ turmas, observacoes, onNavigate }: DashboardProps) {
  const ultimas = observacoes.slice(0, 4);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Resumo da atividade pedagógica nos anos finais do ensino fundamental."
        action={<Button onClick={() => onNavigate('nova-observacao')}>+ Nova observação</Button>}
      />

      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard title="Turmas ativas" value={turmas.length} subtitle="6º ao 9º ano" icon={<UsersRound />} trend="+1 turma" />
        <MetricCard title="Observações registradas" value={observacoes.length} subtitle="últimos 30 dias" icon={<FileText />} trend="+5 esta semana" />
        <MetricCard title="Relatórios gerados" value={1} subtitle="análises pedagógicas" icon={<BarChart3 />} trend="+2 este mês" />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
        <Card
          title="Observações por mês"
          subtitle="Quantidade de registros pedagógicos"
          action={<span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">2026</span>}
        >
          <div className="h-72">
            <ObservacoesAreaChart data={observacoesPorMes} />
          </div>
        </Card>

        <Card
          title="Últimas observações"
          action={<Button variant="link" onClick={() => onNavigate('historico')}>Ver todas</Button>}
        >
          <div className="space-y-4">
            {ultimas.map((obs) => (
              <ObservacaoListItem key={obs.id} observacao={obs} />
            ))}
          </div>
        </Card>
      </div>

      <AIReportBanner turmaNome={turmas[0]?.nome} onView={() => onNavigate('relatorio-ia')} />
    </>
  );
}
