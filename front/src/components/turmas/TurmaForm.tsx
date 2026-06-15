import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button, FeedbackMessage, SelectField, TextAreaField, TextField } from '../ui';
import type { NovaTurmaInput } from '../../types';

type TurmaFormProps = {
  onCancel: () => void;
  onSubmit: (turma: NovaTurmaInput) => void | Promise<void>;
};

const initialForm: NovaTurmaInput = {
  nome: '',
  serie: '6º ano',
  anoLetivo: 2026,
  quantidadeAlunos: 25,
  descricao: ''
};

export function TurmaForm({ onCancel, onSubmit }: TurmaFormProps) {
  const [form, setForm] = useState<NovaTurmaInput>(initialForm);
  const [erro, setErro] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.nome.trim() || !form.descricao.trim()) {
      setErro('Informe o nome da turma e uma breve descrição.');
      return;
    }
    setErro('');
    try {
      await onSubmit(form);
      setForm(initialForm);
    } catch (e) {
      console.error(e);
      setErro('Não foi possível salvar a turma. Tente novamente.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {erro && <FeedbackMessage tone="error">{erro}</FeedbackMessage>}
      <TextField
        label="Nome da turma"
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
        placeholder="Ex: 6º Ano C"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Série"
          value={form.serie}
          onChange={(e) => setForm({ ...form, serie: e.target.value as NovaTurmaInput['serie'] })}
          options={['6º ano', '7º ano', '8º ano', '9º ano'].map((serie) => ({ value: serie, label: serie }))}
        />
        <TextField
          label="Quantidade de alunos"
          type="number"
          min={1}
          value={form.quantidadeAlunos}
          onChange={(e) => setForm({ ...form, quantidadeAlunos: Number(e.target.value) })}
        />
      </div>
      <TextAreaField
        label="Descrição pedagógica"
        className="min-h-28 resize-none"
        value={form.descricao}
        onChange={(e) => setForm({ ...form, descricao: e.target.value })}
        placeholder="Descreva brevemente o perfil da turma."
      />
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Adicionar turma</Button>
      </div>
    </form>
  );
}
