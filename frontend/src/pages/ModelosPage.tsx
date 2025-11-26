import { useEffect, useState } from "react";
import { modeloService } from "../services/modeloService";
import { getMarcas } from "../api/marcas";
import type { Modelo } from "../types/modelo";
import type { Marca } from "../types/marca";
import ModeloForm from "../components/ModeloForm";
import ModeloList from "../components/ModeloList";
import LoadingSpinner from "../components/LoadingSpinner";
import Paginacao from "../components/Paginacao";
import { useTheme } from "../context/ThemeContext";

export default function ModelosPage() {
    const { dark } = useTheme();
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [loadingInicial, setLoadingInicial] = useState(true);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const porPagina = 5;

    const modelosPagina = modelos.slice((paginaAtual - 1) * porPagina, paginaAtual * porPagina);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [m, mo] = await Promise.all([getMarcas(), modeloService.listar()]);
                setMarcas(m);
                setModelos(mo);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingInicial(false);
            }
        };
        fetchData();
    }, []);

    const handleAddModelo = async (data: any) => {
        const novo = await modeloService.adicionar({
            nome: data.nome,
            numero_portas: data.numeroPortas,
            air_bag: data.airBag,
            abs: data.abs,
            marca_id: data.marca_id,
            imagem: data.imagem,
        });
        setModelos((prev) => [...prev, novo]);
    };

    if (loadingInicial) {
        return (
            <LoadingSpinner 
                text="Carregando modelos..."
                classLoading="min-h-screen flex items-center justify-center"
                classLoadingTwo="flex flex-col items-center justify-center py-10"
                classSpinner={`animate-spin h-10 w-10 mb-3 ${dark ? "text-violet-500" : "text-indigo-600"}`}
            />
        )
    };

    return (
        <div className="min-h-screen p-8 mt-17">
            <div 
                className={`max-w-3xl mx-auto mt-10 border p-8 rounded-2xl shadow-lg ${
                    dark 
                        ? "bg-zinc-600 border-neutral-500"
                        : "border-gray-100 bg-white/80"
                    }`
                }
            >
                <ModeloForm 
                    marcas={marcas} 
                    onAdd={handleAddModelo} 
                />
                <ModeloList 
                    modelos={modelosPagina} 
                    marcas={marcas}
                    setModelos={setModelos}
                >
                    <Paginacao 
                        totalItems={modelos.length}
                        itemsPorPage={porPagina}
                        paginaAtual={paginaAtual}
                        setPaginaAtual={setPaginaAtual}
                    >
                        modelos
                    </Paginacao>
                </ModeloList>
            </div>
        </div>
    );
}