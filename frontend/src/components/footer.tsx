import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-gray-200 bg-white py-8 transition-colors">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-xl font-semibold text-gray-800 mb-3">Giovanni Henrique</p>
                
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                        <Github className="w-5 h-5"/>
                    </a>
                    <a href="" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                        <Linkedin className="w-5 h-5"/>
                    </a>
                    <a href="" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                        <Mail className="w-5 h-5"/>
                    </a>
                </div>
                <p className="tracking-wide">
                    © {new Date().getFullYear()} <span className="font-medium text-blue-600">Auto</span><span className="text-gray-500 font-medium">Hub</span> — Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}