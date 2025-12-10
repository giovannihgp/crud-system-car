import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarcasPage from './pages/MarcasPage';
import ModelosPage from './pages/ModelosPage';
import LayoutMain from './components/layout';
import PageHome from './pages/page-home';
import PageBlog from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutMain />}>

            <Route index element={<PageHome />} />
            <Route path="maisSobre" element={<PageBlog />} />

            <Route 
              path="marcas" 
              element={
                <PrivateRoute>
                  <MarcasPage />
                </PrivateRoute>
              } 
            />

            <Route 
              path="modelos" 
              element={
                <PrivateRoute>
                  <ModelosPage />
                </PrivateRoute>
              } 
            />
            
            <Route path="conta" element={<LoginPage />} />
            <Route path="sair" element={<LogoutPage />} />
            <Route path="*" element={<PageHome />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}