import type { ReactNode } from 'react';

type CalloutTone = 'info' | 'success' | 'error' | 'warning';

type InfoCalloutProps = {
  tone?: CalloutTone;
  title?: ReactNode;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

const toneClass: Record<CalloutTone, string> = {
  info: 'border-blue-100 bg-blue-50 text-blue-900',
  success: 'border-green-100 bg-green-50 text-green-700',
  error: 'border-red-100 bg-red-50 text-red-700',
  warning: 'border-amber-100 bg-amber-50 text-amber-900'
};

export function InfoCallout({ tone = 'info', title, icon, className = 'p-4', children }: InfoCalloutProps) {
  return (
    <div className={`rounded-2xl border text-sm ${toneClass[tone]} ${className}`.trim()}>
      {(title || icon) && (
        <div className="mb-3 flex items-center gap-2 font-bold">
          {icon}
          {title}
        </div>
      )}
      {children}
    </div>
  );
}
