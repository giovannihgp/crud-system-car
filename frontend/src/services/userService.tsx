import { getUsers, createUser, changePassword, getUser, updateUserPerfil, updateUserAdmin } from "../api/users";
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
    
    async atualizarPerfil(data: Partial<User>) {
        return updateUserPerfil(data);
    },

    async atualizarPorAdmin(id: number, data: Partial<User>) {
        return updateUserAdmin(id, data);
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