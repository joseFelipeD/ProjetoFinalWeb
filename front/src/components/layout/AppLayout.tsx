import type { ReactNode } from 'react';
import type { Page, Professor } from '../../types';
import { Sidebar } from './Sidebar';

type AppLayoutProps = {
  currentPage: Page;
  professor: Professor;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  children: ReactNode;
};

export function AppLayout({ currentPage, professor, onNavigate, onLogout, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar currentPage={currentPage} professor={professor} onNavigate={onNavigate} onLogout={onLogout} />
      <main className="min-h-screen px-5 py-6 lg:ml-64 lg:px-8">{children}</main>
    </div>
  );
}
