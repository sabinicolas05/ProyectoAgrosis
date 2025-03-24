import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    identificacion: "",
    email: "",
    password: "",
    confirmPassword: "",
    is_superuser: false, // ✅ Ahora es parte del estado
    is_staff: false,     // ✅ Ahora es parte del estado
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Manejar checkboxes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/usuario/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Ahora se envía con autenticación
        },
        body: JSON.stringify({
          username: formData.username,
          identificacion: formData.identificacion,
          email: formData.email,
          password: formData.password,
          is_superuser: formData.is_superuser, 
          is_staff: formData.is_staff, 
        }),
      });

      if (response.ok) {
        toast.success("Registro exitoso, inicia sesión.");
        navigate("/");
      } else {
        toast.error("Error al registrarse, verifica los datos.");
      }
    } catch (error) {
      toast.error("Error de conexión con el servidor.");
    }
  };

  return { formData, handleChange, handleCheckboxChange, handleSubmit }; // ✅ Ahora sí se incluye `handleCheckboxChange`
};
