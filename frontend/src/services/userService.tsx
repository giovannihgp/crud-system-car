import { getUsers, createUser, updateUser, changePassword, getUser } from "../api/users";
import type { User } from "../types/user";

export const userService = {
    async listar(): Promise<User[]> {
        return await getUsers();
    },

    async adicionar(data: {
        name: string;
        username: string;
        email: string;
        password: string;
    }): Promise<User> {
        return await createUser(data);
    },
    
    async atualizar(id: number, username: string): Promise<User> {
        return updateUser(id, username);
    },

    async mudarSenha(
        current_password: string,
        password: string,
        password_confirmation: string,
    ): Promise<void> {
        return changePassword({
            current_password, 
            password, 
            password_confirmation
        });
    },

    async meuUser(): Promise<User> {
        return await getUser();
    }
};