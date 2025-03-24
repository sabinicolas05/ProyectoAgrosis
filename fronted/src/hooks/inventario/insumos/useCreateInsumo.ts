import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Insumo {
  cantidad: number;
  precio: number;
  tipo_empacado: string;
  tipo: string;
  unidadMedida: string;
  fk_tipo_insumo: number; // Ajustado para coincidir con el modelo en Django
}

const createInsumo = async (nuevoInsumo: Insumo) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/insumo/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevoInsumo),
  });

  if (!response.ok) {
    throw new Error("Error al registrar insumo");
  }

  return response.json();
};

export const useCreateInsumo = () => {
  return useMutation({
    mutationFn: createInsumo,
    onSuccess: () => {
      toast.success("✅ Insumo registrado exitosamente");
    },
    onError: () => {
      toast.error("❌ Error al registrar el insumo");
    },
  });
};
