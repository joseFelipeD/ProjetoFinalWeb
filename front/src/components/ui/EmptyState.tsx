type EmptyStateProps = {
  message: string;
  className?: string;
};

export function EmptyState({ message, className = 'px-5 py-10 text-center text-slate-500' }: EmptyStateProps) {
  return <div className={className}>{message}</div>;
}
