import type { ReactNode } from 'react';
import { BrainCircuit, FilePlus2, History, LayoutDashboard, LogOut, UserRound, UsersRound } from 'lucide-react';
import { Brand } from '../common/Brand';
import { Avatar } from '../ui';
import type { Page, Professor } from '../../types';

type SidebarProps = {
  currentPage: Page;
  professor: Professor;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
};

const menu: Array<{ page: Page; label: string; icon: ReactNode }> = [
  { page: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { page: 'turmas', label: 'Turmas', icon: <UsersRound size={18} /> },
  { page: 'nova-observacao', label: 'Nova observação', icon: <FilePlus2 size={18} /> },
  { page: 'historico', label: 'Histórico', icon: <History size={18} /> },
  { page: 'gerar-relatorio', label: 'Relatório com IA', icon: <BrainCircuit size={18} /> }
];

export function Sidebar({ currentPage, professor, onNavigate, onLogout }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col bg-sidebar text-white lg:flex">
      <div className="border-b border-white/10 px-5 py-5">
        <Brand name="EduInsight" subtitle="IA pedagógica" />
      </div>

      <nav className="flex-1 px-3 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Menu principal</p>
        <div className="space-y-2">
          {menu.map((item) => {
            const active = currentPage === item.page;
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => onNavigate(item.page)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  active ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={() => onNavigate('perfil')}
          className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
            currentPage === 'perfil' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          <UserRound size={18} /> Perfil
        </button>
        <button type="button" onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">
          <LogOut size={18} /> Sair
        </button>
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/8 p-3">
          <Avatar initials="MS" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{professor.nomeExibicao}</p>
            <p className="text-xs text-slate-400">Professora</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
