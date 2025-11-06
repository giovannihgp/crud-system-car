import { useEffect, useState } from "react";
import type { Marca } from "../types/marca";
import type { Modelo } from "../types/modelo";
import { marcaService } from "../services/marcaService";
import MarcaForm from "../components/MarcaForm";
import MarcaList from "../components/MarcaList";
import LoadingSpinner from "../components/LoadingSpinner";
import Paginacao from "../components/Paginacao";

export default function MarcasPage() {
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [loading, setLoading] = useState(true);
    const [carregando, setCarregando] = useState(false);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const porPagina = 5;

    const marcasPagina = marcas.slice((paginaAtual - 1) * porPagina, paginaAtual * porPagina);

    useEffect(() => {
        const load = async () => {
            try {
            const { marcas, modelos } = await marcaService.carregarTudo();
            setMarcas(marcas);
            setModelos(modelos);
            } finally {
            setLoading(false);
            }
        };
        load();
    }, []);

    const handleAdd = async (nome: string) => {
        try {
            setCarregando(true);
            const nova = await marcaService.adicionar(nome);
            setMarcas((prev) => [...prev, nova]);
        } finally {
            setCarregando(false);
        }
    };

    if (loading) {
        return (
            <LoadingSpinner 
                text="Carregando marcas..."
                classLoading="min-h-screen flex items-center justify-center bg-gray-100"
                classLoadingTwo="flex flex-col items-center justify-center py-10"
                classSpinner="animate-spin h-10 w-10 text-blue-600 mb-3"
            />
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 mt-15">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 max-w-3xl mx-auto mt-10">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">Cadastrar Marcas</h1>
                <MarcaForm 
                    onAdd={handleAdd} 
                    carregando={carregando}
                    marcas={marcas}
                />
                <MarcaList 
                    marcas={marcasPagina}
                    modelos={modelos} 
                    setMarcas={setMarcas}
                >
                    <Paginacao 
                        totalItems={marcas.length}
                        itemsPorPage={porPagina}
                        paginaAtual={paginaAtual}
                        setPaginaAtual={setPaginaAtual}
                    >
                        marcas
                    </Paginacao>
                </MarcaList>
            </div>
        </div>
    );
}