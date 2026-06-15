import type { InputHTMLAttributes, ReactNode } from 'react';

type IconInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: ReactNode;
};

export function IconInput({ icon, className = '', ...rest }: IconInputProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
      <input className={`input-icon ${className}`.trim()} {...rest} />
    </div>
  );
}
