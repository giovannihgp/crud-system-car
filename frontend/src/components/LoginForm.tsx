import { useTheme } from "../contexts/ThemeContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
        <div className={`flex-1 items-start sm:items-end gap-3 mb-2 ${
            dark 
                    ? "bg-zinc-600 border-neutral-500"
                    : "border-gray-100 bg-white/80"
                }`
            }
        >
            <p className="text-center font-bold text-2xl pb-7">Log in</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex-1 flex flex-col">
                    <label className="text-sm font-semibold mb-1">Nome de Usuario:</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Digite o seu Usuário..."
                        className={`border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 ${
                            dark
                                ? "text-gray-200 placeholder-gray-300"
                                : "text-gray-800 placeholder-gray-400"
                            }`}
                        disabled={loading}
                        required
                    />
                </div>
                <div className="flex-1 flex flex-col my-2">
                    <label className="text-sm font-semibold mb-1">Senha:</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Digite sua senha..."
                        className={`border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 ${
                            dark
                                ? "text-gray-200 placeholder-gray-300"
                                : "text-gray-800 placeholder-gray-400"
                            }`}
                        disabled={loading}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 my-5 font-bold rounded-full text-white ${
                        loading
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Entrando..." : "Entrar"}
                </button>
                {erro && <p className="text-center text-red-600 font-semibold mt-2">{erro}</p>}
            </form>
        </div>
    );
}
