import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function LogoutPage() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout().finally(() => navigate("/conta"));
    }, []);

return null;
}
