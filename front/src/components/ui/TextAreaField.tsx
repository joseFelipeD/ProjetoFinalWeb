import { useId } from 'react';
import type { ReactNode, TextareaHTMLAttributes } from 'react';
import { Field } from './Field';

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  fieldClassName?: string;
  hint?: ReactNode;
};

export function TextAreaField({ label, fieldClassName, hint, id, className = '', ...rest }: TextAreaFieldProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <Field label={label} htmlFor={textareaId} className={fieldClassName}>
      <textarea id={textareaId} className={`input ${className}`.trim()} {...rest} />
      {hint}
    </Field>
  );
}
