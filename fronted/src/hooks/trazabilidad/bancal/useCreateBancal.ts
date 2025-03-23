import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Bancal {
  nombre: string;
  descripcion: string;
  fk_lote: number | null;
  fk_cultivo: number | null;
  ubicacion: string;
}

const createBancal = async (nuevoBancal: Bancal) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/bancal/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevoBancal),
  });

  if (!response.ok) {
    throw new Error("Error al registrar el bancal");
  }

  return response.json();
};

export const useCreateBancal = () => {
  return useMutation({
    mutationFn: createBancal,
    onSuccess: () => {
      toast.success("✅ Bancal registrado exitosamente");
    },
    onError: () => {
      toast.error("❌ Error al registrar el bancal");
    },
  });
};
