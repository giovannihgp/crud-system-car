import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import type { Marca } from "../types/marca";

interface MarcaFormProps {
    onAdd: (nome: string) => Promise<void>;
    carregando: boolean;
    marcas: Marca[];
}

export default function MarcaForm({ onAdd, carregando, marcas } : MarcaFormProps) {
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


    return (
        <>
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 mb-2">
            <div className="flex-1 flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Nome da Marca:</label>
                <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder={erro ? "O nome da marca é obrigatório." : "Digite o nome da marca."} 
                    className={`border rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none transition-colors duration-200
                        ${!nome.trim() && erro
                            ? "border-red-500 ring-2 ring-red-300 placeholder-red-700 focus:placeholder-red-600"
                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"}`
                    }
                />
            </div>
            <div>
                <button
                    onClick={handleSubmit}
                    disabled={carregando}
                    className={`px-6 py-2.5 rounded-lg font-semibold text-white shadow-sm transition-all
                        ${carregando
                            ? "bg-blue-400 cursor-not-allowed opacity-80"
                            : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"}`
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
                        "Adicionar"
                    )}
                </button>
            </div>
        </div>
        <div className="min-h-12 mb-1 mt-3">
            {erro && <p className="text-red-600 bg-red-50 border border-red-200 rounded-md p-2 mb-4 text-center font-semibold text-sm">{erro}</p>}
            {sucesso && <p className="text-green-600 bg-green-50 border border-green-200 rounded-md p-2 mb-4 text-center font-semibold">{sucesso}</p>}
            {erroNome && <p className="text-orange-600 bg-orange-50 border border-orange-200 rounded-md p-2 mb-4 text-center font-semibold">{erroNome}</p>}
        </div>
        </>
    );
}