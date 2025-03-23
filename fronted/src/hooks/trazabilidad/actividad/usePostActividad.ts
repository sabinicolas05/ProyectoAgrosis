import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Actividad {
  fk_usuario: number;
  fk_bancal: number;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: boolean;
}

const postActividad = async (nuevaActividad: Actividad) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/actividad/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevaActividad),
  });

  if (!response.ok) {
    throw new Error("Error al registrar la actividad");
  }

  return response.json();
};

export const usePostActividad = () => {
  return useMutation({
    mutationFn: postActividad,
    onSuccess: (data) => {
      toast.success(`✅ Actividad "${data.descripcion}" registrada`);
    },
    onError: () => {
      toast.error("❌ Error al registrar la actividad");
    },
  });
};
