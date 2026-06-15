import type { ReactNode } from 'react';
import { ProgressBar } from './ProgressBar';

type LabeledProgressProps = {
  label: string;
  value: ReactNode;
  percent: number;
  barClassName?: string;
};

export function LabeledProgress({ label, value, percent, barClassName }: LabeledProgressProps) {
  return (
    <div>
      <div className="mb-1 flex justify-between">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <ProgressBar value={percent} barClassName={barClassName} />
    </div>
  );
}
