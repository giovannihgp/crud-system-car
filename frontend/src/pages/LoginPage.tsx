import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthProvider";
import Loginform from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NovaSenha from "../components/NovaSenha";
import UsersList from "../components/UsersList";

export default function LoginPage() {
    const { dark } = useTheme();
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [menuSenha, setMenuSenha] = useState(false);

    if(user) {
        return (
            <div className="min-h-screen p-8 mt-21">
                <div 
                    className={`p-8 rounded-3xl shadow-lg border max-w-3xl mx-auto mt-10
                        ${dark ? "bg-zinc-600 border-neutral-500" : "border-gray-100 bg-white/80"}`
                    }
                >
                    <div className="flex">
                        <p className="text-2xl font-semibold p-5">Você já está logado</p>
                        <button 
                            onClick={() => setMenuSenha(!menuSenha)}
                            className={`font-semibold text-amber-500 hover:text-amber-600 bg-transparent underline underline-offset-2 mt-1`}
                        >
                            Trocar Senha
                        </button>
                    </div>
                    <button
                        onClick={() => navigate("/sair")}
                        className={`w-full py-2 font-bold rounded-full text-white bg-red-500 hover:bg-red-600`}
                    >
                        Sair
                    </button>
                    {user.id === 1 ? (
                        <>
                            <UsersList />
                        </>
                    ) : (
                        <div>
                            <ul className="space-y-2">
                                <li key={user.id}
                                    className="content-center px-4 py-2 rounded-lg border hover:shadow-md shadow-sm transition-all min-h-[61px]"
                                >
                                    <div className="flex flex-1 justify-between items-center">
                                        <label>Nome:</label>
                                        <div className="flex gap-3">
                                            <span className="">{user.name}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 justify-between items-center">
                                        <label>Nome de Usuário:</label>
                                        <div className="flex gap-3">
                                            <span>{user.username}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 justify-between items-center">
                                        <label>E-Mail</label>
                                        <div className="flex gap-3">
                                            <span>{user.email}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}

                    {menuSenha && (
                        <div className="mt-5">
                            <NovaSenha />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 mt-30">
            <div className={`rounded-3xl shadow-lg border max-w-4xl mx-auto mt-14 mb-5 p-10 backdrop-blur-sm
                ${
                    dark
                        ? "bg-zinc-600 border-neutral-500"
                        : "border-gray-100 bg-white/80"        
                    }
                `}
            >
                <div className="flex px-1">
                    <p className="font-medium px-2">Não tem uma conta?</p>
                    <button 
                        onClick={() => navigate("/registro")}
                        className={`font-semibold text-teal-300 hover:text-teal-400 bg-transparent underline underline-offset-2`}
                    >
                        Registre-se
                    </button>
                </div>
                <Loginform onSubmit={login} />
            </div>
            
        </div>
    );
}
