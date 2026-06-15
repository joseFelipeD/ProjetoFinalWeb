import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { categorias } from '../../data/seedData';
import { Button, Field, SelectableChip, SelectField, TextField } from '../ui';
import type { CategoriaObservacao, NovaObservacaoInput, Turma } from '../../types';

type ObservacaoFormProps = {
  turmas: Turma[];
  onSubmit: (observacao: NovaObservacaoInput) => void;
};

export function ObservacaoForm({ turmas, onSubmit }: ObservacaoFormProps) {
  const hoje = new Date().toISOString().slice(0, 10);
  const [turmaId, setTurmaId] = useState(turmas[0]?.id ?? 0);
  const [dataObservacao, setDataObservacao] = useState(hoje);
  const [categoria, setCategoria] = useState<CategoriaObservacao>('Aprendizagem');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [feedback, setFeedback] = useState<{ tipo: 'erro' | 'sucesso'; mensagem: string } | null>(null);

  const detalhesSuficientes = useMemo(() => descricao.trim().length >= 60, [descricao]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!turmaId || !titulo.trim() || !descricao.trim()) {
      setFeedback({ tipo: 'erro', mensagem: 'Preencha turma, título e descrição antes de salvar.' });
      return;
    }

    onSubmit({ turmaId, dataObservacao, categoria, titulo, descricao });
    setTitulo('');
    setDescricao('');
    setCategoria('Aprendizagem');
    setFeedback({ tipo: 'sucesso', mensagem: 'Observação registrada com sucesso.' });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {feedback && (
        <div className={`rounded-xl border px-4 py-3 text-sm font-semibold ${feedback.tipo === 'sucesso' ? 'border-green-100 bg-green-50 text-green-700' : 'border-red-100 bg-red-50 text-red-700'}`}>
          {feedback.mensagem}
        </div>
      )}

      <section className="card p-5">
        <h2 className="mb-4 font-bold text-ink">Informações básicas</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <SelectField
            label="Turma *"
            value={turmaId}
            onChange={(e) => setTurmaId(Number(e.target.value))}
            options={turmas.map((turma) => ({ value: turma.id, label: turma.nome }))}
          />
          <TextField label="Data da observação *" type="date" value={dataObservacao} onChange={(e) => setDataObservacao(e.target.value)} />
        </div>
      </section>

      <section className="card p-5">
        <h2 className="mb-4 font-bold text-ink">Categoria da observação *</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((item) => (
            <SelectableChip key={item} label={item} selected={categoria === item} onClick={() => setCategoria(item)} />
          ))}
        </div>
      </section>

      <section className="card p-5">
        <h2 className="mb-4 font-bold text-ink">Conteúdo da observação</h2>
        <div className="space-y-4">
          <TextField label="Título *" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex: Dificuldade de leitura interpretativa" />
          <Field label="Descrição detalhada *">
            <textarea
              className="input min-h-44 resize-none"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva o contexto da aula, quantos alunos foram afetados, comportamentos observados e estratégias utilizadas."
            />
            <p className={`mt-2 text-xs font-medium ${detalhesSuficientes ? 'text-green-600' : 'text-slate-400'}`}>
              {detalhesSuficientes ? 'Descrição com detalhes suficientes para uma boa análise.' : 'Quanto mais contexto, melhor será o relatório da IA.'}
            </p>
          </Field>
        </div>
      </section>

      <div className="flex justify-end">
        <Button type="submit">Salvar observação</Button>
      </div>
    </form>
  );
}
