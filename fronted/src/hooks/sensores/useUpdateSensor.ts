import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateSensor = async ({ id, ...sensor }: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  
  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  const { data } = await axios.patch( // Cambiar de PUT a PATCH
    `http://127.0.0.1:8000/api/sensor/${id}/`,
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

export const useUpdateSensor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSensor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sensores"] }); // Refresca la lista de sensores
    },
  });
};

// Importado en src/pages/EditarSensor.tsx
