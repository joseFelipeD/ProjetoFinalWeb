export function getIniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return '';
  if (partes.length === 1) return partes[0].charAt(0).toUpperCase();

  const primeiro = partes[0].charAt(0);
  const ultimo = partes[partes.length - 1].charAt(0);
  return (primeiro + ultimo).toUpperCase();
}
