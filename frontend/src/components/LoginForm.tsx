import { useTheme } from "../contexts/ThemeContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { User, Lock, Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
    onSubmit: (username: string, password: string) => Promise<boolean>;
}

export default function Loginform({ onSubmit } : LoginFormProps) {
    const { dark } = useTheme();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErro("");
        setLoading(true);

        const ok = await onSubmit(username, password);

        setLoading(false);

        if(!ok) {
            setErro("Usuário ou senha inválidos");
            return;
        }
        navigate("/marcas");
    }

    const inputBase = "border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 w-full pl-10 focus:ring-2";
    const inputLight = "border-gray-300 focus:border-indigo-500 focus:ring-indigo-400 text-gray-800 placeholder-gray-500 bg-gray-100";
    const inputDark = "border-neutral-500 focus:border-purple-700 focus:ring-purple-500 text-gray-200 placeholder-gray-400 bg-zinc-800";
    const inputErroLight = "border-red-500 ring-2 ring-red-300 placeholder-red-700 focus:placeholder-red-600";
    const inputErroDark = "border-red-400 ring-2 ring-red-200 placeholder-red-500 focus:placeholder-red-500";

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
        <div className={`flex-1 items-start sm:items-end gap-3 mb-2` }
        >
            <div className="flex-1 mb-7">
                <p className="text-center font-bold text-3xl">Bem-vindo</p>
                <p className={`text-center text-lg  ${dark ? "text-gray-300" : "text-gray-500"}`}
                >
                    Por favor, insira seus dados.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex-1 flex flex-col">
                    <div className="mb-1">
                        <label className={`text-sm font-medium ${ dark ? "text-gray-300" : "text-gray-500"}`}>
                            Nome de Usuario:
                        </label>
                    </div>
                    <div>
                        <div className="relative">
                            <User className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? "text-gray-300" : "text-gray-500"}`} />
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="Digite o seu Usuário..."
                                className={inputClass(!!erro)}
                                disabled={loading}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col my-2">
                    <div>
                        <label className={`text-sm font-semibold mb-1 ${ dark ? "text-gray-300" : "text-gray-500"}`}>
                            Senha:
                        </label>
                    </div>
                    <div>
                        <div className="relative">
                            <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? "text-gray-300" : "text-gray-500"}`} />
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type={showPassword ? "text" : "password"}
                                placeholder="Digite sua senha..."
                                className={inputClass(!!erro)}
                                disabled={loading}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${dark ? "text-gray-300 hover:text-gray-200" : "text-gray-500 hover:text-gray-600"}`}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                    
                </div>
                <button
                    type="submit"
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
                                Entrando...
                            </span>
                        ) : (
                            "Entrar"
                        )}
                </button>
                <div className="min-h-12 my-2">
                    {erro && <p className="text-center text-red-600 font-semibold mt-2">{erro}</p>}
                </div>
            </form>
        </div>
    );
}
