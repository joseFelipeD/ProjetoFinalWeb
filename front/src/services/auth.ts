import api from "./api";

export async function login(email: string, senha: string) {
  const body = new URLSearchParams();

  body.append("username", email);
  body.append("password", senha);

  const response = await api.post("/auth/login", body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  localStorage.setItem("token", response.data.accessToken);

  return response.data;
}

export async function getUsuarioLogado() {
  const response = await api.get("/auth/me");
  return response.data;
}

export function logout() {
  localStorage.removeItem("token");
}
