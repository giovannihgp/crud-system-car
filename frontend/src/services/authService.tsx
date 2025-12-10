// import type { User } from "../types/user";
// import { apiFetch } from "../api/client";

// export const authService = {
//     async login(username: string, password: string): Promise<User> {
//         return apiFetch<User>("/login", {
//             method: "POST",
//             body: JSON.stringify({ username, password })
//         });
//     }, 

//     async logout(): Promise<void> {
//         await apiFetch<void>("/logout", { method: "POST" });
//     },

//     async getUser(): Promise<User | null> {
//         try {
//             return await apiFetch<User>("/api/me");
//         } catch {
//             return null;
//         }
//     }
// };
