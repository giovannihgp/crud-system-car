import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/user";
import { login as apiLogin, logout as apiLogout, getUser } from "../api/auth";
import { userService } from "../services/userService";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (
    name: string, 
    username: string, 
    email: string, 
    password: string
  ) => Promise<boolean>;
  atualizarPerfil: (data: Partial<User>) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const u = await getUser();
        setUser(u);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { token, user } = await apiLogin(username, password);

      localStorage.setItem("token", token);
      setUser(user);

      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const register = async (
    name: string,
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      await userService.adicionar({ name, username, email, password });

      const { token, user } = await apiLogin(username, password);

      localStorage.setItem("token", token);
      setUser(user);

      return true;
    } catch (err: any) {
      console.error("Erro no registro:", err);
      throw err;
    }
  };

  const atualizarPerfil = async (data: Partial<User>): Promise<User> => {
    const novoUser = await userService.atualizarPerfil(data);
    setUser(novoUser);
    return novoUser;
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, atualizarPerfil }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
};
