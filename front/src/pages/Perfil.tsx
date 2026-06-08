import { PageHeader } from '../components/common/PageHeader';
import type { Professor, Turma, Observacao } from '../types';

type PerfilProps = {
  professor: Professor;
  turmas: Turma[];
  observacoes: Observacao[];
};

export function Perfil({ professor, turmas, observacoes }: PerfilProps) {
  return (
    <>
      <PageHeader title="Perfil do professor" description="Gerencie suas informações pessoais e preferências da conta." />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="card p-6 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-black text-white">MS</div>
          <h2 className="mt-4 text-xl font-bold text-ink">{professor.nome}</h2>
          <p className="text-sm text-slate-500">{professor.email}</p>
          <div className="mt-6 grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 pt-5">
            <div><strong className="block text-xl text-ink">{turmas.length}</strong><span className="text-xs text-slate-400">Turmas</span></div>
            <div><strong className="block text-xl text-ink">{observacoes.length}</strong><span className="text-xs text-slate-400">Obs.</span></div>
            <div><strong className="block text-xl text-ink">1</strong><span className="text-xs text-slate-400">Relatório</span></div>
          </div>
        </section>
        <section className="card p-6">
          <h2 className="mb-5 font-bold text-ink">Informações pessoais</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div><label className="label">Nome completo</label><input className="input" value={professor.nome} readOnly /></div>
            <div><label className="label">Nome de exibição</label><input className="input" value={professor.nomeExibicao} readOnly /></div>
            <div><label className="label">E-mail</label><input className="input" value={professor.email} readOnly /></div>
            <div><label className="label">Disciplina principal</label><input className="input" value={professor.disciplina} readOnly /></div>
            <div className="md:col-span-2"><label className="label">Escola</label><input className="input" value={professor.escola} readOnly /></div>
          </div>
          <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Atualize seus dados cadastrais, preferências de notificação e configurações da conta.</p>
        </section>
      </div>
    </>
  );
}
