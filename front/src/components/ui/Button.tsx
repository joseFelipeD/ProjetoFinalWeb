import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'link';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger',
  link: 'inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-blue-700'
};

export function Button({ variant = 'primary', icon, children, className = '', type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={`${variantClass[variant]} ${className}`.trim()} {...rest}>
      {icon}
      {children}
    </button>
  );
}
