import type { ReactNode } from 'react';

type StatBoxProps = {
  value: ReactNode;
  label: string;
  className?: string;
};

export function StatBox({ value, label, className = 'rounded-xl bg-white/80 p-4' }: StatBoxProps) {
  return (
    <div className={className}>
      <strong className="block text-2xl text-ink">{value}</strong>
      <span className="text-xs text-slate-500">{label}</span>
    </div>
  );
}
