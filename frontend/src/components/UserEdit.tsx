import { useState, useEffect } from "react";
import type { User } from "../types/user";
import { useTheme } from "../contexts/ThemeContext";
import UserIcon from "../assets/icons/UserIcon";
import PencilIcon from "../assets/icons/PencilIcon";
import { User as UserI, AtSign, Mail } from "lucide-react";

interface UserEditorProps {
    user: User | null;
    canEdit?: boolean;
    onSave: (data: Partial<User>) => Promise<User>;
}

export default function UserEditor({ user, canEdit, onSave }: UserEditorProps) {
    const { dark } = useTheme();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState<Partial<User>>({});
    const [loading, setLoading] = useState(false);
    const [erroUser, setErroUser] = useState("");
    const [erroEmail, setErroEmail] = useState("");
    const [erro, setErro] = useState("");

    useEffect(() => {
        if(user) {
            setForm({
                name: user.name,
                username: user.username,
                email: user.email,
            });
        }
    }, [user]);

    if(!user) return null;

    const handleSalvarEdit = async () => {
        try {
            setLoading(true);
            await onSave(form);
            setEditing(false);
        } catch (err: any) {
            console.log("Erro recebido:", err);
            if (err?.errors?.username) {
                setErroUser("Esse username já existe");
                setTimeout(() => setErroUser(""), 3000);
            } else if (err?.errors?.email) {
                setErroEmail("Esse e-mail já existe");
                setTimeout(() => setErroEmail(""), 3000);
            } else {
                setErro("Erro ao atualizar usuário");
                setTimeout(() => setErro(""), 3000);
            }
        } finally {
            setLoading(false);
        }
    }

    const cardBase = "rounded-xl border shadow-sm transition-colors";
    const cardLight = "border-gray-100 bg-white/80";
    const cardDark = "bg-zinc-700/50 border-neutral-600";

    const labelBase = "text-sm font-semibold";
    const labelLight = "text-gray-500";
    const labelDark = "text-gray-300";

    const valueLight = "text-gray-900";
    const valueDark = "text-gray-100";

    const inputBase = "border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 w-full pl-10 focus:ring-2";
    const inputLight = "border-gray-300 focus:border-indigo-500 focus:ring-indigo-400 text-gray-800 placeholder-gray-500 bg-gray-100";
    const inputDark = "border-neutral-500 focus:border-purple-700 focus:ring-purple-500 text-gray-200 placeholder-gray-400 bg-zinc-800";
    const inputErroLight = "border-red-500 ring-2 ring-red-300 placeholder-red-700 focus:placeholder-red-600";
    const inputErroDark = "border-red-400 ring-2 ring-red-200 placeholder-red-500 focus:placeholder-red-500";

    const flex = "flex flex-col flex-1";

    const btnBase = "rounded-lg font-semibold text-sm shadow-sm transition-all cursor-pointer border";
    const btnPrimaryLight = "bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white";
    const btnPrimaryDark = "border-violet-400 text-violet-400 hover:text-white hover:bg-violet-500 active:bg-violet-700";

    const btnSuccessLight = "bg-green-600 hover:bg-green-700 active:bg-green-800 text-white border-0";
    const btnSuccessDark = "bg-emerald-700 hover:bg-emerald-700 active:bg-emerald-800 text-white border-0";
    const btnDanger = "bg-red-600 hover:bg-red-700 text-white border-0";

    const inputClass = (hasError?: boolean) => `
        ${inputBase} ${
            hasError
                ? dark
                    ? inputErroDark
                    : inputErroLight
                : dark
                    ? inputDark
                    : inputLight
        }`
    ;

    return (
        <>
        <div className={`${cardBase} flex flex-row max-w-4xl mx-auto my-10 px-3 py-5 ${dark ? cardDark : cardLight}`}>
            <div className="px-2">
                <UserIcon
                    classDiv="items-center justify-center"
                    classIcon={`h-23 w-23 ${dark ? "text-violet-500" : "text-indigo-600"}`}
                />
            </div>
            <div className="flex-col flex space-y-1.5 pl-3 flex-1">
                <p className={`text-lg font-medium flex ${dark ? labelDark : labelLight}`}><UserI className="w-5 pt-0.5 me-1" />{user.name}</p>
                <p className={`${labelBase} flex ${dark ? labelDark : labelLight}`}><AtSign className="w-3.5 me-1" />{user.username}</p>
                <p className={`${labelBase} flex ${dark ? labelDark : labelLight}`}><Mail className="w-4 me-1"/>{user.email}</p>
            </div>
            <div className="pr-3">
                <button 
                    onClick={() => setEditing(true)} 
                    className={`${btnBase} px-4 py-2 ${dark ? btnPrimaryDark : btnPrimaryLight}`}
                >
                    <div className="flex">
                        <PencilIcon 
                            classDiv="pt-1"
                            classIcon="h-5 w-5"
                        />
                        <p className="py-1 ps-2">Editar Perfil</p>
                    </div>
                </button>
            </div>
        </div>
        <div className="my-9">
            <p className="font-bold text-2xl">Informações Pessoais</p>
        </div>
        {!editing && (
            <div className="mx-auto max-w-4xl my-7">
                <div className="">
                    <dl 
                        className={`${cardBase} space-y-2 items-center divide-y py-3 px-1 ${dark 
                            ? `${cardDark} divide-gray-800`
                            : `${cardLight} divide-gray-200`
                        }`}
                    >
                        {[
                            ["Nome", user.name],
                            ["Usuário", user.username],
                            ["E-mail", user.email],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="grid grid-cols-3 items-center px-4 py-3"
                            >
                                <dt className={`text-sm ${dark ? labelDark : labelLight}`}>
                                    {label}
                                </dt>
                                <dd
                                    className={`col-span-2 text-right text-sm font-medium break-all ${
                                        dark ? valueDark : valueLight
                                    }`}
                                >
                                    {value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        )}
        {editing && (
            <div className={`${cardBase} px-5 py-3 mx-auto max-w-4xl ${dark ? cardDark : cardLight}`}>
                <form className="space-y-1.5">
                    <div className={`${flex}`}>
                        <div className="pb-1">
                            <label className={`${labelBase} ${dark ? labelDark : labelLight}`}>
                                Nome:
                            </label>
                        </div>
                        <div className="relative">
                            <UserI className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? labelDark : labelLight}`} />
                            <input 
                                value={form.name ?? ""}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                onKeyDown={(e) => {
                                    if(e.key === "Enter"){
                                        e.preventDefault();
                                        handleSalvarEdit();
                                    }
                                }}
                                className={inputClass(!!erro)}
                                placeholder="Digite seu Nome..."
                            />
                        </div>
                    </div>
                    <div className={`${flex}`}>
                        <div className="pb-1">
                            <label className={`${labelBase} ${dark ? labelDark : labelLight}`}>
                                Usuário:
                            </label>
                        </div>
                        <div className="relative">
                            <AtSign className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? labelDark : labelLight}`} />
                            <input 
                                value={form.username ?? ""}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                onKeyDown={(e) => {
                                    if(e.key === "Enter"){
                                        e.preventDefault();
                                        handleSalvarEdit();
                                    }
                                }}
                                className={inputClass(!!erroUser || !!erro)}
                                placeholder="Digite seu Usuário..."
                            />
                        </div>
                    </div>
                    <div className={`${flex}`}>
                        <div className="pb-1">
                            <label className={`${labelBase} ${dark ? labelDark : labelLight}`}>
                                E-mail:
                            </label>
                        </div>
                        <div className="relative">
                            <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? labelDark : labelLight}`} />
                            <input
                                value={form.email ?? ""}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                onKeyDown={(e) => {
                                    if(e.key === "Enter"){
                                        e.preventDefault();
                                        handleSalvarEdit();
                                    }
                                }}
                                className={inputClass(!!erroEmail || !!erro)}
                                placeholder="Digite seu E-mail..."
                            />
                        </div>
                    </div>
                </form>
                <div className="flex-row-reverse flex mt-2">
                    <button 
                        type="button"
                        onClick={() => setEditing(false)}
                        className={`${btnBase} px-4 py-2 mt-2 ${btnDanger}`}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSalvarEdit}
                        disabled={loading}
                        className={`${btnBase} px-5 py-2 mt-2 me-3
                            ${loading ? "cursor-not-allowed opacity-80" 
                                : dark ? btnSuccessDark : btnSuccessLight
                        }`}
                    >
                        {loading ? "Salvando..." : "Salvar"}
                    </button>
                    <div className="flex-1 pl-27 pt-1">
                        {erro && <p className="text-sm text-red-500">{erro}</p>}
                        {erroUser && <p className="text-red-500 font-semibold text-center">{erroUser}</p>}
                        {erroEmail && <p className="text-red-500 font-semibold text-center">{erroEmail}</p>}
                    </div>
                </div>
            </div>
        )}
        {canEdit && (
            <>
            {/* <div className="flex justify-end gap-2 mt-4 border-4 border-green-500">
                {!editing ? (
                    <button 
                        onClick={() => setEditing(true)} 
                        className={`${btnBase} px-4 py-2 ${dark ? btnPrimaryDark : btnPrimaryLight}`}
                    >
                        Editar
                    </button>
                ) : (
                    <>
                    
                    </>
                )}
            </div> */}
            
            </>
        )}
        </>
    );
}