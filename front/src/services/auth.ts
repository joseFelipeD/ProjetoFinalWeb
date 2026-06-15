import api from "./api";
import type { Professor } from "../types";

export async function login(email: string, senha: string) {
  const body = new URLSearchParams();

  body.append("username", email);
  body.append("password", senha);

  const response = await api.post("/auth/login", body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  // O endpoint /auth/login segue o padrão OAuth2 e retorna `access_token`.
  localStorage.setItem("token", response.data.access_token);

  return response.data;
}

export async function getUsuarioLogado(): Promise<Professor> {
  const response = await api.get<Professor>("/auth/me");
  return response.data;
}

export function logout() {
  localStorage.removeItem("token");
}
