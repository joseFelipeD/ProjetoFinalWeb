import type { ReactNode } from 'react';

type SidebarNavItemProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
};

export function SidebarNavItem({ icon, label, active = false, onClick }: SidebarNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
        active ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
