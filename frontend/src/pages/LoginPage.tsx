import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthProvider";
import Loginform from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import UserIcon from "../assets/icons/UserIcon";

export default function LoginPage() {
    const { dark } = useTheme();
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(false);
        };
        load();
    }, []);

    if(user) {
        navigate("/conta");
    }
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
        <div className="min-h-screen p-1 mt-30">
            <div className={`rounded-3xl shadow-lg border lg:max-w-lg 2xl:max-w-xl mx-auto mt-14 mb-5 p-7 backdrop-blur-sm 
                ${dark ? "bg-zinc-700/50 border-neutral-600" : "border-gray-100 bg-white/80"}`}
            >
                <UserIcon 
                    classDiv={`w-27 h-27 flex lg:ms-43 2xl:ms-50 items-center justify-center rounded-full transition-all mb-7
                         ${dark 
                            ? "bg-violet-600/20 group-hover:bg-violet-600" 
                            : "bg-indigo-500/20 group-hover:bg-indigo-500"
                         }`}
                    
                    classIcon={`h-17 w-17 ${dark ? "text-purple-600" : "text-indigo-600"}`}
                />
                <Loginform onSubmit={login} />
                <div className="flex flex-row items-center justify-center">
                    <p className={`pe-2 ${dark ? "text-gray-400" : "text-gray-500"}`}>Não tem uma conta?</p>
                    <button 
                        onClick={() => navigate("/registro")}
                        className={`font-semibold bg-transparent underline underline-offset-2 cursor-pointer ${
                            dark
                                ? "text-sky-500 hover:text-sky-600"
                                : "text-blue-600 hover:text-blue-700"
                        }`}
                    >
                        Registre-se
                    </button>
                </div>
            </div>
            
        </div>
    );
}
