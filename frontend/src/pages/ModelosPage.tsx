import { useEffect, useState } from "react";
import { modeloService } from "../services/modeloService";
import { getMarcas } from "../api/marcas";
import type { Modelo } from "../types/modelo";
import type { Marca } from "../types/marca";
import ModeloForm from "../components/ModeloForm";
import ModeloList from "../components/ModeloList";
import LoadingSpinner from "../components/LoadingSpinner";
import Paginacao from "../components/Paginacao";
import { useTheme } from "../contexts/ThemeContext";
import type { User } from "../types/user";
import { userService } from "../services/userService";
import { Tag } from "lucide-react";

export default function ModelosPage() {
    const { dark } = useTheme();
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [loadingInicial, setLoadingInicial] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const porPagina = 5;

    const modelosPagina = modelos.slice((paginaAtual - 1) * porPagina, paginaAtual * porPagina);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [m, mo] = await Promise.all([getMarcas(), modeloService.listar()]);
                const user = await userService.meuUser();
                setUser(user);
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
        <div className="min-h-screen mt-25 w-full">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-row max-w-4xl mx-auto items-center gap-3 mb-9">
                    <div className="grow py-3 rounded-lg flex items-center justify-center transition-all">
                        <div className={`w-20 h-20 flex items-center justify-center rounded-lg transition-all 
                            ${dark ? "bg-violet-600/20" : "bg-indigo-500/20"}`}
                        >
                            <Tag className={`w-10 h-10 transition-all 
                                ${dark ? "text-purple-600" : "text-indigo-600 "}`} 
                            />
                        </div>
                    </div>
                    <div className="text-left grow-20 mb-2">
                        <p className="text-2xl font-bold">Cadastrar Modelos</p>
                        <p className="font-semibold text-gray-500">Gerencie os modelos de veículas cadastrados.</p>
                    </div>
                </div>
                <div className={`rounded-xl border shadow-sm transition-colors max-w-4xl mx-auto my-10 px-7 pb-5 pt-7 ${
                    dark ? "bg-zinc-700/50 border-neutral-600" : "border-gray-100 bg-white/80"}`}
                >
                    <ModeloForm 
                        marcas={marcas} 
                        onAdd={handleAddModelo} 
                    />
                    <ModeloList 
                        modelos={modelosPagina} 
                        marcas={marcas}
                        setModelos={setModelos}
                        user={user}
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
        </div>
    );
}