import type { ReactNode } from 'react';

type BadgeProps = {
  className?: string;
  children: ReactNode;
};

export function Badge({ className = 'bg-slate-100 text-slate-700', children }: BadgeProps) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`.trim()}>{children}</span>;
}
