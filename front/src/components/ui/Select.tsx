import type { SelectHTMLAttributes } from 'react';

export type SelectOption = {
  value: string | number;
  label: string;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  options: SelectOption[];
};

export function Select({ options, className = '', ...rest }: SelectProps) {
  return (
    <select className={`input ${className}`.trim()} {...rest}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
