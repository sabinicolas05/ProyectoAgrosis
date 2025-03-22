import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Interfaz de Residuo
interface Residuo {
  cantidad: number;
  tipo_residuo: string;
  fk_cultivo_id: number;
}

// Función para registrar un Residuo
const createResiduo = async (nuevoResiduo: Residuo) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }

  console.log("📌 Enviando datos:", JSON.stringify(nuevoResiduo));

  const response = await fetch("http://127.0.0.1:8000/api/residuo/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevoResiduo),
  });

  console.log("📌 Código de respuesta:", response.status);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ Detalles del error en la API:", errorData);
    throw new Error(errorData.detail || "Error al registrar residuo");
  }

  return response.json();
};

// Hook personalizado para usar la mutación
export const useCreateResiduo = () => {
  return useMutation({
    mutationFn: createResiduo,
    onSuccess: () => {
      toast.success("✅ Residuo registrado exitosamente");
    },
    onError: (error: Error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
