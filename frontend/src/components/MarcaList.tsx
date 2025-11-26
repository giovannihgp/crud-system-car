import React, { useState } from "react";
import type { Marca } from "../types/marca";
import type { Modelo } from "../types/modelo";
import { marcaService } from "../services/marcaService";
import { useTheme } from "../context/ThemeContext";

interface MarcaListProps {
    marcas: Marca[];
    modelos: Modelo[];
    setMarcas: React.Dispatch<React.SetStateAction<Marca[]>>;
    children?: React.ReactNode;
}

export default function MarcaList({ marcas, modelos, setMarcas, children }: MarcaListProps) {

    const { dark }= useTheme();
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [editNome, setEditNome] = useState("");
    const [erroEdicao, setErroEdicao] = useState<{ [id: number]: string }>({});
    const [confirmarDeletId, setConfirmarDeletId] = useState<number | null>(null);

    const modelosDaMarca = (marcaId: number) => modelos.filter((mod) => mod.marca_id === marcaId);

    const handleEditarClick = (m: Marca) => {
        setEditandoId(m.id);
        setEditNome(m.nome);
        setConfirmarDeletId(null);
    };

    const handleCancelarEdit = () => {
        setEditandoId(null);
        setEditNome("");
        setErroEdicao({});
    };

    const handleSalvarEdit = async (id: number) => {
        if (!editNome.trim()) {
            setErroEdicao({ [id]: "O nome da marca é obrigatório." });
            setTimeout(() => setErroEdicao({}), 4000);
            return;
        }
        try {
            const atualizada = await marcaService.atualizar(id, editNome);
            setMarcas((prev) => prev.map((m) => (m.id === id ? atualizada : m)));
            handleCancelarEdit();
        } catch {
            setErroEdicao({ [id]: "Erro ao atualizar marca." });
            setTimeout(() => setErroEdicao({}), 4000);
        }
    };  

    const handleConfirmarDelet = (id: number) => {
        setConfirmarDeletId(id);
        setEditandoId(null);
    };

    const handleCancelarDelet = () => setConfirmarDeletId(null);

    const handleDelete = async (id: number) => {
        const relacionados = modelosDaMarca(id);
        if (relacionados.length > 0) {
            alert(`Não é possível remover. Existem ${relacionados.length} modelos associados.`);
            return;
        }
        try {
            await marcaService.remover(id);
            setMarcas((prev) => prev.filter((m) => m.id !== id));
            setConfirmarDeletId(null);
        } catch {
            alert("Erro ao deletar marca.");
        }
    };

    return (
        <div>
            <ul className="space-y-2">
                {marcas.map((m) => {
                    const relacionados = modelosDaMarca(m.id);
                    return (
                        <li 
                            key={m.id} 
                            className={`content-center px-4 py-2 rounded-lg border hover:shadow-md shadow-sm transition-all min-h-[61px] ${
                                confirmarDeletId === m.id
                                    ? dark 
                                        ? "bg-red-200 border-red-500" 
                                        : "bg-red-50 border-red-200"
                                    : dark
                                        ? "bg-zinc-600 border-neutral-500 hover:bg-zinc-700/15"
                                        : "bg-white/80 border-gray-100 hover:bg-gray-50"
                                }`
                            }
                            >
                            {editandoId === m.id ? (
                                <div className="flex flex-1 items-center gap-2">
                                    <input
                                        value={editNome}
                                        onChange={(e) => setEditNome(e.target.value)}
                                        className={`flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 placeholder-red-600 focus:placeholder-red-600 
                                            ${!editNome.trim() && erroEdicao 
                                                ? dark
                                                    ? "border-red-400 ring-red-300" 
                                                    : "border-red-500 ring-red-300"
                                                : dark
                                                    ? "border-neutral-500 focus:ring-violet-300"
                                                    : "border-gray-300 focus:ring-blue-500"
                                            }`
                                        }
                                        placeholder={erroEdicao[m.id] ? "O nome da marca é obrigatório." : ""}
                                    />
                                    <button onClick={() => handleSalvarEdit(m.id)} 
                                        className={`rounded px-3 py-1 
                                            ${dark 
                                                ? "bg-emerald-700 hover:bg-emerald-800 text-gray-50" 
                                                : "bg-green-600 hover:bg-green-700 text-white"
                                            }`
                                        }
                                    >
                                        Salvar
                                    </button>
                                    <button onClick={handleCancelarEdit} 
                                        className={`px-3 py-1 rounded 
                                            ${dark 
                                                ? "bg-red-400 hover:bg-red-500 text-gray-50" 
                                                : "bg-red-500 hover:bg-red-600 text-white"
                                            }`
                                        }
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            ) : confirmarDeletId === m.id ? (
                                <>
                                    {relacionados.length > 0 ? (
                                        <div className="flex flex-col gap-2">
                                            <span 
                                                className={`font-medium ${
                                                    dark 
                                                        ? "text-rose-700" 
                                                        : "text-red-600"
                                                    }
                                                `}
                                            >
                                                O modelo "{m.nome}" não pode ser removido enquanto houver modelos associados.
                                            </span>
                                            <div 
                                                className={`border rounded-lg p-2 text-sm mt-1 
                                                    ${dark 
                                                        ? "bg-zinc-600/95  border-red-600  text-gray-50"
                                                        : "bg-gray-50 border-red-200 text-gray-700"
                                                    }`
                                                } 
                                            >
                                                <p 
                                                    className={`font-semibold mb-1 ${
                                                        dark 
                                                            ? "text-rose-400" 
                                                            : "text-red-700"
                                                        }
                                                    `}
                                                >
                                                    {relacionados.length === 1
                                                        ? "O seguinte modelo precisa ser excluído antes:"
                                                        : "Os seguintes modelos precisam ser excluídos antes:"}
                                                </p>
                                                <ul className="list-disc pl-5">
                                                    {relacionados.map((mod) => (
                                                        <li key={mod.id}>{mod.nome}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="flex justify-end my-1">
                                                <button
                                                    onClick={handleCancelarDelet}
                                                    className={`rounded-md font-semibold px-2 py-1 border
                                                        ${dark 
                                                            ? "bg-zinc-500 hover:bg-zinc-600 text-zinc-200 border-zinc-400" 
                                                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 border-gray-400"
                                                        }`
                                                    }
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2 items-center">
                                            <span className="text-red-600 font-medium">
                                                Tem certeza que deseja remover a marca "{m.nome}"?
                                            </span>
                                            <div className="flex flex-2 gap-2 items-center justify-end">
                                                <button
                                                    onClick={() => handleDelete(m.id)}
                                                    className={`rounded-md font-semibold px-2 py-1 border
                                                        ${dark 
                                                            ? "bg-red-500 hover:bg-red-600 text-gray-50 border-red-400" 
                                                            : "bg-red-600 hover:bg-red-700 text-white border-red-700"
                                                        }`
                                                    }
                                                >
                                                    Confirmar
                                                </button>
                                                <button
                                                    onClick={handleCancelarDelet}
                                                    className={`rounded-md font-semibold px-2 py-1 border
                                                        ${dark 
                                                            ? "bg-zinc-500 hover:bg-zinc-600 text-zinc-200 border-zinc-400" 
                                                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 border-gray-400"
                                                        }`
                                                    }
                                                >
                                                    Cancelar
                                            </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex flex-1 justify-between items-center">
                                    <span className="">{m.nome}</span>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleEditarClick(m)}
                                            className={`hover:underline font-medium cursor-pointer 
                                                ${dark 
                                                    ? "text-blue-400 hover:text-blue-500" 
                                                    : "text-blue-600 hover:text-blue-700"
                                                }`
                                            }
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleConfirmarDelet(m.id)}
                                            className={`hover:underline font-medium cursor-pointer 
                                                ${dark 
                                                    ? "text-rose-400 hover:text-rose-500" 
                                                    : "text-red-600 hover:text-red-700"
                                                }`
                                            }
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            {children && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}