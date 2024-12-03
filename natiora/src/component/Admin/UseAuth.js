import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/"); // Redirige si l'utilisateur n'est pas authentifié
    }
  }, [navigate]);
};

export default useAuth;
