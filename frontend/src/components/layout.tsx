import { Outlet } from "react-router-dom";
import Header from "./header";
import MainContent from "./MainContent";
import Footer from "./footer";
import { useTheme } from "../contexts/ThemeContext";

export default function LayoutMain() {
    const { dark } = useTheme();

    return (
        <div
            className={
                dark
                ? "min-h-screen flex flex-col bg-zinc-900 text-white transition-colors"
                : "min-h-screen flex flex-col bg-gray-100 text-gray-900 transition-colors"
            }
        >
            <Header />

            <MainContent
                variant="primary"
                className="min-h-screen flex flex-col "
            >
                <Outlet />
            </MainContent>
            <Footer />
        </div>
    );
}