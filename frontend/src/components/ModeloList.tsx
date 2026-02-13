import React, { useState } from "react";
import type { Modelo } from "../types/modelo";
import type { Marca } from "../types/marca";
import { modeloService } from "../services/modeloService";
import { useTheme } from "../contexts/ThemeContext";
import type { User } from "../types/user";

interface ModeloListProps {
    modelos: Modelo[];
    marcas: Marca[];
    setModelos: React.Dispatch<React.SetStateAction<Modelo[]>>;
    porPagina?: number;
    children?: React.ReactNode;
    user: User | null;
}

export default function ModeloList({ modelos, marcas, setModelos, children, user }: ModeloListProps) {
    const { dark } = useTheme();
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
    const [erroDelet, setErroDelet] = useState("");
    const [erroDeletId, setErroDeletId] = useState<number | null>(null);
    const [erroEdit, setErroEdit] = useState("");
    const [alerta, setAlerta] = useState<number | null>(null);
    const getMarcaNome = (modelo: Modelo) => {
        const marca = marcas.find((m) => m.id === modelo.marca_id);
        return marca ? marca.nome : "desconhecido";
    };

    const handleEditClick = (m: Modelo) => {
        if(m.user_id !== user?.id && user?.id !== 1) {
            setErroEdit("Você só pode editar Modelos que criou.");
            setEditandoId(m.id);
            setAlerta(m.id);
            setTimeout(() => {
                setErroEdit("");
                setEditandoId(null);
                setAlerta(null);
            }, 4000);
        }

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
        setAlerta(null);
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
        setConfirmarRemoverId(id);
        setEditandoId(null); 
    }

    const handleDelete = async (id: number) => {
        setErroDelet("");
        try {
            await modeloService.remover(id);
            setModelos((prev) => prev.filter((m) => m.id !== id));
            setConfirmarRemoverId(null);
        } catch {
            setErroDeletId(id);
            setErroDelet("Você só pode apagar Modelos que criou.");
            setTimeout(() => {
                setErroDelet("");
                setErroDeletId(null);
                setConfirmarRemoverId(null);
            }, 5000);
        }
    };

    const selectBase = "border rounded-lg px-2 py-2 focus:outline-none focus:ring-2 cursor-pointer transition-colors duration-200 text-md font-medium";
    const inputBase = "border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200 w-full focus:ring-2 placeholder:text-md placeholder:font-medium";
    const inputLight = "border-gray-300 focus:border-indigo-500 focus:ring-indigo-400 text-gray-700 placeholder-gray-500 bg-gray-100";
    const inputDark = "border-neutral-500 focus:border-purple-700 focus:ring-purple-500 text-gray-200 placeholder-gray-400 bg-zinc-800";
    const inputErroLight = "border-red-600 ring-2 ring-red-400 placeholder-red-600 bg-red-50 text-red-600";
    const inputErroDark = "border-red-400 ring-2 ring-red-200 placeholder-red-500 trxt-red-500 bg-red-300/20";

    const labelBase = "text-sm font-semibold";
    const labelLight = "text-gray-500";
    const labelDark = "text-gray-300";

    const inputClass = (hasError?: boolean) =>
        `${inputBase} ${
            hasError
                ? dark
                    ? inputErroDark
                    : inputErroLight
                : dark
                    ? inputDark
                    : inputLight
    }`;

    const selectClass = (hasError?: boolean) =>
        `${selectBase} ${
            hasError
                ? dark
                    ? inputErroDark
                    : inputErroLight
                : dark
                    ? inputDark
                    : inputLight
    }`;

    return (
        <div className="mt-5">
            <ul className="space-y-2">
                {modelos.map((m) => (
                    <li key={m.id}
                        className={`border content-center px-4 py-2 rounded-lg hover:shadow-md shadow-sm transition-all min-h-[61px] ${
                            confirmarRemoverId === m.id || alerta === m.id
                                ? dark ? "border-red-500 bg-red-100" : "border-red-200 bg-red-50"
                                : dark ? "bg-zinc-700/50 border-neutral-500" : "bg-white/80 border-gray-100 hover:bg-gray-50 hover:border-indigo-500/70"
                        }`}
                    >
                        {editandoId === m.id && erroEdit ? (
                            <div className="flex gap-2 items-center">
                                <span className="text-red-600 font-medium">
                                    {erroEdit}
                                </span>
                                <div className="flex flex-2 gap-2 justify-end">
                                    <button
                                        onClick={() => { 
                                            setErroEdit(""); 
                                            setEditandoId(null);
                                            setAlerta(null);
                                        }}
                                        className={`rounded-lg font-medium px-3 py-1 text-white ${dark ? "bg-gray-400 hover:bg-gray-500" : "bg-gray-500 hover:bg-gray-600"}`}
                                    >
                                        Voltar
                                    </button>
                                </div>
                            </div>
                        ) : editandoId === m.id ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="flex flex-col col-span-2">
                                    <label className={`${labelBase} mb-1 ${dark ? labelDark : labelLight}`}>Nome:</label>
                                    <input 
                                        value={editNome}
                                        onChange={(e) => setEditNome(e.target.value)}
                                        className={inputClass(!!errors.nome && !!erroEdicao)}
                                        placeholder="Nome do modelo"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className={`${labelBase} mb-1 ${dark ? labelDark : labelLight}`}>Marca:</label>
                                    <select
                                        value={editMarcaId ?? ""}
                                        onChange={(e) => 
                                            setEditMarcaId(e.target.value ? Number(e.target.value) : null)
                                        }
                                        className={selectClass(!!errors.marca && !!erroEdicao)}
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
                                    <label className={`${labelBase} mb-1 ${dark ? labelDark : labelLight}`}>Portas:</label>
                                    <select 
                                        value={editPortas ?? ""}
                                        onChange={(e) => 
                                            setEditPortas(Number(e.target.value) || null)
                                        }
                                        className={selectClass(!!errors.portas && !!erroEdicao)}
                                    >
                                        <option value="">Portas</option>
                                        {[2,3,4].map((n) => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className={`${labelBase} mb-1 ${dark ? labelDark : labelLight}`}>AirBag:</label>
                                    <select 
                                        value={editAirBag === null ? "" : editAirBag ? "true" : "false"}
                                        onChange={(e) =>  
                                            setEditAirBag(
                                                e.target.value === "" ? null : e.target.value === "true"
                                            )
                                        }
                                        className={selectClass(!!errors.airbag && !!erroEdicao)}
                                    >
                                        <option value="">Air Bag</option>
                                        <option value="true">Sim</option>
                                        <option value="false">Não</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className={`${labelBase} mb-1 ${dark ? labelDark : labelLight}`}>ABS:</label>
                                    <select 
                                        value={editAbs === null ? "" : editAbs ? "true" : "false"}
                                        onChange={(e) => 
                                            setEditAbs(
                                                e.target.value === "" ? null : e.target.value === "true"
                                            )
                                        }
                                        className={selectClass(!!errors.abs && !!erroEdicao)}
                                    >
                                        <option value="">ABS</option>
                                        <option value="true">Sim</option>
                                        <option value="false">Não</option>
                                    </select>
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className={`${labelBase} mb-1 ${dark ? labelDark : labelLight}`}>Imagem:</label>
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
                                        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 cursor-pointer ${
                                            errors.imagem 
                                                ? dark ? inputErroDark : inputErroLight
                                                : dark ? inputDark : inputLight
                                        }`}
                                    />
                                </div>
                                <div className="flex flex-col justify-center col-span-3 min-h-12">
                                    {erroEdicao && (
                                        <p 
                                            className={`border rounded-md px-3 py-2 text-sm mt-2 col-span-full text-center font-semibold ${
                                                dark ? "text-red-700 bg-red-200 border-red-500" : "text-red-600 bg-red-50 border-red-200"
                                            }`}
                                        >
                                            {erroEdicao}
                                        </p>
                                    )}
                                </div>
                                <div className="flex justify-end gap-3 sm:col-span-2 lg:col-span-3 mb-2">
                                    <button
                                        onClick={() => handleSalvarEdit(m.id)}
                                        className={`font-semibold px-5 py-2 rounded-lg transition text-white ${
                                            dark ? "bg-emerald-700 hover:bg-emerald-800" : "bg-green-600 hover:bg-green-700"
                                        }`}
                                        
                                    >
                                        Salvar
                                    </button>
                                    <button
                                        onClick={handleCancelarEdit}
                                        className={`font-semibold px-5 py-2 rounded-lg focus:outline-none focus:ring-2 hover:shadow-md transition-all text-white ${
                                            dark ? "bg-rose-400 hover:bg-rose-500 focus:ring-rose-300" : "bg-red-600 hover:bg-red-700 focus:ring-red-400"
                                        }`}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : erroDeletId === m.id ? (
                            <div className="flex gap-2 items-center">
                                <span className="text-red-600 font-medium">
                                    {erroDelet}
                                </span>
                                <div className="flex flex-2 gap-2 justify-end">
                                    <button
                                        onClick={() => { 
                                            setErroDelet(""); 
                                            setErroDeletId(null);
                                            setConfirmarRemoverId(null);
                                            setAlerta(null);
                                        }}
                                        className={`rounded-lg font-medium px-3 py-1 text-white ${dark ? "bg-gray-400 hover:bg-gray-500" : "bg-gray-500 hover:bg-gray-600"}`}
                                    >
                                        Voltar
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
                                        className={`rounded-md font-medium px-2 py-1 focus:outline-none focus:ring-2 hover:shadow-md transition-all text-white ${
                                            dark ? "bg-rose-500 hover:bg-rose-600 focus:ring-rose-400" : "bg-red-600 hover:bg-red-700 focus:ring-red-400"
                                        }`}
                                    >
                                        Confirmar
                                    </button>
                                    <button
                                        onClick={handleCancelarRemover}
                                        className={`rounded-md font-medium px-2 py-1 border-0 text-white ${
                                            dark ? "bg-gray-400 hover:bg-gray-500" : "bg-gray-500 hover:bg-gray-600"
                                        }`}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                <div>
                                    <span 
                                        className={`font-medium ${
                                            dark ? "text-gray-100" : "text-gray-800"
                                        }`}
                                    >
                                        {m.nome}
                                    </span>
                                    <span 
                                        className={`text-sm block sm:inline ${
                                            dark ? "text-gray-400" : "text-gray-500"
                                        }`}
                                    >
                                        {" "}
                                        ({getMarcaNome(m)}) • {m.numero_portas} portas •{" "}
                                        {m.air_bag ? "AirBag" : "Sem AirBag"} • {m.abs ? "ABS" : "Sem ABS"}
                                    </span>
                                </div>
                                <div className="flex gap-3 mt-2 sm:mt-0">
                                    <button
                                        onClick={() => handleEditClick(m)}
                                        className={`hover:underline font-medium cursor-pointer ${
                                            dark ? "text-blue-400 hover:text-blue-500" : "text-blue-600 hover:text-blue-700"
                                        }`}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleConfirmarRemover(m.id)}
                                        className={`hover:underline font-medium cursor-pointer ${
                                            dark ? "text-rose-400 hover:text-rose-500" : "text-red-600 hover:text-red-700"
                                        }`}
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