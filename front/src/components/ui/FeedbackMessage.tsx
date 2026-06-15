import type { ReactNode } from 'react';

type FeedbackTone = 'success' | 'error';

type FeedbackMessageProps = {
  tone: FeedbackTone;
  children: ReactNode;
};

const toneClass: Record<FeedbackTone, string> = {
  success: 'border-green-100 bg-green-50 text-green-700',
  error: 'border-red-100 bg-red-50 text-red-700'
};

export function FeedbackMessage({ tone, children }: FeedbackMessageProps) {
  return <div className={`rounded-xl border px-4 py-3 text-sm font-semibold ${toneClass[tone]}`}>{children}</div>;
}
