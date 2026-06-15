import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getUsuarioLogado, login as loginRequest, logout as logoutRequest } from "../services/auth";
import type { Professor } from "../types";

type AuthContextValue = {
  professor: Professor | null;
  isAuthenticated: boolean;
  carregando: boolean;
  entrar: (email: string, senha: string) => Promise<void>;
  sair: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Ao iniciar, se já houver um token salvo, recupera o professor logado.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCarregando(false);
      return;
    }

    getUsuarioLogado()
      .then((dados) => setProfessor(dados))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setCarregando(false));
  }, []);

  async function entrar(email: string, senha: string) {
    await loginRequest(email, senha);
    const dados = await getUsuarioLogado();
    setProfessor(dados);
  }

  function sair() {
    logoutRequest();
    setProfessor(null);
  }

  return (
    <AuthContext.Provider value={{ professor, isAuthenticated: Boolean(professor), carregando, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  }
  return contexto;
}
