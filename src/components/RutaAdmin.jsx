import { Navigate } from "react-router-dom";
import { useApp } from "../context/Contexto";

export default function RutaAdmin({ children }) {
    const { currentUser } = useApp();

    if (!currentUser?.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}