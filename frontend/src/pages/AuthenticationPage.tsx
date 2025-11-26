import Card from "../components/card";
import { useTheme } from "../context/ThemeContext";

export default function AuthPage() {
    const { dark } = useTheme();

  return (
    <div className="min-h-screen p-8 mt-39">
        <Card 
            className={`mt-14 mb-5 p-10 max-w-4xl mx-auto shadow-xl rounded-3xl border backdrop-blur-sm ${
                        dark 
                            ? "bg-zinc-600 border-neutral-500"
                            : "border-gray-100 bg-white/80"
                        }
            `}
        >
            <p className="text-center font-bold text-2xl pb-7">
                Cadastro
            </p>
            <div className="flex-1 flex flex-col">
                <label className="text-sm font-semibold mb-1">Nome de Usuario:</label>
                <input
                    value=""
                    type="text"
                    className={`border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200
                        ${
                            dark
                                ? "text-gray-200 placeholder-gray-300"
                                : "text-gray-800 placeholder-gray-400"
                        }`
                    }
                />
                <div className="flex-1 flex flex-col">
                    <label className="text-sm font-semibold mb-1">Senha:</label>
                    <input
                        type="password"
                        className={`border rounded-lg px-3 py-2 focus:outline-none transition-colors duration-200
                            ${
                                dark
                                ? "text-gray-200 placeholder-gray-300"
                                : "text-gray-800 placeholder-gray-400"
                            }`
                        }
                    />
                </div>
            </div>
        </Card>
    </div>
  );
}
