import { useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { Field } from './Field';
import { Select } from './Select';
import type { SelectOption } from './Select';

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  label: string;
  options: SelectOption[];
  fieldClassName?: string;
};

export function SelectField({ label, options, fieldClassName, id, ...rest }: SelectFieldProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <Field label={label} htmlFor={selectId} className={fieldClassName}>
      <Select id={selectId} options={options} {...rest} />
    </Field>
  );
}
