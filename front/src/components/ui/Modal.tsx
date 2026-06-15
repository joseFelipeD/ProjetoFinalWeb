import type { ReactNode } from 'react';

type ModalProps = {
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ title, description, onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-ink">{title}</h2>
            {description && <p className="text-sm text-slate-500">{description}</p>}
          </div>
          <button type="button" className="rounded-full bg-slate-100 px-3 py-1 text-slate-500" onClick={onClose}>
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
