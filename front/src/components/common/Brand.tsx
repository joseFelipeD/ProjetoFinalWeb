import { BookOpen } from 'lucide-react';

type BrandProps = {
  name: string;
  subtitle: string;
  size?: 'sm' | 'md';
};

const sizes = {
  sm: { box: 'h-11 w-11', icon: 22, name: 'font-bold' },
  md: { box: 'h-12 w-12', icon: 24, name: 'text-xl font-bold' }
};

export function Brand({ name, subtitle, size = 'sm' }: BrandProps) {
  const config = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <div className={`flex items-center justify-center rounded-2xl bg-blue-600 ${config.box}`}>
        <BookOpen size={config.icon} />
      </div>
      <div>
        <p className={`leading-tight ${config.name}`}>{name}</p>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">{subtitle}</p>
      </div>
    </div>
  );
}
