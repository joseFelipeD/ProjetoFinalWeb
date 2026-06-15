import api from "./api";
import type { NovaObservacaoInput, Observacao } from "../types";

export async function listarObservacoes(): Promise<Observacao[]> {
  const response = await api.get<Observacao[]>("/observacoes");
  return response.data;
}

export async function criarObservacao(dados: NovaObservacaoInput): Promise<Observacao> {
  const response = await api.post<Observacao>("/observacoes", dados);
  return response.data;
}

export async function excluirObservacao(id: number): Promise<void> {
  await api.delete(`/observacoes/${id}`);
}
