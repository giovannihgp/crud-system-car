import { apiFetch } from "./client";
import type { User } from "../types/user";

export async function getUsers(): Promise<User[]> {
    return await apiFetch<User[]>("/users", { method: "GET" });
}

export async function createUser(data: {
    name: string;
    username: string;
    email: string;
    password: string;
}): Promise<User> {
    return await apiFetch<User>("/users", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateUserPerfil(data: Partial<User>) {
    return apiFetch<User>('/user/perfil', {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function updateUserAdmin(id: number, data: Partial<User>) {
    return apiFetch<User>(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function changePassword(data: {
    current_password: string;
    password: string;
    password_confirmation: string;
}): Promise<void> {
    await apiFetch("/novaSenha", {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function getUser(): Promise<User> {
    return await apiFetch<User>("/me", { method: "GET" });
}