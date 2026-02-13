import { apiFetch } from "./client";
import type { User } from "../types/user";

export async function login(username: string, password: string) {
    return apiFetch<{ token: string; user: User }>("/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
    });
}

export async function logout(): Promise<void> {
    return apiFetch("/logout", { method: "POST" });
}

export async function getUser(): Promise<User> {
    return await apiFetch<User>("/me", { method: "GET" });
}
