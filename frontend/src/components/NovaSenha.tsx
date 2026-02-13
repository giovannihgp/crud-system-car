import React, { useState } from "react";
import { userService } from "../services/userService";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router"
import { Lock, Key, RotateCcwKey } from "lucide-react";;

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

    const labelBase = "text-sm font-semibold";
    const labelLight = "text-gray-500";
    const labelDark = "text-gray-300";

    const inputBase = "border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 w-full pl-10 focus:ring-2";
    const inputLight = "border-gray-300 focus:border-indigo-500 focus:ring-indigo-400 text-gray-800 placeholder-gray-500 bg-gray-100";
    const inputDark = "border-neutral-500 focus:border-purple-700 focus:ring-purple-500 text-gray-200 placeholder-gray-400 bg-zinc-900/70";

    return (
        <div className={`flex flex-col gap-3`}>
            <form onSubmit={handleSubmit} className="space-y-2">
                <div className="flex-1 flex flex-col">
                    <div className="pb-1">
                        <label className={`${labelBase} ${dark ? labelDark : labelLight}`}>Senha Antiga:</label>
                    </div>
                    <div className="relative">
                        <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? labelDark : labelLight}`} />
                        <input 
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            type="text"
                            placeholder="Digite sua Senha Antiga..."
                            required
                            className={`${inputBase} ${dark ? inputDark : inputLight}`}

                        />
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="pb-1">
                        <label className={`${labelBase} ${dark ? labelDark : labelLight}`}>Senha Nova:</label>
                    </div>
                    <div className="relative">
                        <Key className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? labelDark : labelLight}`} />
                        <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="text"
                            placeholder="Digite sua Senha Nova..."
                            required
                            className={`${inputBase} ${dark ? inputDark : inputLight}`}

                        />
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="pb-1">
                        <label className={`${labelBase} ${dark ? labelDark : labelLight}`}>Confirmar Senha Nova:</label>
                    </div>
                    <div className="relative">
                        <RotateCcwKey className={`absolute left-2.5 top-1/2 -translate-y-1/2 h-5 w-5 ${dark ? labelDark : labelLight}`} />
                        <input 
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            type="text"
                            placeholder="Digite sua Senha Novamente..."
                            required
                            className={`${inputBase} ${dark ? inputDark : inputLight}`}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 mt-5 text-white rounded-lg font-semibold  shadow-sm transition-all cursor-pointer ${
                        dark
                            ? "bg-violet-500 hover:bg-violet-600 active:bg-violet-700"
                            : "hover:bg-indigo-700 bg-indigo-600"
                        }`}
                    >
                        Trocar Senha
                </button>
            </form>
        </div>
    );
}