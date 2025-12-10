import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }: { children: JSX.Element }) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token) return <Navigate to="/conta" replace />;

    const parsed = user ? JSON.parse(user) : null;

    if(!parsed || parsed.role !== 1) {
        return <Navigate to="/" replace />;
    }

    return children;
}