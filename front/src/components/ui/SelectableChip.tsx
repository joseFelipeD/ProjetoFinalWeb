type SelectableChipProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export function SelectableChip({ label, selected, onClick }: SelectableChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
        selected
          ? 'border-primary bg-blue-50 text-primary ring-4 ring-blue-100'
          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
      }`}
    >
      {label}
    </button>
  );
}
