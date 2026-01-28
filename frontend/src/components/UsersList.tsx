import { userService } from "../services/userService";
import type { User } from "../types/user";
import { useState, useEffect } from "react";

export default function UsersList() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const load = async () => {
            const users = await userService.listar();
            setUsers(users);
        };
        load();
    }, []);

    return (
        <div>
            <ul className="space-y-2">
                {users.map((u) => {
                    return (
                        <li
                            key={u.id}
                            className="content-center px-4 py-2 rounded-lg border hover:shadow-md shadow-sm transition-all min-h-[61px]"
                        >
                            <div className="flex flex-1 justify-between items-center">
                                <label>Nome:</label>
                                <div className="flex gap-3">
                                    <span className="">{u.name}</span>
                                </div>
                            </div>
                            <div className="flex flex-1 justify-between items-center">
                                <label>Nome de Usuário:</label>
                                <div className="flex gap-3">
                                    <span className="">{u.username}</span>
                                </div>
                            </div>
                            <div className="flex flex-1 justify-between items-center">
                                <label>E-Mail:</label>
                                <div className="flex gap-3">
                                    <span className="">{u.email}</span>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}