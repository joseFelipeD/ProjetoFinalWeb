import type { InputHTMLAttributes } from 'react';
import { Field } from './Field';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  fieldClassName?: string;
};

export function TextField({ label, fieldClassName, className = '', ...rest }: TextFieldProps) {
  return (
    <Field label={label} className={fieldClassName}>
      <input className={`input ${className}`.trim()} {...rest} />
    </Field>
  );
}
