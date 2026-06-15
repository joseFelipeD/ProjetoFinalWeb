import type { SelectHTMLAttributes } from 'react';
import { Field } from './Field';
import { Select } from './Select';
import type { SelectOption } from './Select';

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  label: string;
  options: SelectOption[];
  fieldClassName?: string;
};

export function SelectField({ label, options, fieldClassName, ...rest }: SelectFieldProps) {
  return (
    <Field label={label} className={fieldClassName}>
      <Select options={options} {...rest} />
    </Field>
  );
}
