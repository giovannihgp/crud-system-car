import { Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
    const { dark } = useTheme();
    return (
        <footer 
            className={`mt-24 border-t py-8 transition-colors ${
                dark
                    ? "bg-zinc-800 border-gray-700"
                    : "border-gray-200 bg-gray-50"
            }
        `}
        >
            <div className="max-w-4xl mx-auto text-center">
                <p className={`text-xl font-semibold mb-3 ${dark ? "text-gray-200" : "text-gray-900"}`}>Giovanni Henrique</p>
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="" target="_blank" rel="noopener noreferrer" className={`transition-colors ${dark ? "text-gray-200 hover:text-violet-500" : "text-gray-600 hover:text-indigo-600"}`}>
                        <Github className="w-5 h-5"/>
                    </a>
                    <a href="" target="_blank" rel="noopener noreferrer" className={`transition-colors ${dark ? "text-gray-200 hover:text-violet-500" : "text-gray-600 hover:text-indigo-600"}`}>
                        <Linkedin className="w-5 h-5"/>
                    </a>
                    <a href="" target="_blank" rel="noopener noreferrer" className={`transition-colors ${dark ? "text-gray-200 hover:text-violet-500" : "text-gray-600 hover:text-indigo-600"}`}>
                        <Mail className="w-5 h-5"/>
                    </a>
                </div>
                <p className="tracking-wide">
                    © {new Date().getFullYear()} <span className={`font-semibold ${dark ? "text-violet-500" : "text-indigo-600"}`}>Auto</span><span className={`font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>Hub</span> — Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}