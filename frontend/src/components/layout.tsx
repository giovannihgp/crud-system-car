import { Outlet } from "react-router-dom";
import Header from "./header";
import MainContent from "./main";
import Footer from "./footer";

export default function LayoutMain() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
            <Header />

            <MainContent variant="primary" className="min-h-screen flex flex-col">
                <Outlet />
            </MainContent>
            <Footer />
        </div>
    );
}