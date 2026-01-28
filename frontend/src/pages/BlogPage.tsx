import Card from "../components/card";
import { useTheme } from "../contexts/ThemeContext";

export default function PageBlog() {
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
                Sobre o projeto
            </p>
            <p className="leading-relaxed">
                Este projeto consiste em um site dinâmico que integra tecnologias modernas no front-end e uma base sólida no back-end. 
            </p>
            <p className="leading-relaxed pb-1">    
                A interface foi desenvolvida do zero utilizando <span className="font-semibold"> React + TypeScript (Vite)</span>, buscando boa performance, organização e experiência de usuário.
            </p>
            <p className="leading-relaxed pt-1">
                No back-end, utilizei uma estrutura em <span className="font-semibold">Laravel (PHP)</span> que já havia sido criada anteriormente, quando eu estava estudando sobre APIs e desenvolvimento server-side. Esse projeto original fazia parte de um sistema de <span className="font-semibold">aluguel de carros</span>, permitindo cadastrar <span className="font-semibold">marcas, modelos, veículos e descrições</span>.
            </p>
            <p className="leading-relaxed pb-1">
                Como essa base já estava funcional e bem estruturada, decidi <span className="font-semibold">reaproveitá-la</span> em vez de criar tudo novamente. Isso tornou o desenvolvimento mais ágil e permitiu focar na evolução do front-end.
            </p>
            <p className="leading-relaxed pt-1">
                Para este site dinâmico, implementei principalmente as funcionalidades de <span className="font-semibold">marcas e modelos</span>, pois estender para veículos e demais informações demandaria mais tempo do que eu tinha disponível no momento. Ainda assim, o projeto reflete bem a integração entre front-end e back-end e consolida meus estudos em <span className="font-semibold">React, TypeScript e Laravel</span>, além do uso de CRUDs completos.
            </p>
        </Card>
    </div>
  );
}
