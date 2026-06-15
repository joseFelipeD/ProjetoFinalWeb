type ProgressBarProps = {
  value: number;
  trackClassName?: string;
  barClassName?: string;
  heightClassName?: string;
};

export function ProgressBar({
  value,
  trackClassName = 'bg-slate-100',
  barClassName = 'bg-blue-500',
  heightClassName = 'h-2'
}: ProgressBarProps) {
  return (
    <div className={`${heightClassName} rounded-full ${trackClassName}`}>
      <div
        className={`${heightClassName} rounded-full transition-all ${barClassName}`}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}
