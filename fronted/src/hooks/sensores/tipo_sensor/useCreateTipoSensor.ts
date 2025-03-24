import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createTipoSensor = async (tipoSensor: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  const { data } = await axios.post(
    "http://127.0.0.1:8000/api/tiposensor/",
    tipoSensor,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useCreateTipoSensor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTipoSensor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipoSensores"] }); // Refresca la lista de tipos de sensores
    },
  });
};
