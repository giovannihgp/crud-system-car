import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const { dark, toggleTheme } = useTheme();

    const links = [
        { name: "Home", path: "/" },
        { name: "Mais Sobre", path: "/maisSobre" },
        { name: "Marcas", path: "/marcas" },
        { name: "Modelos", path: "/modelos" },
        { name: "Login", path: "/conta" },
        { name: "Logout", path: "/sair" },
    ];

    return (
        <header 
            className={
                dark
                ? "fixed top-0 left-0 w-full bg-zinc-800/85 backdrop-blur-md shadow-sm border-b border-gray-700 z-50 transition-all duration-300"
                : "fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 z-50 transition-all duration-300"
            }
        >
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-16">
                <Link
                    to="/"
                    className={
                        dark 
                        ? "text-2xl font-extrabold tracking-tight text-violet-500 hover:opacity-90 transition-opacity"
                        : "text-2xl font-extrabold tracking-tight text-indigo-600 hover:opacity-90 transition-opacity"
                    }
                >
                    Auto<span className={dark ? "text-gray-400" : "text-gray-500"}>Hub</span>
                </Link>
                <button
                    onClick={toggleTheme}
                    className={
                        dark
                        ? "bg-white text-black px-4 py-2 rounded"
                        : "bg-black text-white px-4 py-2 rounded"
                    }
                >
                    { dark ? "☀️ Light" : "🌙 Dark"}
                </button>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={
                        dark
                        ? "md:hidden text-gray-300 hover:text-violet-500 transition-colors"
                        : "md:hidden text-gray-700 hover:text-indigo-600 transition-colors"
                    }
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <nav className="hidden md:flex gap-12">
                    {links.map((link) => {
                        const active = location.pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`font-semibold text-lg transition-colors ${
                                    active
                                        ? dark
                                            ? "text-violet-500 underline underline-offset-4"
                                            : "text-indigo-600 underline underline-offset-4"
                                        : dark 
                                            ? " text-gray-300 hover:text-violet-500"
                                            : "text-gray-700 hover:text-indigo-600"
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {menuOpen && (
                <div 
                    className={
                        dark
                        ? "md:hidden bg-gray-900 border-t border-gray-700 px-6 py-4 space-y-4 shadow-md"
                        : "md:hidden bg-white  border-t border-gray-200 px-6 py-4 space-y-4 shadow-md"
                    }
                >
                    {links.map((link) => {
                        const active = location.pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setMenuOpen(false)}
                                className={`block text-lg font-medium transition-colors ${
                                    active
                                        ? dark
                                            ? "text-violet-500 underline underline-offset-4"
                                            : "text-indigo-600 underline underline-offset-4"
                                        : dark 
                                            ? "text-gray-300 hover:text-violet-500"
                                            : "text-gray-700 hover:text-indigo-600"
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            )}
        </header>
    );
}
