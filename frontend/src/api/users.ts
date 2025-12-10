import { apiFetch } from "./client";
import type { User } from "../types/user";

export async function getUsers(): Promise<User[]> {
    return await apiFetch<User[]>("/users");
}

export async function createUser(data: Partial<User>): Promise<User> {
    return await apiFetch<User>("/users", {
        method: "POST",
        body: JSON.stringify(data),
    });
}