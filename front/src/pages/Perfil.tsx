import { useEffect, useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Avatar, Card, StatGroup, TextField } from '../components/ui';
import { getResumo } from '../services/dashboard';
import { getIniciais } from '../utils/getIniciais';
import type { Professor, Turma, Observacao } from '../types';

type PerfilProps = {
  professor: Professor;
  turmas: Turma[];
  observacoes: Observacao[];
};

export function Perfil({ professor, turmas, observacoes }: PerfilProps) {
  const [relatoriosTotal, setRelatoriosTotal] = useState<number | null>(null);

  useEffect(() => {
    getResumo()
      .then((resumo) => setRelatoriosTotal(resumo.relatoriosTotal))
      .catch((erro) => console.error(erro));
  }, []);

  return (
    <>
      <PageHeader title="Perfil do professor" description="Gerencie suas informações pessoais e preferências da conta." />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-6 text-center">
          <Avatar initials={getIniciais(professor.nome)} className="mx-auto h-24 w-24 text-3xl font-black" />
          <h2 className="mt-4 text-xl font-bold text-ink">{professor.nome}</h2>
          <p className="text-sm text-slate-500">{professor.email}</p>
          <StatGroup
            className="mt-6 divide-x divide-slate-100 border-t border-slate-100 pt-5"
            stats={[
              { value: turmas.length, label: 'Turmas' },
              { value: observacoes.length, label: 'Obs.' },
              { value: relatoriosTotal ?? '—', label: 'Relatórios' }
            ]}
          />
        </Card>
        <Card className="p-6" title="Informações pessoais">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Nome completo" value={professor.nome} readOnly />
            <TextField label="Nome de exibição" value={professor.nomeExibicao} readOnly />
            <TextField label="E-mail" value={professor.email} readOnly />
            <TextField label="Disciplina principal" value={professor.disciplina} readOnly />
            <TextField label="Escola" value={professor.escola} readOnly fieldClassName="md:col-span-2" />
          </div>
          <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Atualize seus dados cadastrais, preferências de notificação e configurações da conta.</p>
        </Card>
      </div>
    </>
  );
}
