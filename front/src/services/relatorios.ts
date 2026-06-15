import api from "./api";
import type { RelatorioIA } from "../types";

export type GerarRelatorioInput = {
  turmaId: number;
  dataInicio: string;
  dataFim: string;
  dimensoes: string[];
};

export async function gerarRelatorio(dados: GerarRelatorioInput): Promise<RelatorioIA> {
  const response = await api.post<RelatorioIA>("/relatorios/gerar", dados);
  return response.data;
}

export async function ultimoRelatorio(turmaId?: number): Promise<RelatorioIA | null> {
  try {
    const response = await api.get<RelatorioIA>("/relatorios/ultimo", {
      params: turmaId ? { turmaId } : undefined,
    });
    return response.data;
  } catch {
    // 404 quando o professor ainda não gerou nenhum relatório.
    return null;
  }
}
