import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Interfaz de la Producción (según los campos de la tabla)
interface Produccion {
  nombre: string;
  precio: number;
  contenido: string;
  unidades: number;
  fk_cultivo_id: number;
  fk_usuario_id: number;
}

// Función para registrar una Producción
const createProduccion = async (nuevaProduccion: Produccion) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }

  // Conversión de tipos (si es necesario)
  nuevaProduccion.precio = parseFloat(nuevaProduccion.precio.toString());
  nuevaProduccion.unidades = parseInt(nuevaProduccion.unidades.toString());
  nuevaProduccion.fk_cultivo_id = parseInt(nuevaProduccion.fk_cultivo_id.toString());
  nuevaProduccion.fk_usuario_id = parseInt(nuevaProduccion.fk_usuario_id.toString());

  console.log("📌 Enviando datos:", JSON.stringify(nuevaProduccion));

  const response = await fetch("http://127.0.0.1:8000/api/produccion/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevaProduccion),
  });

  console.log("📌 Código de respuesta:", response.status);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ Detalles del error en la API:", errorData);
    throw new Error(errorData.detail || "Error al registrar producción");
  }

  return response.json();
};

// Hook personalizado para manejar la mutación
export const useCreateProduccion = () => {
  return useMutation({
    mutationFn: createProduccion,
    onSuccess: () => {
      toast.success("✅ Producción registrada exitosamente");
    },
    onError: (error: Error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
