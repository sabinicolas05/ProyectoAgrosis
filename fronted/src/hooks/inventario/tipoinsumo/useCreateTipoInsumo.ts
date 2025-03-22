import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface TipoInsumo {
  tipo: string;
}

const createTipoInsumo = async (nuevoTipoInsumo: TipoInsumo) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/tipo_insumo/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevoTipoInsumo),
  });

  if (!response.ok) {
    throw new Error("Error al registrar tipo de insumo");
  }

  return response.json();
};

export const useCreateTipoInsumo = () => {
  return useMutation({
    mutationFn: createTipoInsumo,
    onSuccess: () => {
      toast.success("✅ Tipo de Insumo registrado exitosamente");
    },
    onError: () => {
      toast.error("❌ Error al registrar un tipo de insumo");
    },
  });
};
