import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import type { Marca } from "../types/marca";
import { useTheme } from "../contexts/ThemeContext";
import { Plus  } from "lucide-react";

interface MarcaFormProps {
    onAdd: (nome: string) => Promise<void>;
    carregando: boolean;
    marcas: Marca[];
}

export default function MarcaForm({ onAdd, carregando, marcas } : MarcaFormProps) {
    const { dark } = useTheme();
    const [nome, setNome] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [erroNome, setErroNome] = useState("");

    const handleSubmit = async () => {
        if (!nome.trim()) {
            setErro("O nome da marca é obrigatório.");
            setTimeout(() => setErro(""), 4000);
            return;
        }

        const existe = marcas.some(
            (m) => m.nome.toLowerCase().trim() === nome.toLowerCase().trim()
        );

        if (existe) {
            setErroNome("Já existe uma marca com esse nome!");
            setTimeout(() => setErroNome(""), 3000);
            return;
        }

        await onAdd(nome);
        setNome("");
        setSucesso("Marca criada com sucesso!");
        setTimeout(() => setSucesso(""), 4000);
    };

    const inputBase = "border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 w-full focus:ring-2 placeholder:text-md";
    const inputLight = "border-gray-300 focus:border-indigo-500 focus:ring-indigo-400 text-gray-800 placeholder-gray-500 bg-gray-100";
    const inputDark = "border-neutral-500 focus:border-purple-700 focus:ring-purple-500 text-gray-200 placeholder-gray-400 bg-zinc-800";
    const inputErroLight = "border-red-600 ring-2 ring-red-400 placeholder-red-600 bg-red-50 placeholder:font-medium";
    const inputErroDark = "border-red-400 ring-2 ring-red-200 placeholder-red-500 bg-red-300/20 placeholder:font-medium";

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
        <>
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 mb-2">
            <div className="flex-1 flex flex-col">
                <label className={`text-sm font-semibold mb-1 ${dark ? "text-gray-300" : "text-gray-500"}`}>Nome da Marca:</label>
                <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === "Enter"){
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                    placeholder={erro ? "O nome da marca é obrigatório." : "Digite uma nova marca..."} 
                    className={inputClass(!nome.trim() && !!erro || !!erroNome)}
                />
            </div>
            <div>
                <button
                    onClick={handleSubmit}
                    disabled={carregando}
                    className={`px-6 py-2.5 rounded-lg font-semibold text-white shadow-sm transition-all cursor-pointer
                        ${
                            carregando
                                ? dark
                                    ? "bg-violet-400 cursor-not-allowed opacity-80" // loading dark
                                    : "bg-indigo-400 cursor-not-allowed opacity-80" // loading light
                                : dark
                                    ? "bg-violet-500 hover:bg-violet-600 active:bg-violet-700" // dark
                                    : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"  // light
                        }`
                    }
                >
                    {carregando ? (
                        <span className="flex items-center justify-center gap-2">
                            <LoadingSpinner 
                                classSpinner="animate-spin h-5 w-5 text-white"
                            />
                            Adicionando...
                        </span>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <Plus className="w-5 h-5 text-white"/>
                            <p>Adicionar</p>
                        </div>
                    )}
                </button>
            </div>
        </div>
        <div className="min-h-12 mb-1 mt-3">
            {erro && 
                <p 
                    className={`rounded-md p-2 mb-4 text-center font-semibold text-sm border
                        ${dark 
                            ? "text-red-400 bg-red-300/20 border-red-300" 
                            : "text-red-600 bg-red-50 border border-red-200"
                        }
                    `}
                >
                    {erro}
                </p>
            }
            {sucesso && 
                <p 
                    className={`border rounded-md p-2 mb-4 text-center font-semibold
                        ${dark 
                            ? "text-emerald-700 bg-emerald-100 border-emerald-300"
                            : "text-green-600 bg-green-50 border-green-200"
                        }
                    `}
                >
                    {sucesso}
                </p>
            }
            {erroNome && 
                <p 
                    className={`rounded-md p-2 mb-4 text-center font-semibold border 
                        ${dark 
                            ? "text-amber-700 bg-amber-100 border-amber-200" 
                            : "text-yellow-600 bg-yellow-50 border-yellow-200"
                        }
                    `}
                >
                    {erroNome}
                </p>
            }
        </div>
        </>
    );
}