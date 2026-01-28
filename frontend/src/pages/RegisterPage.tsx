import Card from "../components/card";
import { useTheme } from "../contexts/ThemeContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

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

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErro("");
        setLoading(true);

        try {

            const ok = await register(name, username, email, password);
            if(!ok) {
                setErro("Erro ao registrar usuário");
                return;
            }
            navigate("/");

        } catch (err: any) {
            console.error(err);
            setErro("Erro ao registrar usuário");
        } finally {
            setLoading(false);
        }
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
            <p className="text-center font-bold text-2xl pb-7">Register</p>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="flex-1 flex flex-col">
                    <label className="text-sm font-semibold mb-1">Nome:</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite seu Nome..."
                        className={`border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 ${
                            dark
                                ? "text-gray-200 placeholder-gray-300"
                                : "text-gray-800 placeholder-gray-400"
                            }`}
                        required
                    />
                </div>
                <div className="flex-1 flex flex-col">
                    <label className="text-sm font-semibold mb-1">Nome de Usuario:</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Digite seu Nome de Usuário..."
                        className={`border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 ${
                            dark
                                ? "text-gray-200 placeholder-gray-300"
                                : "text-gray-800 placeholder-gray-400"
                            }`}
                        required
                    />
                </div>

                <div className="flex-1 flex flex-col">
                    <label className="text-sm font-semibold mb-1">E-mail:</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Digite seu Nome de Usuário..."
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
                        placeholder="Digite sua Senha..."
                        className={`border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 ${
                            dark
                                ? "text-gray-200 placeholder-gray-300"
                                : "text-gray-800 placeholder-gray-400"
                            }`}
                        required
                    />
                </div>
                <button
                    disabled={loading}
                    className={`w-full py-2 my-5 font-bold rounded-full text-white ${
                        loading
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Registrando..." : "Registra"}
                </button>
                {erro && <p className="text-center text-red-600 font-semibold mt-2">{erro}</p>}
            </form>
        </Card>
    </div>
  );
}
