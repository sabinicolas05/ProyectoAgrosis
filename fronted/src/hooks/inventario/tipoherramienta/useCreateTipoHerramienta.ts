import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface  TipoHerramienta {
  tipo: string;
  
}

const createTipoHerramienta = async (nuevaTipoHerramienta: TipoHerramienta) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/tipo_herramienta/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevaTipoHerramienta),
  });

  if (!response.ok) {
    throw new Error("Error al registrar tipo  de herramienta");
  }

  return response.json();
};

export const useCreateTipoHerramienta = () => {
  return useMutation({
    mutationFn: createTipoHerramienta,
    onSuccess: () => {
      toast.success("✅tipo de  Herrameinta registrada exitosamente");
    },
    onError: () => {
      toast.error("❌ Error al registrar un tipo de herramienta");
    },
  });
};
