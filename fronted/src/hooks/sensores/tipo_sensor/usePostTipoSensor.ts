import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface TipoSensor {
  nombre: string;
  tipo: string;
}

const createTipoSensor = async (nuevoTipoSensor: TipoSensor) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/tiposensor/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevoTipoSensor),
  });

  if (!response.ok) {
    throw new Error("Error al registrar el Tipo de Sensor");
  }

  return response.json();
};

export const usecreateTipoSensor = () => {
  return useMutation({
    mutationFn: createTipoSensor,
    onSuccess: () => {
      toast.success("✅ Tipo de Sensor registrado exitosamente");
    },
    onError: () => {
      toast.error("❌ Error al registrar el Tipo de Sensor");
    },
  });
};
