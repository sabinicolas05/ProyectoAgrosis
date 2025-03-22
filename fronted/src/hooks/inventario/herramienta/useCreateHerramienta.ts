import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Interfaz de la herramienta (verifica que estos nombres coincidan con los del backend)
interface Herramienta {
  nombre: string;
  unidades: number;
  precioCU: number;
  estado: string;
  fk_tipo_herramienta: number | null;
}

// Función para registrar una herramienta
const createHerramienta = async (nuevaHerramienta: Herramienta) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }

  console.log("📌 Enviando datos:", JSON.stringify(nuevaHerramienta));

  const response = await fetch("http://127.0.0.1:8000/api/herramienta/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevaHerramienta),
  });

  console.log("📌 Código de respuesta:", response.status);

  if (!response.ok) {
    const errorData = await response.json(); // Captura la respuesta del backend
    console.error("❌ Error en la API:", errorData);
    throw new Error(errorData.detail || "Error al registrar herramienta");
  }

  return response.json();
};

// Hook personalizado para usar la mutación
export const useCreateHerramienta = () => {
  return useMutation({
    mutationFn: createHerramienta,
    onSuccess: () => {
      toast.success("✅ Herramienta registrada exitosamente");
    },
    onError: (error: Error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
