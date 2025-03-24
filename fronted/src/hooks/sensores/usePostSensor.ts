import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Sensor {
  fk_bancal: number;
  fk_tipo_sensor: number;
  fk_configuracion: number;
  fk_cultivo: number;
  medicion: number;
}

const postSensor = async (nuevoSensor: Sensor) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/sensor/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevoSensor),
  });

  if (!response.ok) {
    throw new Error("Error al registrar el sensor");
  }

  return response.json();
};

export const usePostSensor = () => {
  return useMutation({
    mutationFn: postSensor,
    onSuccess: (data) => {
      toast.success(`✅ Sensor registrado con medición ${data.medicion}`);
    },
    onError: async (error: any) => {
      const errorResponse = await error.response?.json?.();
      console.error("❌ Error detallado:", errorResponse || error.message);
      toast.error(`❌ Error: ${errorResponse?.message || "No se pudo registrar el sensor"}`);
    },
      });
};
