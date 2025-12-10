import Card from "../components/card";
import { useTheme } from "../context/ThemeContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function LogoutPage() {
    const { dark } = useTheme();
    const { logout } = useAuth();
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    async function handleLogout(e: React.FormEvent) {
        e.preventDefault();
        setErro("");
        setLoading(true);

        await logout();

        setLoading(false);
        
        navigate("/login");
    }

  return (
    <div className="min-h-screen p-8 mt-39">
        <Card 
            className={`mt-14 mb-5 p-10 max-w-md shadow-xl rounded-3xl border backdrop-blur-sm  
                ${
                    dark 
                        ? "bg-zinc-600 border-neutral-500"
                        : "border-gray-100 bg-white/80"
                }
            `}
        >
            <p className="text-center font-bold text-2xl pb-7">Logout</p>

            <form onSubmit={handleLogout} className="">
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 font-bold rounded-full text-white max-w-2xs  ${
                            loading
                                ? "bg-blue-300 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {loading ? "Saindo..." : "Sair"}
                    </button>
                </div>
                {erro && <p className="text-center text-red-600 font-semibold mt-2">{erro}</p>}
            </form>
        </Card>
    </div>
  );
}
