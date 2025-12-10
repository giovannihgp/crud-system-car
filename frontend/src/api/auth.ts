import { apiFetch } from "./client";
import type { User } from "../types/user";

export async function login(username: string, password: string): Promise<boolean> {
    try {
        const res = await apiFetch<{ token: string, user: User }>("/login", {
            method: "POST",
            body: JSON.stringify({ username, password })
        });

        localStorage.setItem("token", res.token);
        return true;
    } catch {
        return false;
    }
}

export async function logout(): Promise<void> {
    await apiFetch("/logout", { method: "POST"});
    localStorage.removeItem("token");
}

export async function getUser(): Promise<User | null> {
    try {
        return await apiFetch<User>("/user");
    } catch {
        return null;
    }
}
