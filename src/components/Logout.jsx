import { useEffect } from 'react';
import { useNavigate } from "react-router";


const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const token = auth?.token;
        if (token) {
          const response = await fetch(
            "https://offers-api.digistos.com/api/auth/logout",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            }
          );

          if (!response.ok) {
            const datas = await response.json();
            throw new Error(
              `HTTP error: ${datas.message} (status: ${response.status})`
            );
          }
        } else {
          throw new Error("Missing Token");
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        localStorage.removeItem("auth");
        navigate("/connexion");
      }
    };
    // (1) Appel API pour notifier la déconnexion

    // (2) Suppression du token côté frontend

    // (3) Redirection vers la page de login

    handleLogout();
  }, [navigate]);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;