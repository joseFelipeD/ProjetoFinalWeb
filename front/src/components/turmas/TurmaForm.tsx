import { useState } from 'react';
import type { FormEvent } from 'react';
import type { NovaTurmaInput } from '../../types';

type TurmaFormProps = {
  onCancel: () => void;
  onSubmit: (turma: NovaTurmaInput) => void;
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

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.nome.trim() || !form.descricao.trim()) {
      setErro('Informe o nome da turma e uma breve descrição.');
      return;
    }
    onSubmit(form);
    setForm(initialForm);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {erro && <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{erro}</div>}
      <div>
        <label className="label">Nome da turma</label>
        <input className="input" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex: 6º Ano C" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Série</label>
          <select className="input" value={form.serie} onChange={(e) => setForm({ ...form, serie: e.target.value as NovaTurmaInput['serie'] })}>
            <option>6º ano</option>
            <option>7º ano</option>
            <option>8º ano</option>
            <option>9º ano</option>
          </select>
        </div>
        <div>
          <label className="label">Quantidade de alunos</label>
          <input className="input" type="number" min={1} value={form.quantidadeAlunos} onChange={(e) => setForm({ ...form, quantidadeAlunos: Number(e.target.value) })} />
        </div>
      </div>
      <div>
        <label className="label">Descrição pedagógica</label>
        <textarea className="input min-h-28 resize-none" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="Descreva brevemente o perfil da turma." />
      </div>
      <div className="flex justify-end gap-3">
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn-primary">Adicionar turma</button>
      </div>
    </form>
  );
}
