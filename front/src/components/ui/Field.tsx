import type { ReactNode } from 'react';

type FieldProps = {
  label: string;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
};

export function Field({ label, htmlFor, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label className="label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}
