import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { categorias } from '../../data/seedData';
import { Button, FeedbackMessage, FormSection, SelectableChip, SelectField, TextAreaField, TextField } from '../ui';
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

  // Garante uma turma válida selecionada quando a lista chega/atualiza (ex.: vinda de API).
  useEffect(() => {
    if (turmas.length > 0 && !turmas.some((turma) => turma.id === turmaId)) {
      setTurmaId(turmas[0].id);
    }
  }, [turmas, turmaId]);

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
      {feedback && <FeedbackMessage tone={feedback.tipo === 'sucesso' ? 'success' : 'error'}>{feedback.mensagem}</FeedbackMessage>}

      <FormSection title="Informações básicas">
        <div className="grid gap-4 md:grid-cols-2">
          <SelectField
            label="Turma *"
            value={turmaId}
            onChange={(e) => setTurmaId(Number(e.target.value))}
            options={turmas.map((turma) => ({ value: turma.id, label: turma.nome }))}
          />
          <TextField label="Data da observação *" type="date" value={dataObservacao} onChange={(e) => setDataObservacao(e.target.value)} />
        </div>
      </FormSection>

      <FormSection title="Categoria da observação *">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((item) => (
            <SelectableChip key={item} label={item} selected={categoria === item} onClick={() => setCategoria(item)} />
          ))}
        </div>
      </FormSection>

      <FormSection title="Conteúdo da observação">
        <div className="space-y-4">
          <TextField label="Título *" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex: Dificuldade de leitura interpretativa" />
          <TextAreaField
            label="Descrição detalhada *"
            className="min-h-44 resize-none"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva o contexto da aula, quantos alunos foram afetados, comportamentos observados e estratégias utilizadas."
            hint={
              <p className={`mt-2 text-xs font-medium ${detalhesSuficientes ? 'text-green-600' : 'text-slate-400'}`}>
                {detalhesSuficientes ? 'Descrição com detalhes suficientes para uma boa análise.' : 'Quanto mais contexto, melhor será o relatório da IA.'}
              </p>
            }
          />
        </div>
      </FormSection>

      <div className="flex justify-end">
        <Button type="submit">Salvar observação</Button>
      </div>
    </form>
  );
}
