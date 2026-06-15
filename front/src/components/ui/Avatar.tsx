type AvatarProps = {
  initials: string;
  className?: string;
};

export function Avatar({ initials, className = 'h-10 w-10 text-sm' }: AvatarProps) {
  return (
    <div className={`flex items-center justify-center rounded-full bg-blue-600 font-bold text-white ${className}`.trim()}>
      {initials}
    </div>
  );
}
