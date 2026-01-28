// import React, { createContext, useContext, useEffect, useState } from "react";
// import type { User } from "../types/user";
// import { authService } from "../services/authService";

// interface AuthContextType {
//     user: User | null;
//     isLoading: boolean;
//     login: (username: string, password: string) => Promise<void>;
//     logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//     const [user, setUser] = useState<User | null>(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         authService
//             .getUser()
//             .then((u) => setUser(u))
//             .catch(() => setUser(null))
//             .finally(() => setIsLoading(false));
//     }, []);

//     async function login(username: string, password: string) {
//         const loggedUser = await authService.login(username, password);
//         setUser(loggedUser);
//     }

//     async function logout() {
//         await authService.logout();
//         setUser(null);
//     }

//     return (
//         <AuthContext.Provider value={{ user, isLoading, login, logout}}>
//             { children }
//         </AuthContext.Provider>
//     );
// }

// export function useAuth() {
//     const ctx = useContext(AuthContext);
//     if(!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
//     return ctx;
// }