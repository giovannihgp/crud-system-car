import React, { useState } from "react";
import type { Modelo } from "../types/modelo";
import type { Marca } from "../types/marca";
import { modeloService } from "../services/modeloService";

interface ModeloListProps {
    modelos: Modelo[];
    marcas: Marca[];
    setModelos: React.Dispatch<React.SetStateAction<Modelo[]>>;
    porPagina?: number;
    children?: React.ReactNode;
}

export default function ModeloList({ modelos, marcas, setModelos, children }: ModeloListProps) {
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [erroEdicao, setErroEdicao] = useState("");
    const [confirmarRemoverId, setConfirmarRemoverId] = useState<number | null>(null);

    const [editNome, setEditNome] = useState("");
    const [editMarcaId, setEditMarcaId] = useState<number | null>(null);
    const [editPortas, setEditPortas] = useState<number | null>(null);
    const [editAirBag, setEditAirBag] = useState<boolean | null>(null);
    const [editAbs, setEditAbs] = useState<boolean | null>(null);
    const [editImagem, setEditImagem] = useState("");
    const [editOriginal, setEditOriginal] = useState<Modelo | null>(null);
    const [errors, setErrors] = useState({
        nome: false,
        marca: false,
        portas: false,
        airbag: false,
        abs: false,
        imagem: false
    });

    const getMarcaNome = (modelo: Modelo) => {
        const marca = marcas.find((m) => m.id === modelo.marca_id);
        return marca ? marca.nome : "desconhecido";
    };

    const handleEditClick = (m: Modelo) => {
        setEditOriginal(m);
        setEditandoId(m.id);
        setEditNome(m.nome);
        setEditMarcaId(m.marca_id);
        setEditPortas(m.numero_portas);
        setEditAirBag(m.air_bag);
        setEditAbs(m.abs);
        setEditImagem(m.imagem);
    };

    const handleCancelarEdit = () => {
        setEditandoId(null);
        setErrors({
            nome: false,
            marca: false,
            portas: false,
            airbag: false,
            abs: false,
            imagem: false,
        });
        setErroEdicao("");
        setEditOriginal(null);
    };


    const handleSalvarEdit = async (id: number) => {
        const semMudanca = 
            editNome === editOriginal?.nome &&
            editMarcaId === editOriginal?.marca_id &&
            editPortas === editOriginal?.numero_portas &&
            editAirBag === editOriginal?.air_bag &&
            editAbs === editOriginal?.abs &&
            editImagem === editOriginal?.imagem;
        if (semMudanca) {
            setErroEdicao("Nenhuma alteração foi realizada.");
            setTimeout(() => setErroEdicao(""), 4000);
            return;
        }
        const novoErro = {
            nome: !editNome.trim(),
            marca: !editMarcaId,
            portas: !editPortas,
            airbag: editAirBag === null,
            abs: editAbs === null,
            imagem: !editImagem.trim()
        };
        setErrors(novoErro);
        if (Object.values(novoErro).some(v => v === true)) {
            setErroEdicao("Preencha todos os campos corretamente.");
            setTimeout(() => setErroEdicao(""), 4000);
            return;
        }
        try {
            const atualizado = await modeloService.atualizar(id, {
                nome: editNome.trim(),
                numero_portas: editPortas!,
                air_bag: editAirBag!,
                abs: editAbs!,
                marca_id: editMarcaId!,
                imagem: editImagem.trim(),
            });
            setModelos((prev) => prev.map((m) => (m.id === id ? atualizado : m)));
            setEditandoId(null);
        } catch {
            alert("Erro ao atualizar modelo");
        }
    };

    const handleCancelarRemover = () => setConfirmarRemoverId(null);

    const handleConfirmarRemover = async (id: number) => {
        try {
            setConfirmarRemoverId(id);
            setEditandoId(null);
        } catch {
            alert("Erro");
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await modeloService.remover(id);
            setModelos((prev) => prev.filter((m) => m.id !== id));
            setConfirmarRemoverId(null);
        } catch {
            alert("Erro ao deletar modelo");
        }
    };

    return (
        <div className="mt-5">
            <ul className="space-y-2">
                {modelos.map((m) => (
                    <li
                        key={m.id}
                        className={`border content-center px-4 py-2 rounded-lg hover:shadow-md shadow-sm transition-all min-h-[61px]
                            ${confirmarRemoverId === m.id ? "border-red-200 bg-red-50" : "bg-white border-gray-200"}`
                        }
                    >
                        {editandoId === m.id ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="flex flex-col col-span-2">
                                    <label className="text-sm text-gray-600">Nome</label>
                                    <input 
                                        value={editNome}
                                        onChange={(e) => setEditNome(e.target.value)}
                                        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 
                                            ${errors.nome ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"}`
                                        }
                                        placeholder="Nome do modelo"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-600">Marca</label>
                                    <select
                                        value={editMarcaId ?? ""}
                                        onChange={(e) => 
                                            setEditMarcaId(e.target.value ? Number(e.target.value) : null)
                                        }
                                        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 
                                            ${errors.marca ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"}`
                                        }
                                    >
                                        <option value="">Selecione uma Marca</option>
                                        {marcas.map((marca) => (
                                            <option key={marca.id} value={marca.id}>
                                                {marca.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-600">Portas</label>
                                    <select 
                                        value={editPortas ?? ""}
                                        onChange={(e) => 
                                            setEditPortas(Number(e.target.value) || null)
                                        }
                                        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 
                                            ${errors.portas ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"}`
                                        }
                                    >
                                        <option value="">Portas</option>
                                        {[2,3,4].map((n) => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-600">AirBag</label>
                                    <select 
                                        value={editAirBag === null ? "" : editAirBag ? "true" : "false"}
                                        onChange={(e) =>  
                                            setEditAirBag(
                                                e.target.value === "" ? null : e.target.value === "true"
                                            )
                                        }
                                        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 
                                            ${errors.airbag ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"}`
                                        }
                                    >
                                        <option value="">Air Bag</option>
                                        <option value="true">Sim</option>
                                        <option value="false">Não</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-600">ABS</label>
                                    <select 
                                        value={editAbs === null ? "" : editAbs ? "true" : "false"}
                                        onChange={(e) => 
                                            setEditAbs(
                                                e.target.value === "" ? null : e.target.value === "true"
                                            )
                                        }
                                        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 
                                            ${errors.abs ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"}`
                                        }
                                    >
                                        <option value="">ABS</option>
                                        <option value="true">Sim</option>
                                        <option value="false">Não</option>
                                    </select>
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="text-sm text-gray-600">Imagem</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            if(!file.type.startsWith("image/")) {
                                                alert("Selecione um arquivo de imagem valido tipo jpg, png, etc..");
                                                return;
                                            }
                                            const reader = new FileReader(); 
                                            reader.onloadend = () => setEditImagem(reader.result as string);
                                            reader.readAsDataURL(file);
                                        }}
                                        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 
                                            ${errors.imagem ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"}`
                                        }
                                    />
                                </div>
                                <div className="flex flex-col justify-center col-span-3 min-h-[48px]">
                                    {erroEdicao && (
                                        <p className="text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 text-sm mt-2 col-span-full text-center font-semibold">
                                            {erroEdicao}
                                        </p>
                                    )}
                                </div>
                                <div className="flex justify-end gap-3 sm:col-span-2 lg:col-span-3 mb-2">
                                    <button
                                        onClick={() => handleSalvarEdit(m.id)}
                                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg transition"
                                    >
                                        Salvar
                                    </button>
                                    <button
                                        onClick={handleCancelarEdit}
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : confirmarRemoverId === m.id ? (
                            <div className="flex gap-2 items-center">
                                <span className="text-red-600 font-medium">
                                    Tem certeza que deseja remover o modelo "{m.nome}" ?
                                </span>
                                <div className="flex flex-2 gap-2 items-center justify-end">
                                    <button
                                        onClick={() => handleDelete(m.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold px-2 py-1"
                                    >
                                        Confirmar
                                    </button>
                                    <button
                                        onClick={handleCancelarRemover}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md font-semibold px-2 py-1"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                <div>
                                    <span className="font-medium text-gray-800 dark:text-gray-100">
                                    {m.nome}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm block sm:inline">
                                    {" "}
                                    ({getMarcaNome(m)}) • {m.numero_portas} portas •{" "}
                                    {m.air_bag ? "AirBag" : "Sem AirBag"} • {m.abs ? "ABS" : "Sem ABS"}
                                    </span>
                                </div>
                                <div className="flex gap-3 mt-2 sm:mt-0">
                                    <button
                                        onClick={() => handleEditClick(m)}
                                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleConfirmarRemover(m.id)}
                                        className="text-red-600 dark:text-red-400 hover:underline font-medium"
                                    >
                                        Remover
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {children && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}