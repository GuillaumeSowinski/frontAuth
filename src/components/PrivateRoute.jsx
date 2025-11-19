import { useNavigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice.js";

const PrivateRoute = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [canAccess, setCanAccess] = useState(false);

    useEffect(() => {
        const isValid = auth.token && new Date(auth.expiresAt) > new Date();

        if (!isValid) {
            dispatch(logout());
            navigate("/connexion");
        } else {
            setCanAccess(true);
        }
    }, [auth, navigate, dispatch]);
        if (!canAccess) return null;
        return <Outlet />;
    };

export default PrivateRoute;