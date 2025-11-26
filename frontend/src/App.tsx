import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarcasPage from './pages/MarcasPage';
import ModelosPage from './pages/ModelosPage';
import LayoutMain from './components/layout';
import PageHome from './pages/page-home';
import PageBlog from "./pages/BlogPage";
import AuthPage from "./pages/AuthenticationPage";

export default function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutMain />}>
            <Route index element={<PageHome />} />
            <Route path="maisSobre" element={<PageBlog />} />
            <Route path="marcas" element={<MarcasPage />} />
            <Route path="modelos" element={<ModelosPage />} />
            <Route path="conta" element={<AuthPage />} />
            <Route path="*" element={<PageHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}