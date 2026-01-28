import React, { useState } from "react";
import { userService } from "../services/userService";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router";

export default function NovaSenha() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const { dark } = useTheme();
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        userService.mudarSenha(currentPassword, password, passwordConfirmation);
        navigate("/sair");
    }

    return (
        <div className={`flex-1 items-start sm:items-end gap-3 mb-2 ${ dark 
                ? "bg-zinc-600 border-neutral-500"
                : "border-gray-100 bg-white/80"
            }`}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex-1 flex flex-col">
                    <label className="text-sm font-semibold mb-1">Senha Antiga:</label>
                    <input 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        type="text"
                        required
                        className={`border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 ${
                            dark
                                ? "text-gray-200 placeholder-gray-300"
                                : "text-gray-800 placeholder-gray-400"
                            }`
                        }

                    />
                </div>
                <div className="flex-1 flex flex-col my-2">
                    <label className="text-sm font-semibold mb-1">Senha Nova:</label>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="text"
                        required
                        className={`border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 ${
                            dark
                                ? "text-gray-200 placeholder-gray-300"
                                : "text-gray-800 placeholder-gray-400"
                            }`
                        }

                    />
                </div>
                <div className="flex-1 flex flex-col my-2">
                    <label className="text-sm font-semibold mb-1">Confirmar Senha Nova:</label>
                    <input 
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        type="text"
                        required
                        className={`border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 ${
                            dark
                                ? "text-gray-200 placeholder-gray-300"
                                : "text-gray-800 placeholder-gray-400"
                            }`
                        }
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 my-5 font-bold rounded-full text-white ${
                        dark
                            ? "bg-blue-400 hover:bg-blue-500"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        Mudar
                </button>
            </form>
        </div>
    );
}