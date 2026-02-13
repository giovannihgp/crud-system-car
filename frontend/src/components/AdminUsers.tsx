import { useEffect, useState } from "react";
import UsersList from "./UsersList";
import UserEditor from "./UserEdit";
import { userService } from "../services/userService";
import type { User } from "../types/user";

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        userService.listar().then(setUsers);
    }, []);

    const handleSave = async (data: Partial<User>): Promise<User> => {
        if(!selectedUser) {
            throw new Error("Nenhum usuário selecionado");
        }
        const updated = await userService.atualizarPorAdmin(
            selectedUser.id,
            data
        );
        setSelectedUser(updated);
        setUsers((prev) => 
            prev.map((u) => (u.id === updated.id ? updated : u))
        );
        return updated;
    } 

    return (
        <div className="w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Usuários</h2>
                        <UsersList users={users} onSelect={setSelectedUser} />
                    </div>
                    <div>
                        {selectedUser ? (
                            <>
                                <h2 className="text-xl font-bold mb-4">Editar usuário</h2>
                                <UserEditor
                                    user={selectedUser}
                                    canEdit
                                    onSave={handleSave}
                                />
                            </>
                        ) : (
                            <p className="text-sm font-semibold">Selecione um usuário para editar</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}