import { useTheme } from "../contexts/ThemeContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import { User, AtSign, Mail ,Lock } from "lucide-react";

export default function RegisterPage() {
    const { dark } = useTheme();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();
    const [erroUser, setErroUser] = useState("");
    const [erroEmail, setErroEmail] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErro("");
        setErroUser("");
        setErroEmail("");
        setLoading(true);
        try {
            const ok = await register(name, username, email, password);
            if (!ok) {
                setErro("Todos os dados são obrigatórios");
                return;
            }
            navigate("/");
        } catch (err: any) {
            console.log("Erro recebido:", err);

            if (err?.errors?.username) {
                setErroUser("Utilize outro username");
                setTimeout(() => setErroUser(""), 5000);
            } else if (err?.errors?.email) {
                setErroEmail("Este e-mail já está em uso");
                setTimeout(() => setErroEmail(""), 5000);
            } else if (err?.message) {
                setErro(err.message);
                setTimeout(() => setErro(""), 5000);
            } else {
                setErro("Erro ao registrar usuário");
                setTimeout(() => setErro(""), 5000);
            }
        } finally {
            setLoading(false);
        }
    }

    const cardBase = "rounded-3xl border shadow-xl backdrop-blur-sm lg:max-w-lg 2xl:max-w-xl";
    const cardLight = "border-gray-100 bg-white/80";
    const cardDark = "border-neutral-600 bg-zinc-700/50";

    const labelBase = "text-sm font-semibold";
    const labelLight = "text-gray-500";
    const labelDark = "text-gray-300";

    const inputBase = "border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 w-full pl-10 focus:ring-2";
    const inputLight = "border-gray-300 focus:border-indigo-500 focus:ring-indigo-400 text-gray-800 placeholder-gray-500 bg-gray-100";
    const inputDark = "border-neutral-500 focus:border-purple-700 focus:ring-purple-500 text-gray-200 placeholder-gray-400 bg-zinc-800";
    const inputErroLight = "border-red-500 ring-2 ring-red-300 placeholder-red-700 focus:placeholder-red-600";
    const inputErroDark = "border-red-400 ring-2 ring-red-200 placeholder-red-500 focus:placeholder-red-500";

    const flex = "flex-1 flex flex-col";

    const inputClass = (hasError?: boolean) =>
        `${inputBase} ${
            hasError
                ? dark
                    ? inputErroDark
                    : inputErroLight
                : dark
                    ? inputDark
                    : inputLight
    }`;

    return (
        <div className="min-h-screen p-8 mt-24">
            <div className={`${cardBase} max-w-2xl mx-auto p-8 ${dark ? cardDark : cardLight}`}>
                <p className="text-center font-bold text-2xl py-1">Registre-se</p>
                <p className={`text-center text-lg pb-5  ${dark ? labelDark : labelLight}`}
                >
                    Por favor, insira seus dados.
                </p>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <div className={`${flex}`}>
                        <div className="pb-1">
                            <label className={`${labelBase} ${dark ? labelDark : labelLight}`}>Nome:</label>
                        </div>
                        <div className="relative">
                            <User className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? labelDark : labelLight}`}/>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Digite seu Nome..."
                                className={inputClass(!!erro)}
                                disabled={loading}
                                required
                            />
                        </div>
                    </div>
                    <div className={`${flex}`}>
                        <div className="pb-1">
                            <label className={`${labelBase} ${dark ? labelDark : labelLight}`}>Nome de Usuario:</label>
                        </div>
                        <div className="relative">
                            <AtSign className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? labelDark : labelLight}`} />
                            <input
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setErroUser("");
                                }}
                                type="text"
                                placeholder="Digite seu Usuário..."
                                className={inputClass(!!erroUser || !!erro)}
                                disabled={loading}
                                required
                            />
                        </div>
                    </div>
                    <div className={`${flex}`}>
                        <div className="pb-1">
                            <label className={`${labelBase} ${dark ? labelDark : labelLight}`}>E-mail:</label>
                        </div>
                        <div className="relative">
                            <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? labelDark : labelLight}`} />
                            <input
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErroEmail("");
                                }}
                                type="email"
                                placeholder="Digite seu E-mail..."
                                className={inputClass(!!erroEmail || !!erro)}
                                disabled={loading}
                                required
                            />
                        </div>
                    </div>
                    <div className={`${flex}`}>
                        <div className="pb-1">
                            <label className={`${labelBase} ${dark ? labelDark : labelLight}`}>Senha:</label>
                        </div>
                        <div className="relative">
                            <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? labelDark : labelLight}`} />
                            <input
                                onChange={(e) => setPass(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="Digite sua Senha..."
                                className={inputClass(!!erro)}
                                disabled={loading}
                                required
                            />
                        </div>
                    </div>
                    <button
                        disabled={loading}
                        className={`w-full py-2.5 my-5 font-semibold rounded-lg text-white shadow-sm transition-all cursor-pointer ${
                            loading
                                ? dark
                                    ? "bg-violet-400 cursor-not-allowed opacity-80"
                                    : "bg-indigo-400 cursor-not-allowed opacity-80"
                                : dark
                                    ? "bg-violet-500 hover:bg-violet-600 active:bg-violet-700"
                                    : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <LoadingSpinner 
                                        classSpinner="animate-spin h-5 w-5 text-white"
                                    />
                                    Registrando...
                                </span>
                            ) : (
                                "Registra"
                            )}
                    </button>
                    <div className="min-h-9">
                        {erro && <p className="text-center text-red-600 font-semibold pt-1">{erro}</p>}
                        {erroUser && <p className={"text-center text-sm text-red-600 font-semibold p-1"}>{erroUser}</p>}
                        {erroEmail && <p className="text-center text-red-600 font-semibold pt-1">{erroEmail}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}
