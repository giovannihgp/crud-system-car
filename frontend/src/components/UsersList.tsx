import type { User } from "../types/user";
import { useTheme } from "../contexts/ThemeContext";

interface UsersListProps {
    users: User[];
    onSelect: (user: User) => void;
}

export default function UsersList({ users, onSelect }: UsersListProps) {
    const { dark } = useTheme();
    const cardLight = "border-gray-300 bg-white/80 divide-gray-300";
    const cardDark = "bg-zinc-700/50 border-neutral-600 divide-gray-600";
    const labelLight = "text-gray-700";
    const labelDark = "text-gray-400";
    return (
        <ul className={`w-full max-w-xl mx-auto rounded-lg border divide-y ${dark ? cardDark : cardLight}`}>
            {users.map((u) => (
                <li
                    key={u.id}
                    onClick={() => onSelect(u)}
                    className="cursor-pointer hover:bg-gray-100/35 px-3 py-2 shadow-sm transition-all hover:shadow-md"
                >
                    <div className="grid grid-cols-3">
                        <p className="font-bold">Nome:</p>
                        <p className={`col-span-2 text-right ${dark ? labelDark : labelLight}`}>{u.name}</p>
                        <p className="font-bold">Usuário:</p>
                        <p className={`col-span-2 text-right ${dark ? labelDark : labelLight}`}>{u.username}</p>
                        <p className="font-bold">E-mail:</p>
                        <p className={`col-span-2 text-right ${dark ? labelDark : labelLight}`}>{u.email}</p>
                    </div>
                </li>
            ))}
        </ul>
        // w-full
        // max-w-xl
        // mx-auto
        // rounded-lg
        // border
        // divide-y
    );
}
