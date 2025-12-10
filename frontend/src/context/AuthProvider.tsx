import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/user";
import { login as apiLogin, logout as apiLogout, getUser } from "../api/auth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>; 
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const u = await getUser();
            setUser(u);
            setLoading(false);
        })();
    }, []);


    const login = async (username: string, password: string): Promise<boolean> => {
        const ok = await apiLogin(username, password);
        if (!ok) return false;

        const u = await getUser();
        setUser(u);

        return !!u;
    };

    const logout = async () => {
        await apiLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );    
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
    return ctx;
};
