import { useNavigate, Outlet } from "react-router";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
    const navigate = useNavigate();
    const [canAccess, setCanAccess] = useState(false);
    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const isValid = auth && new Date(auth.expiresAt) > new Date();
        if (!isValid) {
            localStorage.removeItem("auth");
            navigate("/connexion");
        } else {
            setCanAccess(true);
        }
    }, [navigate]);
    if (!canAccess) return null; // Tant qu’on n’a pas vérifié, on bloque
    return <Outlet />;
};
export default PrivateRoute;