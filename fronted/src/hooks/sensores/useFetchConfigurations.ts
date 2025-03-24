import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const postConfiguration = async (configData: {
  tipo_cultivo: string;
  tipo_sensor: string;
  valor_min: number;
  valor_max: number;
}) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/configuracion/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(configData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Error al registrar la configuración");
  }

  return response.json();
};

export const usePostConfiguration = () => {
  return useMutation({
    mutationFn: postConfiguration,
    onSuccess: (data) => {
      toast.success(`✅ Sensor "${data.tipo_sensor}" registrado correctamente`);
    },
    onError: (error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
