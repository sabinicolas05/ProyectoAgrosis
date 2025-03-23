import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Plaga {
  fk_tipo_plaga: number | null;
  nombre: string;
}

const createPlaga = async (nuevaPlaga: Plaga) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/plaga/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevaPlaga),
  });

  if (!response.ok) {
    throw new Error("Error al registrar la plaga");
  }

  return response.json();
};

export const useCreatePlaga = () => {
  return useMutation({
    mutationFn: createPlaga,
    onSuccess: () => {
      toast.success("✅ Plaga registrada exitosamente");
    },
    onError: () => {
      toast.error("❌ Error al registrar la plaga");
    },
  });
};
