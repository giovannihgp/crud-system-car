import NovaSenha from "../components/NovaSenha";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import UserEditor from "../components/UserEdit";
import AdminUsers from "../components/AdminUsers";
import PasswordIcon from "../assets/icons/PasswordIcon";
import OutIcon from "../assets/icons/OutIcon";
import { ChevronRight, Moon, Sun, Eclipse  } from "lucide-react";
import Modal from "../components/Modal";

export default function AccountPaga() {
    const { dark, toggleTheme } = useTheme();
    const { user, loading, atualizarPerfil } = useAuth();
    const navigate = useNavigate();
    const [menuSenha, setMenuSenha] = useState(false);

    useEffect(() => {
        if (!user && !loading) {
            navigate("/login");
        }
    }, [user, loading, navigate]);
    
        if (loading) {
            return (
                <LoadingSpinner 
                    text="Carregando..."
                    classLoading="min-h-screen flex items-center justify-center"
                    classLoadingTwo="flex flex-col items-center justify-center py-10"
                    classSpinner={`animate-spin h-10 w-10 mb-3 ${dark ? "text-violet-500" : "text-indigo-600"}`}
                />
            )
        }

    return (
        <div className="min-h-screen mt-25 w-full">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-9">
                    <p className="text-2xl font-bold">Minha Conta</p>
                    <p className="font-semibold text-gray-500">Gerencie suas informações e preferências</p>
                </div>
                {user?.id === 1 ? (
                        <>
                            <AdminUsers />
                        </>
                    ) : (
                        <UserEditor 
                            user={user}
                            canEdit
                            onSave={atualizarPerfil}
                        />
                )}
                <div className="my-9">
                    <p className="font-bold text-2xl">Configuração</p>
                </div>
                <div className="flex flex-col mx-auto max-w-4xl my-7 bg-transparent space-y-3">
                    <div>
                        <button 
                            onClick={() => setMenuSenha(true)}
                            className={`group w-full border bg-transparent cursor-pointer mx-auto max-w-4xl rounded-lg transition-all duration-200 ease-in-out
                                ${dark
                                    ? "border-gray-700 hover:border-violet-400"
                                    : "border-gray-300 hover:border-indigo-600"}
                            `}
                        >
                            <div className="flex flex-row max-h-19">
                                <div className="grow py-3 ps-5">
                                    <PasswordIcon 
                                        classDiv={`w-12 h-12 flex items-center justify-center rounded-lg transition-all ${dark 
                                                ? "bg-violet-600/20 group-hover:bg-violet-600" 
                                                : "bg-indigo-500/20 group-hover:bg-indigo-500"
                                            }`}
                                        classIcon={`w-6 h-6 transition-all ${dark 
                                            ? "text-purple-600 group-hover:text-white" 
                                            : "text-indigo-600 group-hover:text-white"
                                        }`}
                                    />
                                </div>
                                <div className="grow-20 py-3">
                                    <p className="text-lg font-semibold text-left">Alterar Senha</p>
                                    <p className={`text-sm text-left ${dark ? "text-gray-400" : "text-gray-500"}`}>Atualize sua senha de acesso</p>
                                </div>
                                <div className="grow">
                                    <div className="me-1 group-hover:me-0">
                                        <ChevronRight className={`h-17 w-6 ${dark ? "text-gray-400" : "text-gray-500"}`} />
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className="mt-3">
                        <button
                            onClick={toggleTheme}
                            className={`group w-full border bg-transparent cursor-pointer mx-auto max-w-4xl rounded-lg
                                        transition-all duration-200 ease-in-out
                                ${dark
                                    ? "border-gray-700 hover:border-violet-400"
                                    : "border-gray-300 hover:border-indigo-600"}
                            `}
                        >
                            <div className="flex flex-row max-h-19">
                                <div className="grow py-3 ps-5">
                                    <div className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all 
                                            ${dark ? "bg-violet-600/20 group-hover:bg-violet-600" 
                                                : "bg-indigo-500/20 group-hover:bg-indigo-500"}`}
                                    >
                                        <Eclipse 
                                            className={`w-6 h-6 transition-all 
                                            ${dark ? "text-purple-600 group-hover:text-white" 
                                                : "text-indigo-600 group-hover:text-white"}`}
                                        />
                                    </div>
                                </div>
                                <div className="text-left grow-20 py-3">
                                    <p className="text-lg font-semibold">
                                        Modo Escuro
                                    </p>
                                    <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
                                        Alternar tema da interface
                                    </p>
                                </div>
                                <div className="grow mt-5">
                                    <div
                                        className={`relative w-14 h-8 rounded-full transition-colors
                                            ${dark
                                                ? "bg-violet-400/55"
                                                : "bg-gray-300"}
                                        `}
                                    >
                                        <div
                                            className={`absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-all duration-300
                                                ${dark ? "translate-x-6 bg-zinc-800/90" : "bg-white/80"}
                                                group-hover:scale-105
                                            `}
                                        >
                                            {dark ? (
                                                <Moon className="w-4 h-4 text-blue-700" />
                                            ) : (
                                                <Sun className="w-4 h-4 text-yellow-500" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className="mt-3">
                        <button
                            onClick={() => navigate("/sair")}
                            className={`group w-full border bg-transparent cursor-pointer mx-auto max-w-4xl rounded-lg transition-all duration-200 ease-in-out
                                ${dark ? "border-gray-700 hover:border-red-400 hover:bg-red-500/25" : "border-gray-300 hover:border-red-600 hover:bg-red-500/15"}
                            `}
                        >
                            <div className="flex flex-row max-h-19">
                                <div className="grow py-3 ps-5">
                                    <OutIcon 
                                        classDiv={`w-12 h-12 flex items-center justify-center rounded-lg transition-all
                                            ${dark ? "group-hover:bg-red-600/95 bg-red-600/30" 
                                                : "group-hover:bg-red-600/80 bg-red-500/15"}    
                                        `}
                                        classIcon={`w-6 h-6 group-hover:text-white transition-all
                                            ${dark ? "text-red-600" 
                                                : "text-red-500"}    
                                        `}
                                    />
                                </div>
                                <div className="grow-37 py-3 ps-3">
                                    <p className={`text-lg font-semibold text-left ${dark ? "text-red-700" : "text-red-400"}`}>Sair da Conta</p>
                                    <p className={`text-sm text-left ${dark ? "text-gray-400" : "text-gray-500"}`}>Encerre sua sessão atual</p>
                                </div>
                                <div className="grow">
                                    <div className="me-1 group-hover:me-0">
                                        <ChevronRight className={`h-17 w-6 ${dark ? "text-red-700" : "text-red-400"}`} />
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                <Modal open={menuSenha} onClose={() => setMenuSenha(false)}>
                    <p className="text-2xl font-bold mb-3 text-center">
                        Alterar Senha
                    </p>
                    <NovaSenha />
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={() => setMenuSenha(false)}
                            className={`px-4 py-2 rounded-lg text-sm text-white font-semibold cursor-pointer ${dark ? "bg-gray-500 hover:bg-gray-600" : "bg-gray-400 hover:bg-gray-500"}`}
                        >   
                            Cancelar
                        </button>
                    </div>
                </Modal>
            </div> 
        </div>
    );
}