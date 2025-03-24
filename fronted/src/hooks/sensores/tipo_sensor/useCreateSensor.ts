import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createSensor = async (sensor: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  const { data } = await axios.post(
    "http://127.0.0.1:8000/api/sensor/",
    sensor,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useCreateSensor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSensor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sensores"] }); // Refresca la lista de sensores
    },
  });
};
