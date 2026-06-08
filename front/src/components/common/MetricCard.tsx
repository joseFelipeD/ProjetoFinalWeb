import type { ReactNode } from 'react';

type MetricCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  trend?: string;
};

export function MetricCard({ title, value, subtitle, icon, trend }: MetricCardProps) {
  return (
    <article className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-2xl bg-blue-50 p-3 text-primary">{icon}</div>
        {trend && <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">{trend}</span>}
      </div>
      <strong className="mt-6 block text-3xl font-bold text-ink">{value}</strong>
      <p className="mt-1 font-medium text-slate-700">{title}</p>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
    </article>
  );
}
