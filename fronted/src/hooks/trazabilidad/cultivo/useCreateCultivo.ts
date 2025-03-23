import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Cultivo {
  fk_semillero: number;
  fk_especie: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  fecha_siembra: string;
}

const CreateCultivo = async (nuevoCultivo: Cultivo) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/cultivo/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevoCultivo),
  });

  if (!response.ok) {
    throw new Error("Error al registrar el cultivo");
  }

  return response.json();
};

export const useCreateCultivo = () => {
  return useMutation({
    mutationFn: CreateCultivo,
    onSuccess: (data) => {
      toast.success(`✅ Cultivo "${data.nombre}" registrado`);
    },
    onError: () => {
      toast.error("❌ Error al registrar el cultivo");
    },
  });
};
