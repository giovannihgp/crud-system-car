import Container from "../components/container";
import Card from "../components/card";
import type { Marca } from "../types/marca";
import type { Modelo } from "../types/modelo";
import { useEffect, useState } from "react";
import { getModelos } from "../api/modelos";
import { getMarcas } from "../api/marcas";

export default function PageHome() {
    
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);

    useEffect(() => {
        getModelos().then(setModelos).catch(console.error);
        getMarcas().then(setMarcas).catch(console.error);
    }, []);

    return (
        <>
            <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white pt-25 pb-15 text-center shadow-lg">
                <div className="max-w-3xl mx-auto px-4">
                    <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
                        AutoHub — Gestão de Veículos
                    </h1>
                    <p className="text-lg opacity-90 leading-relaxed pt-2">
                        Explore e gerencie nossa base de <span className="font-semibold">marcas</span> e{" "}
                        <span className="font-semibold">modelos</span> de veículos.
                    </p>
                </div>
            </section>
            <Container>
                <Card className="mt-14 mb-5 p-10 max-w-4xl mx-auto shadow-xl rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-3 pb-7">
                        <svg
                            className=""
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                            fill="currentColor"
                            width="52" 
                            height="52"
                        >
                            <path d="M240,112H211.31L168,68.69A15.86,15.86,0,0,0,156.69,64H44.28A16,16,0,0,0,31,71.12L1.34,115.56A8.07,8.07,0,0,0,0,120v48a16,16,0,0,0,16,16H33a32,32,0,0,0,62,0h66a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V128A16,16,0,0,0,240,112ZM44.28,80H156.69l32,32H23ZM64,192a16,16,0,1,1,16-16A16,16,0,0,1,64,192Zm128,0a16,16,0,1,1,16-16A16,16,0,0,1,192,192Zm48-24H223a32,32,0,0,0-62,0H95a32,32,0,0,0-62,0H16V128H240Z"></path>
                        </svg>
                        <p className="font-bold text-2xl">
                            Gerencie sua frota com facilidade
                        </p>
                    </div>
                    <p className="leading-relaxed font-light">
                        O <span className="font-semibold text-blue-600">AutoHub</span> é um sistema desenvolvido para organizar e gerenciar informações de veículos de forma <span className="font-semibold">simples</span> e <span className="font-semibold">eficiente</span>. Com ele, é possível <span className="font-normal">cadastrar</span> e <span className="font-normal">consultar</span> <span className="font-semibold">marcas</span> e <span className="font-semibold">modelos</span> de automóveis, mantendo tudo estruturado e acessível.
                    </p>

                    <p className="leading-relaxed font-light my-2">
                        O sistema foi projetado para oferecer <span className="font-semibold">rapidez</span> e <span className="font-semibold">praticidade</span> no gerenciamento de dados, permitindo visualizar registros cadastrados e facilitar futuras expansões. A interface busca ser <span className="font-semibold">intuitiva</span>, tornando o processo de manutenção das informações ágil e descomplicado.
                    </p>

                    <p className="leading-relaxed font-light">
                        Ideal para cenários que envolvem listagem, controle e consulta de informações automotivas, o <span className="font-semibold text-blue-600">AutoHub</span> serve como base para evoluções, podendo futuramente integrar recursos adicionais relacionados a veículos.
                    </p>
                </Card>
            </Container>
            <section className="py-20 bg-gray-50 my-7">
                <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">
                    Marcas Registradas
                </h2>
                <ul className="max-w-4xl grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto px-6">
                    {marcas.map((m) => (
                        <li
                            key={m.id}
                            className="text-center text-xl px-6 py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
                        >
                            <span className="font-semibold text-gray-800 ">
                                {m.nome}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
            <section className="py-10">
                <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">
                    Modelos registrados
                </h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 px-8 pd-16">
                {modelos.map((modelo) => {
                    const marca = marcas.find((m) => m.id === modelo.marca_id);
                    return (
                        <div 
                            key={modelo.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:-translate-y-1"
                        >
                            <img 
                                src={modelo.imagem || "https://placehold.co/300x200?text=Sem+Imagem"}
                                alt={modelo.nome}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <p className="text-xl font-semibold text-gray-800 mb-3 text-center">
                                    {modelo.nome}
                                </p>
                                <ul className="text-gray-600 space-y-2 text-sm">
                                    <li>
                                        <span className="text-gray-500 font-medium">Marca:</span>{" "} 
                                        <span className="font-semibold text-gray-700">
                                            {marca ? marca.nome : "Desconhecida"}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-gray-500 font-medium">Portas:</span>{" "}
                                        <span className="font-semibold text-gray-700">
                                            {modelo.numero_portas}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-gray-500 font-medium">AirBag:</span>{" "} 
                                        <span className="font-semibold text-gray-700">
                                            {modelo.air_bag ? "Sim" : "Não"}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-gray-500 font-medium">ABS:</span>{" "}
                                        <span className="font-semibold text-gray-700">
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
        </>       
    );
}