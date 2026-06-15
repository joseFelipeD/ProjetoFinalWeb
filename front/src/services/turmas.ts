import api from "./api";
import type { NovaTurmaInput, Turma } from "../types";

export async function listarTurmas(search?: string): Promise<Turma[]> {
  const response = await api.get<Turma[]>("/turmas", {
    params: search ? { search } : undefined,
  });
  return response.data;
}

export async function criarTurma(dados: NovaTurmaInput): Promise<Turma> {
  const response = await api.post<Turma>("/turmas", dados);
  return response.data;
}

export async function excluirTurma(id: number): Promise<void> {
  await api.delete(`/turmas/${id}`);
}
