import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface TipoEspecie {
  tipo: string;
  descripcion: string;
  tiempo_crecimiento: number;
}

const createTipoEspecie = async (nuevoTipoEspecie: TipoEspecie) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/tipo_especie/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevoTipoEspecie),
  });

  if (!response.ok) {
    throw new Error("Error al registrar el tipo de especie");
  }

  return response.json();
};

export const useCreateTipoEspecie = () => {
  return useMutation({
    mutationFn: createTipoEspecie,
    onSuccess: () => {
      toast.success("✅ Tipo de especie registrado exitosamente");
    },
    onError: () => {
      toast.error("❌ Error al registrar el tipo de especie");
    },
  });
};
