import { useMemo, useState } from 'react';
import { BrainCircuit, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
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
        <section className="card p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-blue-50 p-3 text-primary"><BrainCircuit /></div>
            <div>
              <h2 className="font-bold text-ink">Configuração do relatório</h2>
              <p className="text-sm text-slate-500">Selecione turma, período e dimensões da análise.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="label">Turma *</label>
              <select className="input" value={turmaId} onChange={(e) => setTurmaId(e.target.value)}>
                {turmas.map((turma) => <option key={turma.id} value={turma.id}>{turma.nome}</option>)}
              </select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Data inicial</label>
                <input className="input" type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />
              </div>
              <div>
                <label className="label">Data final</label>
                <input className="input" type="date" value={fim} onChange={(e) => setFim(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="label">Dimensões de análise</label>
              <div className="grid gap-3 sm:grid-cols-2">
                {dimensoes.map((item) => (
                  <label key={item} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-medium text-slate-700">
                    <input type="checkbox" checked={selecionadas.includes(item)} onChange={() => toggleDimensao(item)} />
                    {item}
                  </label>
                ))}
              </div>
            </div>
            {gerando ? (
              <div className="rounded-2xl bg-blue-50 p-5">
                <div className="mb-2 flex justify-between text-sm font-bold text-blue-800"><span>Simulando análise da IA...</span><span>{progresso}%</span></div>
                <div className="h-3 rounded-full bg-white"><div className="h-3 rounded-full bg-primary transition-all" style={{ width: `${progresso}%` }} /></div>
              </div>
            ) : (
              <button className="btn-primary" onClick={gerarRelatorio} disabled={!turmaId || selecionadas.length === 0}>Gerar relatório</button>
            )}
          </div>
        </section>

        <aside className="space-y-5">
          <section className="rounded-3xl bg-blue-700 p-6 text-white shadow-card">
            <h2 className="mb-4 text-lg font-bold">O que a IA analisará?</h2>
            <ul className="space-y-3 text-sm text-blue-50">
              <li>• Padrões nas observações da turma.</li>
              <li>• Pontos recorrentes de aprendizagem e comportamento.</li>
              <li>• Sugestões pedagógicas para próximas aulas.</li>
            </ul>
          </section>
          <section className="card p-5">
            <h2 className="mb-3 font-bold text-ink">Resumo da configuração</h2>
            <div className="space-y-3 text-sm text-slate-600">
              <p><strong>Turma:</strong> {turmaSelecionada?.nome}</p>
              <p><strong>Período:</strong> {new Date(inicio).toLocaleDateString('pt-BR')} até {new Date(fim).toLocaleDateString('pt-BR')}</p>
              <p><strong>Dimensões:</strong> {selecionadas.length}</p>
              <p className="flex items-center gap-2 text-green-700"><CheckCircle2 size={16} /> Pronto para gerar</p>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
