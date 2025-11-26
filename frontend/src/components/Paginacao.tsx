import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

interface PaginacaoProps {
    totalItems: number,
    itemsPorPage: number,
    paginaAtual: number,
    setPaginaAtual: (pagina: number) => void;
    children?: React.ReactNode
}

export default function Paginacao({ totalItems, itemsPorPage, paginaAtual, setPaginaAtual, children } : PaginacaoProps) {
    const { dark } = useTheme();
    const totalPagina = Math.max(1, Math.ceil(totalItems / itemsPorPage));

    useEffect(() => {
        if (paginaAtual > totalPagina) {
            setPaginaAtual(totalPagina);
        }
    }, [totalPagina, paginaAtual, setPaginaAtual]);

    function blurAfter<T extends HTMLElement>(e: React.MouseEvent<T>) {
        e.currentTarget.blur();
    }

    if (totalItems > 0 ) {
        return (
            <div className="flex justify-between items-center mt-6 text-sm">
                <button
                    onClick={(e) => {
                        setPaginaAtual(paginaAtual - 1);
                        blurAfter(e);
                    }}
                    disabled={paginaAtual === 1}
                    className={`px-3 py-1 rounded disabled:opacity-50 focus:outline-none focus:ring-2 hover:shadow-md transition-all border 
                        ${dark 
                            ? "bg-zinc-500 focus:ring-violet-400 border-zinc-400" 
                            : "bg-gray-200 focus:ring-indigo-500 hover:bg-gray-300"
                        }`
                    }
                >
                    ← Anterior
                </button>
                <span>
                    Página {paginaAtual} de {totalPagina} • Mostrando {Math.min((paginaAtual - 1) * itemsPorPage + 1, totalItems)} ao {Math.min(paginaAtual * itemsPorPage, totalItems)} de {totalItems}
                </span>
                <button
                    onClick={(e) => {
                        setPaginaAtual(paginaAtual + 1);
                        blurAfter(e);
                    }}
                    disabled={paginaAtual === totalPagina}
                    className={`px-3 py-1 rounded disabled:opacity-50 focus:outline-none focus:ring-2 hover:shadow-md transition-all border
                        ${dark 
                            ? "bg-zinc-500 focus:ring-violet-400 border-zinc-400" 
                            : "bg-gray-200 focus:ring-indigo-500 border-gray-300"
                        }`
                    }
                >
                    Próxima →
                </button>
            </div>
        );
    } else {
        return (
            <div className="flex justify-center items-center mt-6 text-md font-medium pb-2">
                <span>
                    Ainda não existem {children} cadastrados no momento.
                </span>
            </div>
        );
    }
}