import type { ReactNode } from 'react';

export type Stat = {
  value: ReactNode;
  label: string;
};

type StatGroupProps = {
  stats: Stat[];
  className?: string;
};

export function StatGroup({ stats, className = '' }: StatGroupProps) {
  return (
    <div className={`grid grid-cols-3 ${className}`.trim()}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <strong className="block text-xl text-ink">{stat.value}</strong>
          <span className="text-xs text-slate-400">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
