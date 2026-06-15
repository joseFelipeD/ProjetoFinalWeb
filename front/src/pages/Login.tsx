import { CheckCircle2, Lock, Mail } from 'lucide-react';
import { Brand } from '../components/common/Brand';
import { Button, Field, IconInput } from '../components/ui';

type LoginProps = {
  onLogin: () => void;
};

export function Login({ onLogin }: LoginProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0b1733] via-[#132452] to-[#1d4ed8] p-6 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-7xl items-center justify-between gap-12">
        <section className="hidden max-w-2xl lg:block">
          <div className="mb-28">
            <Brand name="EduInsight IA" subtitle="plataforma pedagógica" size="md" />
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-200">
            <CheckCircle2 size={16} /> Apoio à educação básica
          </span>
          <h1 className="mt-8 text-5xl font-black leading-tight">Transforme observações pedagógicas em decisões de aula.</h1>
          <p className="mt-5 text-lg leading-8 text-blue-100/80">
            Registre situações das turmas do 6º ao 9º ano, acompanhe padrões e simule relatórios pedagógicos com apoio de IA.
          </p>
          <div className="mt-9 grid grid-cols-3 gap-4">
            {['Registre observações', 'Analise padrões', 'Planeje intervenções'].map((text) => (
              <div key={text} className="rounded-2xl border border-white/10 bg-white/8 p-4 text-sm font-semibold text-blue-50">{text}</div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-md rounded-3xl bg-white p-8 text-ink shadow-2xl">
          <h2 className="text-2xl font-bold">Bem-vindo de volta</h2>
          <p className="mt-2 text-sm text-slate-500">Acesse sua conta para gerenciar suas turmas.</p>
          <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <Field label="E-mail">
              <IconInput icon={<Mail size={18} />} defaultValue="maria@escola.edu.br" />
            </Field>
            <Field label="Senha">
              <IconInput icon={<Lock size={18} />} defaultValue="12345678" type="password" />
            </Field>
            <Button type="submit" className="w-full">Entrar na plataforma</Button>
          </form>
          <p className="mt-6 border-t border-slate-100 pt-5 text-center text-xs text-slate-400">Seguro • Gratuito • Focado em professores</p>
        </section>
      </div>
    </main>
  );
}
