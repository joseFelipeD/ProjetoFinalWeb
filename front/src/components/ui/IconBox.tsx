import type { ReactNode } from 'react';

type IconBoxProps = {
  children: ReactNode;
  className?: string;
};

export function IconBox({ children, className = 'bg-blue-50 text-primary' }: IconBoxProps) {
  return <div className={`rounded-2xl p-3 ${className}`}>{children}</div>;
}
