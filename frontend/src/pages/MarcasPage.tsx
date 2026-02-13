import { useEffect, useState } from "react";
import type { Marca } from "../types/marca";
import type { Modelo } from "../types/modelo";
import { marcaService } from "../services/marcaService";
import MarcaForm from "../components/MarcaForm";
import MarcaList from "../components/MarcaList";
import LoadingSpinner from "../components/LoadingSpinner";
import Paginacao from "../components/Paginacao";
import { useTheme } from "../contexts/ThemeContext";
import { userService } from "../services/userService";
import type { User } from "../types/user";
import { Tag } from "lucide-react";

export default function MarcasPage() {
    const { dark } = useTheme();
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [loading, setLoading] = useState(true);
    const [carregando, setCarregando] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const porPagina = 5;

    const marcasPagina = marcas.slice((paginaAtual - 1) * porPagina, paginaAtual * porPagina);

    useEffect(() => {
        const load = async () => {
            try {
                const { marcas, modelos } = await marcaService.carregarTudo();
                const user = await userService.meuUser();
                setUser(user);
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
                classLoading="min-h-screen flex items-center justify-center"
                classLoadingTwo="flex flex-col items-center justify-center py-10"
                classSpinner={`animate-spin h-10 w-10 mb-3 ${dark ? "text-violet-500" : "text-indigo-600"}`}
            />
        )
    }

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
                        <p className="text-2xl font-bold">Cadastrar Marcas</p>
                        <p className="font-semibold text-gray-500">Gerencie as marcas de veículos cadastradas.</p>
                    </div>
                </div>
                <div className={`rounded-xl border shadow-sm transition-colors max-w-4xl mx-auto my-10 px-7 py-5 ${dark ? "bg-zinc-700/50 border-neutral-600" : "border-gray-100 bg-white/80"}`}>
                    <MarcaForm 
                        onAdd={handleAdd} 
                        carregando={carregando}
                        marcas={marcas}
                    />
                    <MarcaList 
                        marcasPagina={marcasPagina}
                        marcas={marcas}
                        modelos={modelos} 
                        setMarcas={setMarcas}
                        user={user}
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
        </div>
    );
}