import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Field } from './Field';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  fieldClassName?: string;
};

export function TextField({ label, fieldClassName, id, className = '', ...rest }: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <Field label={label} htmlFor={inputId} className={fieldClassName}>
      <input id={inputId} className={`input ${className}`.trim()} {...rest} />
    </Field>
  );
}
