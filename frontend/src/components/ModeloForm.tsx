import { useState, useRef } from "react";
import type { Marca } from "../types/marca";
import LoadingSpinner from "./LoadingSpinner";
import { useTheme } from "../contexts/ThemeContext";
import { Plus } from "lucide-react";

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

    const selectBase = "border rounded-lg px-2 py-2 focus:outline-none focus:ring-2 cursor-pointer transition-colors duration-200 text-md";
    const inputBase = "border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 w-full focus:ring-2 placeholder:text-md ";
    const inputLight = "border-gray-300 focus:border-indigo-500 focus:ring-indigo-400 text-gray-700 placeholder-gray-500 bg-gray-100 ";
    const inputDark = "border-neutral-500 focus:border-purple-700 focus:ring-purple-500 text-gray-200 placeholder-gray-400 bg-zinc-800";
    const inputErroLight = "border-red-600 ring-2 ring-red-400 placeholder-red-600 bg-red-50 text-red-600 placeholder:font-medium font-medium";
    const inputErroDark = "border-red-400 ring-2 ring-red-200 placeholder-red-500 trxt-red-500 bg-red-300/20 placeholder:font-medium font-medium";

    const labelBase = "text-sm font-semibold";
    const labelLight = "text-gray-500";
    const labelDark = "text-gray-300";

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

    const selectClass = (hasError?: boolean) =>
        `${selectBase} ${
            hasError
                ? dark
                    ? inputErroDark
                    : inputErroLight
                : dark
                    ? inputDark
                    : inputLight
    }`;

    return (
        <div className="">
            <div className="grid grid-cols-3 gap-x-3 gap-y-3 mb-5">
                <div className="flex flex-col col-span-2">
                    <label className={`${labelBase} mb-1 ${dark ? labelDark : labelLight}`}>Nome do Modelo:</label>
                    <input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                        placeholder={!nome.trim() && erro ? "O nome do Modelo é obrigatório!" : "Digite um novo Modelo..."}
                        className={inputClass(!nome.trim() && !!erro)}
                    />
                    </div>
                    <div className="flex flex-col">
                        <label className={`${labelBase} mb-1 ${dark ? labelDark : labelLight}`}>Nome da Marca:</label>
                        <select
                            value={marca_id ?? ""}
                            onChange={(e) => setMarcaId(e.target.value ? Number(e.target.value) : null)}
                            onKeyDown={(e) => {
                                if(e.key === "Enter"){
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                            className={selectClass(!marca_id && !!erro)}
                        >
                            <option value="">{!marca_id && erro ? "Marca não Selecionada!" : "Selecione uma Marca"}</option>
                            {marcas.map((marca) => (
                            <option key={marca.id} value={marca.id}>
                                {marca.nome}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className={`${labelBase} mb-1 ${dark ? labelDark : labelLight}`}>Número de Portas:</label>
                        <select
                            value={numeroPortas ?? ""}
                            onChange={(e) => setNumeroPortas(e.target.value ? Number(e.target.value) : null)}
                            onKeyDown={(e) => {
                                if(e.key === "Enter"){
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                            className={selectClass(!numeroPortas && !!erro )}
                        >
                            <option value="">{!numeroPortas && erro ? "Número invalido" : "Número de portas"}</option>
                            <option value="2">2 portas</option>
                            <option value="3">3 portas</option>
                            <option value="4">4 portas</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className={`${labelBase} mb-1 ${dark ? labelDark : labelLight}`}>AirBag:</label>
                        <select
                            value={airBag === null ? "" : airBag ? "true" : "false"}
                            onChange={(e) => setAirBag(e.target.value === "" ? null : e.target.value === "true")}
                            onKeyDown={(e) => {
                                if(e.key === "Enter"){
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                            className={selectClass(airBag === null && !!erro)}
                        >
                            <option value="">{airBag === null && erro ? "Selecione uma valor" : "Air Bags?"}</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className={`${labelBase} mb-1 ${dark ? labelDark : labelLight}`}>ABS:</label>
                        <select
                            value={abs === null ? "" : abs ? "true" : "false"}
                            onChange={(e) => setAbs(e.target.value === "" ? null : e.target.value === "true")}
                            onKeyDown={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            className={selectClass(abs === null && !!erro)}
                        >
                            <option value="">{abs === null && erro ? "Selecione um valor" : "ABS?"}</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label className={`${labelBase} mb-1 ${dark ? labelDark : labelLight}`}>Imagem:</label>
                        <label 
                            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-md cursor-pointer border ${!imagem && erro 
                                ? dark ? inputErroDark : inputErroLight
                                : dark ? inputDark : inputLight
                            }`}
                        >
                            <span className={`text-md ${!imagem && erro
                                ? dark ? "text-red-500 font-medium" : "text-red-600 font-medium" : dark ? "text-gray-200" : "text-gray-700"}`}
                            >
                                {!imagem && erro ? "Nenhuma imagem selecionada" : imagem ? `Imagem selecionada: ${nomeArquivo}` : "Selecione uma imagem"}
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
                            className={`text-white font-medium py-3 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer ${carregando 
                                ? dark ? "bg-purple-400 cursor-not-allowed opacity-80" : "bg-indigo-400 cursor-not-allowed opacity-80"
                                : dark ? "bg-violet-500 hover:bg-violet-600 active:bg-violet-700" : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
                            }`}
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
            <div className="min-h-[47px]">
                {erro && 
                    <p className={`border rounded-md p-3 text-sm font-medium mt-4 text-center ${
                        dark ? "text-red-600 bg-red-100 border-red-300" : "text-red-600 bg-red-50 border-red-200"}`}
                    >
                        {erro}
                    </p>
                }
                {sucesso && 
                    <p className={`rounded-md p-3 text-sm font-medium mt-4 border text-center ${
                        dark ? "text-emerald-700 bg-emerald-100 border-emerald-300" : "text-green-600 bg-green-50 border-green-200"}`}
                    >
                        {sucesso}
                    </p>
                }
            </div>
        </div>
    );
}