import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { ChartPanel } from '../components/charts/ChartPanel';
import { DimensoesBarChart } from '../components/charts/DimensoesBarChart';
import { DistribuicaoPieChart } from '../components/charts/DistribuicaoPieChart';
import { Card, InfoCallout } from '../components/ui';
import { ultimoRelatorio } from '../services/relatorios';
import type { RelatorioIA, Turma } from '../types';

type RelatorioIAPageProps = {
  turmas: Turma[];
};

export function RelatorioIAPage({ turmas }: RelatorioIAPageProps) {
  const [relatorio, setRelatorio] = useState<RelatorioIA | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    ultimoRelatorio()
      .then(setRelatorio)
      .catch((erro) => console.error(erro))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return (
      <>
        <PageHeader title="Relatório com IA" description="Carregando análise pedagógica..." />
        <Card className="p-6 text-slate-500">Carregando...</Card>
      </>
    );
  }

  if (!relatorio) {
    return (
      <>
        <PageHeader title="Relatório com IA" description="Análise pedagógica gerada por IA." />
        <Card className="p-6 text-slate-500">
          Nenhum relatório gerado ainda. Use a tela <strong>“Gerar relatório com IA”</strong> para criar o primeiro.
        </Card>
      </>
    );
  }

  const turma = turmas.find((item) => item.id === relatorio.turmaId);
  const barras = Object.entries(relatorio.indicadores).map(([nome, valor]) => ({ nome, valor }));
  const pizza = Object.entries(relatorio.distribuicaoCategorias).map(([name, value]) => ({ name, value }));

  return (
    <>
      <PageHeader title="Relatório com IA" description={`Análise pedagógica de ${turma?.nome ?? 'turma'} • ${relatorio.periodo}`} />
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card
          title="Resumo pedagógico"
          subtitle={`Gerado em ${new Date(relatorio.dataGeracao).toLocaleDateString('pt-BR')}`}
          action={
            <div className="rounded-2xl bg-blue-50 px-5 py-3 text-center">
              <strong className="block text-3xl text-primary">{relatorio.aproveitamento}%</strong>
              <span className="text-xs font-semibold text-blue-700">aproveitamento</span>
            </div>
          }
        >
          <p className="rounded-2xl bg-slate-50 p-5 leading-7 text-slate-700">{relatorio.resumoGerado}</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <ChartPanel title="Indicadores por dimensão">
              <DimensoesBarChart data={barras} />
            </ChartPanel>
            <ChartPanel title="Distribuição dos registros">
              <DistribuicaoPieChart data={pizza} />
            </ChartPanel>
          </div>
        </Card>

        <aside className="space-y-5">
          <Card className="p-5" title="Pontos de atenção" icon={<AlertTriangle className="text-amber-500" />}>
            <div className="space-y-3">
              {relatorio.pontosAtencao.map((item, index) => (
                <InfoCallout key={item} tone="warning" className="p-4">
                  <span className="mb-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-amber-700">Prioridade {index + 1}</span>
                  <p>{item}</p>
                </InfoCallout>
              ))}
            </div>
          </Card>

          <Card className="p-5" title="Sugestões pedagógicas" icon={<Lightbulb className="text-blue-600" />}>
            <div className="space-y-3">
              {relatorio.sugestoes.map((item) => (
                <InfoCallout key={item} tone="info" className="p-4">
                  <p className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0" /> {item}</p>
                </InfoCallout>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </>
  );
}
