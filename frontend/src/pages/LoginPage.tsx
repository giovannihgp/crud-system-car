import Card from "../components/card";
import { useTheme } from "../context/ThemeContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function LoginPage() {
    const { dark } = useTheme();
    const { login } = useAuth();
    const [username, setUser] = useState("");
    const [password, setPass] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErro("");
        setLoading(true);

        const ok = await login(username, password);

        setLoading(false);

        if(!ok) {
            setErro("Usuário ou(e) senha inválido(s)");
            return;
        }
        
        navigate("/marcas");
    }

  return (
    <div className="min-h-screen p-8 mt-39">
        <Card 
            className={`mt-14 mb-5 p-10 max-w-4xl mx-auto shadow-xl rounded-3xl border backdrop-blur-sm 
                ${
                    dark 
                        ? "bg-zinc-600 border-neutral-500"
                        : "border-gray-100 bg-white/80"
                }
            `}
        >
            <p className="text-center font-bold text-2xl pb-7">Login</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex-1 flex flex-col">
                    <label className="text-sm font-semibold mb-1">Nome de Usuario:</label>
                    <input
                        value={username}
                        onChange={(e) => setUser(e.target.value)}
                        type="text"
                        placeholder="Digite o seu Usuário"
                        className={`border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 ${
                            dark
                                ? "text-gray-200 placeholder-gray-300"
                                : "text-gray-800 placeholder-gray-400"
                            }`}
                        required
                    />
                </div>
                <div className="flex-1 flex flex-col my-2">
                    <label className="text-sm font-semibold mb-1">Senha:</label>
                    <input
                        onChange={(e) => setPass(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Digite sua senha"
                        className={`border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 ${
                            dark
                                ? "text-gray-200 placeholder-gray-300"
                                : "text-gray-800 placeholder-gray-400"
                            }`}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 font-bold rounded-full text-white ${
                        loading
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Entrando..." : "Entrar"}
                </button>
                {erro && <p className="text-center text-red-600 font-semibold mt-2">{erro}</p>}
            </form>
        </Card>
    </div>
  );
}
