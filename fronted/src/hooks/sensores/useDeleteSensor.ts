import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteSensor = async (id: string) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  await axios.delete(`http://127.0.0.1:8000/api/sensor/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
    },
  });
};

export const useDeleteSensor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSensor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sensores"] }); // Refresca la lista de sensores
    },
  });
};

// Importado en el componente donde se elimina un sensor
