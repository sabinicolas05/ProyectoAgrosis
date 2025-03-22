import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Iniciar sesión es requerido"); // 🔹 Mostrar la notificación
      navigate("/", { replace: true }); // 🔹 Redirigir a login
    }
  }, [navigate]);
};

export default useAuth;
