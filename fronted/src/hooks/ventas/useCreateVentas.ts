
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Interfaz de Venta (según el modelo de Django)
interface Venta {
  fk_produccion: number; // Referencia a la producción
  precio_unitario: number;
  cantidad_produccion: number;
  fecha: string; // Fecha en formato "YYYY-MM-DD"
}

// Función para registrar una Venta
const createVenta = async (nuevaVenta: Venta) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }

  console.log("📌 Enviando datos:", JSON.stringify(nuevaVenta));

  const response = await fetch("http://127.0.0.1:8000/api/venta/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevaVenta),
  });

  console.log("📌 Código de respuesta:", response.status);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ Detalles del error en la API:", errorData);
    throw new Error(errorData.detail || "Error al registrar venta");
  }

  return response.json();
};

// Hook personalizado para usar la mutación
export const useCreateVenta = () => {
  return useMutation({
    mutationFn: createVenta,
    onSuccess: () => {
      toast.success("✅ Venta registrada exitosamente");
    },
    onError: (error: Error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
