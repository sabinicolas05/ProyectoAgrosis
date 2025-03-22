import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Inventario {
  fk_herramienta: number | null;
  fk_insumo: number | null;
}

const createInventario = async (nuevoInventario: Inventario) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/inventario/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevoInventario),
  });

  if (!response.ok) {
    throw new Error("Error al registrar inventario");
  }

  return response.json();
};

export const useCreateInventario = () => {
  return useMutation({
    mutationFn: createInventario,
    onSuccess: () => {
      toast.success("✅ Inventario registrado exitosamente");
    },
    onError: () => {
      toast.error("❌ Error al registrar inventario");
    },
  });
};
