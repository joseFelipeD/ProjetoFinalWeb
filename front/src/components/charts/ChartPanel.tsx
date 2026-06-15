import type { ReactNode } from 'react';

type ChartPanelProps = {
  title: string;
  children: ReactNode;
};

export function ChartPanel({ title, children }: ChartPanelProps) {
  return (
    <div className="h-72 rounded-2xl border border-slate-100 p-4">
      <h3 className="mb-3 font-bold text-ink">{title}</h3>
      {children}
    </div>
  );
}
