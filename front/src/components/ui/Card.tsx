import type { ReactNode } from 'react';

type CardVariant = 'light' | 'dark';

type CardProps = {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
};

const baseClass: Record<CardVariant, string> = {
  light: 'card',
  dark: 'rounded-3xl bg-blue-700 text-white shadow-card'
};

export function Card({ title, subtitle, icon, action, variant = 'light', className = 'p-6', children }: CardProps) {
  const hasHeader = Boolean(title || icon || action);
  const isDark = variant === 'dark';

  return (
    <section className={`${baseClass[variant]} ${className}`.trim()}>
      {hasHeader && (
        <div className={`mb-5 flex items-center justify-between gap-3 font-bold ${isDark ? 'text-white' : 'text-ink'}`}>
          <div className="flex items-center gap-3">
            {icon}
            <div>
              {title && <h2 className="font-bold">{title}</h2>}
              {subtitle && <p className={`text-sm font-normal ${isDark ? 'text-blue-100' : 'text-slate-500'}`}>{subtitle}</p>}
            </div>
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
