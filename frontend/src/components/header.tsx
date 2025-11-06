import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { name: "Home", path: "/" },
        { name: "Notícias", path: "/noticias" },
        { name: "Marcas", path: "/marcas" },
        { name: "Modelos", path: "/modelos" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 z-50 transition-all duration-300">
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-16">
                <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-purple-400 hover:opacity-90 transition-opacity"
                >
                    Auto<span className="text-gray-500 dark:text-gray-400">Hub</span>
                </Link>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
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
                                        ? "text-blue-600 dark:text-purple-400 underline underline-offset-4"
                                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-400"
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 space-y-4 shadow-md">
                    {links.map((link) => {
                        const active = location.pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setMenuOpen(false)}
                                className={`block text-lg font-medium transition-colors ${
                                    active
                                        ? "text-blue-600 dark:text-purple-400 underline underline-offset-4"
                                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-400"
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
