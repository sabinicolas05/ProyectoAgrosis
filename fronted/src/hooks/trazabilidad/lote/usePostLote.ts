import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Lote {
  nombre: string;
  descripcion: string;
  ubicacion: number;
}

const postLote = async (nuevoLote: Lote) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/lote/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevoLote),
  });

  if (!response.ok) {
    throw new Error("Error al registrar el lote");
  }

  return response.json();
};

export const usePostLote = () => {
  return useMutation({
    mutationFn: postLote, // 🔹 Usa "mutationFn" en vez de pasar la función directamente
    onSuccess: (data) => {
      toast.success(`✅ Lote "${data.nombre}" registrado exitosamente`);
    },
    onError: () => {
      toast.error("❌ Error al registrar el lote");
    },
  });
};
