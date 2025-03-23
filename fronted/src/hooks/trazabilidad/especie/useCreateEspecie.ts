import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Especie {
  fk_tipo_especie: number | null;
  nombre: string;
}

const createEspecie = async (nuevaEspecie: Especie) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/especie/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevaEspecie),
  });

  if (!response.ok) {
    throw new Error("Error al registrar la especie");
  }

  return response.json();
};

export const useCreateEspecie = () => {
  return useMutation({
    mutationFn: createEspecie,
    onSuccess: () => {
      toast.success("✅ Especie registrada exitosamente");
    },
    onError: () => {
      toast.error("❌ Error al registrar la especie");
    },
  });
};
