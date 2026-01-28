import { useState, useRef } from "react";
import type { Marca } from "../types/marca";
import LoadingSpinner from "./LoadingSpinner";
import { useTheme } from "../contexts/ThemeContext";

interface ModeloFormProps {
    marcas: Marca[];
    onAdd: (data: {
        nome: string;
        numeroPortas: number;
        airBag: boolean;
        abs: boolean;
        marca_id: number;
        imagem: string;
    }) => Promise<void>;
}

export default function ModeloForm({ marcas, onAdd }: ModeloFormProps) {
    const { dark } = useTheme();
    const [nome, setNome] = useState("");
    const [numeroPortas, setNumeroPortas] = useState<number | null>(null);
    const [airBag, setAirBag] = useState<boolean | null>(null);
    const [abs, setAbs] = useState<boolean | null>(null);
    const [marca_id, setMarcaId] = useState<number | null>(null);
    const [imagem, setImagem] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [nomeArquivo, setNomeArquivo] = useState("");

    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {  
        if (carregando) return;
        if (!nome.trim() || !marca_id || !numeroPortas || airBag === null || abs === null || !imagem?.trim()) {
            setErro("Todas as opções são obrigatórias.");
            setTimeout(() => setErro(""), 4000);
            return;
        }
        try {
            setCarregando(true);
            await onAdd({ nome, numeroPortas, airBag, abs, marca_id, imagem });
            setNome("");
            setNumeroPortas(null);
            setAirBag(null);
            setAbs(null);
            setMarcaId(null);
            setImagem("");
            setNomeArquivo("");
            if (inputFileRef.current) inputFileRef.current.value = "";
            setSucesso("Modelo criado com sucesso!");
            setTimeout(() => setSucesso(""), 4000);
        } catch {
            setErro("Erro ao adicionar modelo.");
            setTimeout(() => setErro(""), 4000);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-6">Cadastrar novo modelo</h1>
            <div className="grid grid-cols-3 gap-x-3 gap-y-3 mb-5">
                <div className="flex flex-col col-span-2">
                    <label className="text-sm font-medium mb-1">Nome do Modelo:</label>
                    <input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Novo Modelo"
                        className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                                !nome.trim() && erro 
                                    ? dark
                                        ? "border-red-700 ring-red-500" 
                                        : "border-red-500 ring-red-300"
                                    : dark
                                        ? "border-neutral-500 focus:border-violet-400 focus:ring-violet-300 placeholder:text-gray-100"
                                        : "border-gray-300 focus:border-indigo-600 focus:ring-indigo-500"
                                }
                            `}
                    />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Nome da Marca:</label>
                        <select
                            value={marca_id ?? ""}
                            onChange={(e) => setMarcaId(e.target.value ? Number(e.target.value) : null)}
                            className={`border rounded-lg px-2 py-2 focus:outline-none focus:ring-2 cursor-pointer ${
                                !marca_id && erro 
                                    ? dark
                                        ? "border-red-700 ring-red-500" 
                                        : "border-red-500 ring-red-300"
                                    : dark
                                        ? "border-neutral-500 focus:border-violet-400 focus:ring-violet-300 bg-zinc-600"
                                        : "border-gray-300 focus:border-indigo-600 focus:ring-indigo-500"
                                }
                            `}
                        >
                            <option value="">Selecione uma Marca</option>
                            {marcas.map((marca) => (
                            <option key={marca.id} value={marca.id}>
                                {marca.nome}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Número de Portas:</label>
                        <select
                            value={numeroPortas ?? ""}
                            onChange={(e) => setNumeroPortas(e.target.value ? Number(e.target.value) : null)}
                            className={`border rounded-lg px-2 py-2 focus:outline-none focus:ring-2 cursor-pointer ${
                                !numeroPortas && erro 
                                    ? dark
                                        ? "border-red-700 ring-red-500" 
                                        : "border-red-500 ring-red-300"
                                    : dark
                                        ? "border-neutral-500 focus:border-violet-400 focus:ring-violet-300 bg-zinc-600"
                                        : "border-gray-300 focus:border-indigo-600 focus:ring-indigo-500"
                                }
                            `}
                        >
                            <option value="">Número de portas</option>
                            <option value="2">2 portas</option>
                            <option value="3">3 portas</option>
                            <option value="4">4 portas</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">AirBag:</label>
                        <select
                            value={airBag === null ? "" : airBag ? "true" : "false"}
                            onChange={(e) => 
                                setAirBag(e.target.value === "" ? null : e.target.value === "true")
                            }
                            className={`border rounded-lg px-2 py-2 focus:outline-none focus:ring-2 cursor-pointer ${
                                airBag === null && erro 
                                    ? dark
                                        ? "border-red-700 ring-red-500" 
                                        : "border-red-500 ring-red-300"
                                    : dark
                                        ? "border-neutral-500 focus:border-violet-400 focus:ring-violet-300 bg-zinc-600"
                                        : "border-gray-300 focus:border-indigo-600 focus:ring-indigo-500"
                                }
                            `}
                        >
                            <option value="">Air Bags?</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">ABS:</label>
                        <select
                            value={abs === null ? "" : abs ? "true" : "false"}
                            onChange={(e) => 
                                setAbs(e.target.value === "" ? null : e.target.value === "true")
                            }
                            className={`border rounded-lg px-2 py-2 focus:outline-none focus:ring-2 cursor-pointer ${
                                abs === null && erro 
                                    ? dark
                                        ? "border-red-700 ring-red-500"
                                        : "border-red-500 ring-red-300"
                                    : dark
                                        ? "border-neutral-500 focus:border-violet-400 focus:ring-violet-300 bg-zinc-600"
                                        : "border-gray-300 focus:border-indigo-600 focus:ring-indigo-500"
                                }
                            `}
                        >
                            <option value="">ABS?</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label className="text-sm font-medium mb-1">Imagem:</label>
                        <label 
                            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-md cursor-pointer border ${
                                !imagem && erro 
                                    ? dark
                                        ? "border-red-700 bg-red-100" 
                                        : "border-red-500 bg-red-50"
                                    : dark 
                                        ? "bg-zinc-600 border-neutral-500"
                                        : "border-gray-300 bg-white/80"
                                }    
                            `}
                        >
                            <span 
                                className={`text-sm 
                                    ${!imagem && erro
                                        ? dark
                                            ? "text-gray-600"
                                            : "text-gray-800"
                                        : dark
                                            ? "text-gray-200"
                                            : "text-gray-800"
                                    }
                                `}
                            >
                                {imagem ? `Imagem selecionada: ${nomeArquivo}` : "Nenhuma imagem selecionada"}
                            </span>
                            <input
                                type="file"
                                ref={inputFileRef}
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    if (!file.type.startsWith("image/")) {
                                        setErro("Selecione um arquivo de imagem válido (jpg, png, etc).");
                                        setTimeout(() => setErro(""), 4000);
                                    return;
                                    }
                                    setNomeArquivo(file.name);
                                    const reader = new FileReader();
                                    reader.onloadend = () => setImagem(reader.result as string);
                                    reader.readAsDataURL(file);
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div className="flex flex-col justify-end">
                        <button
                            onClick={handleSubmit}
                            disabled={carregando}
                            className={`text-white font-medium px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer ${
                                carregando 
                                    ? dark
                                        ? "bg-purple-400 cursor-not-allowed opacity-80" 
                                        : "bg-indigo-400 cursor-not-allowed opacity-80"
                                    : dark
                                        ? "bg-violet-500 hover:bg-violet-600 active:bg-violet-700"
                                        : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
                                } 
                            `}
                        >
                        {carregando ? (
                            <span className="flex items-center justify-center gap-2">
                                <LoadingSpinner 
                                    classSpinner="animate-spin h-5 w-5 text-white"
                                />
                                Adicionando...
                            </span>
                        ) : (
                            "Adicionar"
                        )}
                    </button>
                </div>
            </div>
            <div className="min-h-[47px]">
                {erro && 
                    <p 
                        className={`border rounded-md p-3 text-sm font-medium mt-4 ${
                            dark
                                ? "text-red-600 bg-red-100 border-red-300"
                                : "text-red-600 bg-red-50 border-red-200"
                            }
                        `}
                    >
                        {erro}
                    </p>
                }
                {sucesso && 
                    <p 
                        className={`rounded-md p-3 text-sm font-medium mt-4 border ${
                            dark 
                                ? "text-emerald-700 bg-emerald-100 border-emerald-300"
                                : "text-green-600 bg-green-50 border-green-200"
                            }
                        `}
                    >
                        {sucesso}
                    </p>
                }
            </div>
        </div>
    );
}