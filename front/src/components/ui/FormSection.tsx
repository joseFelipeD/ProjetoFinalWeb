import type { ReactNode } from 'react';

type FormSectionProps = {
  title: string;
  className?: string;
  children: ReactNode;
};

export function FormSection({ title, className = 'p-5', children }: FormSectionProps) {
  return (
    <section className={`card ${className}`.trim()}>
      <h2 className="mb-4 font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}
