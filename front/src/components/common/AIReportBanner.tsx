import { BrainCircuit } from 'lucide-react';
import { Button, Card } from '../ui';

type AIReportBannerProps = {
  turmaNome?: string;
  onView: () => void;
};

export function AIReportBanner({ turmaNome, onView }: AIReportBannerProps) {
  return (
    <Card variant="dark" className="mt-6 p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/15 p-4">
            <BrainCircuit />
          </div>
          <div>
            <h2 className="text-lg font-bold">Relatório inteligente disponível para {turmaNome}</h2>
            <p className="text-sm text-blue-100">
              A IA analisa suas observações para identificar padrões, pontos de atenção e sugestões pedagógicas.
            </p>
          </div>
        </div>
        <Button variant="secondary" onClick={onView}>
          Ver relatório
        </Button>
      </div>
    </Card>
  );
}
