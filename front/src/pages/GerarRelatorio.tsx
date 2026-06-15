import { useMemo, useState } from 'react';
import { BrainCircuit, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { BulletList, Button, Card, Field, IconBox, ProgressBar, SelectField, TextField } from '../components/ui';
import type { Page, Turma } from '../types';

type GerarRelatorioProps = {
  turmas: Turma[];
  onNavigate: (page: Page) => void;
};

const dimensoes = [
  'Comportamento e disciplina',
  'Desenvolvimento de aprendizagem',
  'Participação e engajamento',
  'Avaliações e desempenho',
  'Relacionamento interpessoal',
  'Assiduidade e compromisso'
];

const analiseIA = [
  'Padrões nas observações da turma.',
  'Pontos recorrentes de aprendizagem e comportamento.',
  'Sugestões pedagógicas para próximas aulas.'
];

export function GerarRelatorio({ turmas, onNavigate }: GerarRelatorioProps) {
  const [turmaId, setTurmaId] = useState(String(turmas[0]?.id ?? ''));
  const [inicio, setInicio] = useState('2026-05-01');
  const [fim, setFim] = useState('2026-06-08');
  const [selecionadas, setSelecionadas] = useState(dimensoes);
  const [gerando, setGerando] = useState(false);
  const [progresso, setProgresso] = useState(0);

  const turmaSelecionada = useMemo(() => turmas.find((turma) => turma.id === Number(turmaId)), [turmaId, turmas]);

  function toggleDimensao(item: string) {
    setSelecionadas((atual) => atual.includes(item) ? atual.filter((dimensao) => dimensao !== item) : [...atual, item]);
  }

  function gerarRelatorio() {
    setGerando(true);
    setProgresso(0);
    const interval = window.setInterval(() => {
      setProgresso((valor) => {
        const novoValor = valor + 20;
        if (novoValor >= 100) {
          window.clearInterval(interval);
          window.setTimeout(() => onNavigate('relatorio-ia'), 500);
          return 100;
        }
        return novoValor;
      });
    }, 450);
  }

  return (
    <>
      <PageHeader title="Gerar relatório com IA" description="Configure os parâmetros e simule a análise das observações pedagógicas." />
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card
          icon={<IconBox><BrainCircuit /></IconBox>}
          title="Configuração do relatório"
          subtitle="Selecione turma, período e dimensões da análise."
        >
          <div className="space-y-5">
            <SelectField
              label="Turma *"
              value={turmaId}
              onChange={(e) => setTurmaId(e.target.value)}
              options={turmas.map((turma) => ({ value: turma.id, label: turma.nome }))}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Data inicial" type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />
              <TextField label="Data final" type="date" value={fim} onChange={(e) => setFim(e.target.value)} />
            </div>
            <Field label="Dimensões de análise">
              <div className="grid gap-3 sm:grid-cols-2">
                {dimensoes.map((item) => (
                  <label key={item} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-medium text-slate-700">
                    <input type="checkbox" checked={selecionadas.includes(item)} onChange={() => toggleDimensao(item)} />
                    {item}
                  </label>
                ))}
              </div>
            </Field>
            {gerando ? (
              <div className="rounded-2xl bg-blue-50 p-5">
                <div className="mb-2 flex justify-between text-sm font-bold text-blue-800"><span>Simulando análise da IA...</span><span>{progresso}%</span></div>
                <ProgressBar value={progresso} heightClassName="h-3" trackClassName="bg-white" barClassName="bg-primary" />
              </div>
            ) : (
              <Button onClick={gerarRelatorio} disabled={!turmaId || selecionadas.length === 0}>Gerar relatório</Button>
            )}
          </div>
        </Card>

        <aside className="space-y-5">
          <Card variant="dark" title="O que a IA analisará?">
            <BulletList items={analiseIA} className="space-y-3 text-sm text-blue-50" />
          </Card>
          <Card className="p-5" title="Resumo da configuração">
            <div className="space-y-3 text-sm text-slate-600">
              <p><strong>Turma:</strong> {turmaSelecionada?.nome}</p>
              <p><strong>Período:</strong> {new Date(inicio).toLocaleDateString('pt-BR')} até {new Date(fim).toLocaleDateString('pt-BR')}</p>
              <p><strong>Dimensões:</strong> {selecionadas.length}</p>
              <p className="flex items-center gap-2 text-green-700"><CheckCircle2 size={16} /> Pronto para gerar</p>
            </div>
          </Card>
        </aside>
      </div>
    </>
  );
}
