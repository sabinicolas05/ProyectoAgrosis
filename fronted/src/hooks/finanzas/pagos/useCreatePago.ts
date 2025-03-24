import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Interfaz para el pago
interface Pago {
  cantidad: number;
  fecha: Date;
  fk_asignacion_actividad_id: number | null;
}

// Función para registrar un pago
const createPago = async (nuevoPago: Pago) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }

  console.log("📌 Enviando datos:", JSON.stringify(nuevoPago));

  const response = await fetch("http://127.0.0.1:8000/api/pago/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevoPago),
  });

  console.log("📌 Código de respuesta:", response.status);

  if (!response.ok) {
    const errorData = await response.json(); // Captura la respuesta del backend
    console.error("❌ Error en la API:", errorData);
    throw new Error(errorData.detail || "Error al registrar el pago");
  }

  return response.json();
};

// Hook personalizado para usar la mutación
export const useCreatePago = () => {
  return useMutation({
    mutationFn: createPago,
    onSuccess: () => {
      toast.success("✅ Pago registrado exitosamente");
    },
    onError: (error: Error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
