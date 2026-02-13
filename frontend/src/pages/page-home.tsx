import Container from "../components/container";
import Card from "../components/card";
import type { Marca } from "../types/marca";
import type { Modelo } from "../types/modelo";
import { useEffect, useState } from "react";
import { getModelos } from "../api/modelos";
import { getMarcas } from "../api/marcas";
import { useTheme } from "../contexts/ThemeContext";

export default function PageHome() {
    const { dark } = useTheme();

    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);

    useEffect(() => {
        getModelos().then(setModelos).catch(console.error);
        getMarcas().then(setMarcas).catch(console.error);
    }, []);

    return (
        <div className="min-h-screen mt-25 w-full">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div>
                    <p className="text-2xl font-bold">Gestão de Veículos.</p>
                    <p className="text-gray-500 font-semibold">Explore e gerencie nossa base de marcas e modelos de veículos.</p>
                </div>
            <Container>
                <Card 
                    className={`mt-14 mb-5 p-10 max-w-4xl mx-auto shadow-xl rounded-3xl border backdrop-blur-sm ${
                        dark 
                            ? "bg-zinc-700/50 border-neutral-500"
                            : "border-gray-100 bg-white/80"
                    }`}
                >
                    <p className="font-bold text-lg mb-4 text-center">Gerencie marcas e modelos com facilidade</p>
                    <p className="leading-relaxed">O <span className={`font-semibold ${dark ? "text-violet-500" : "text-indigo-600"}`}>AutoHub</span> é um sistema desenvolvido para organizar e gerenciar <span className="font-semibold">marcas</span> e <span className="font-semibold">modelos</span> de veículos de forma simples e eficiente.</p>
                    <p className="leading-relaxed my-1.5">Com uma interface intuitiva, é possível cadastrar, consultar e visualizar registros de maneira rápida, mantendo as informações estruturadas e acessíveis para futuras expansões do sistema.</p>
                    <p className="leading-relaxed">Projetado para evoluir, o <span className={`font-semibold ${dark ? "text-violet-500" : "text-indigo-600"}`}>AutoHub</span> serve como base para futuras funcionalidades relacionadas à gestão de veículos.</p>
                </Card>
            </Container>
            <section className="py-20 my-3">
                <div className="mb-17">
                    <p className="text-2xl font-bold">Marcas Registradas.</p>
                    <p className="font-semibold  text-gray-500">Confira as marcas disponíveis no sistema.</p>
                </div>
                <ul className="max-w-4xl grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto px-6">
                    {marcas.map((m) => (
                        <li
                            key={m.id}
                            className={`text-center text-xl px-6 py-4 border rounded-xl shadow-sm transition-all duration-200 hover:shadow-md ${
                                dark
                                    ? "bg-zinc-700/50 border-neutral-500 hover:border-violet-400"
                                    : "bg-gray-100 border-gray-200 hover:border-indigo-300"
                                }
                            `}
                        >
                            <span className="font-semibold">
                                {m.nome}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
            <section className="py-10">
                <div className="mb-17">
                    <p className="text-2xl font-bold">Modelos registrados</p>
                    <p className="font-semibold text-gray-500">Confira os modelos disponíveis no sistema.</p>
                </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 px-8 pd-16">
                {modelos.map((modelo) => {
                    const marca = marcas.find((m) => m.id === modelo.marca_id);
                    return (
                        <div 
                            key={modelo.id}
                            className={`rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border hover:-translate-y-1 ${
                                dark
                                    ? "bg-zinc-700/50 border-neutral-500"
                                    : "bg-gray-50 border-gray-200"
                                }
                            `}
                        >
                            <img 
                                src={modelo.imagem || "https://placehold.co/300x200?text=Sem+Imagem"}
                                alt={modelo.nome}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <p className="text-xl font-semibold mb-3 text-center">
                                    {modelo.nome}
                                </p>
                                <ul className={`space-y-2 text-sm ${dark ? "text-gray-100" : "text-gray-600"}`}>
                                    <li>
                                        <span className={`font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>Marca:</span>{" "} 
                                        <span className={`font-semibold ${dark ? "text-gray-50" : "text-gray-700"}`}>
                                            {marca ? marca.nome : "Desconhecida"}
                                        </span>
                                    </li>
                                    <li>
                                        <span className={`font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>Portas:</span>{" "}
                                        <span className={`font-semibold ${dark ? "text-gray-50" : "text-gray-700"}`}>
                                            {modelo.numero_portas}
                                        </span>
                                    </li>
                                    <li>
                                        <span className={`font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>Airbag:</span>{" "} 
                                        <span className={`font-semibold ${dark ? "text-gray-50" : "text-gray-700"}`}>
                                            {modelo.air_bag ? "Sim" : "Não"}
                                        </span>
                                    </li>
                                    <li>
                                        <span className={`font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>ABS:</span>{" "}
                                        <span className={`font-semibold ${dark ? "text-gray-50" : "text-gray-700"}`}>
                                            {modelo.abs ? "Sim" : "Não"}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    );
                })}
                 </div>
                </section>
            </div>
        </div>       
    );
}