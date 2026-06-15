type BulletListProps = {
  items: string[];
  className?: string;
  itemClassName?: string;
};

export function BulletList({ items, className = '', itemClassName = '' }: BulletListProps) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} className={itemClassName}>
          • {item}
        </li>
      ))}
    </ul>
  );
}
