import api from "./api";

export type ResumoDashboard = {
  turmasAtivas: number;
  observacoesTotal: number;
  relatoriosTotal: number;
};

export type ObservacoesPorMes = {
  mes: string;
  total: number;
};

export async function getResumo(): Promise<ResumoDashboard> {
  const response = await api.get<ResumoDashboard>("/dashboard/resumo");
  return response.data;
}

export async function getObservacoesPorMes(ano?: number): Promise<ObservacoesPorMes[]> {
  const response = await api.get<ObservacoesPorMes[]>("/dashboard/observacoes-por-mes", {
    params: ano ? { ano } : undefined,
  });
  return response.data;
}
