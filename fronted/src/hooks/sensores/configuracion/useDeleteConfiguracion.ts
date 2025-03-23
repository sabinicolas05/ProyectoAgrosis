import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteConfiguracion = async (id: string) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  await axios.delete(`http://127.0.0.1:8000/api/configuracion/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
    },
  });
};

export const useDeleteConfiguracion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteConfiguracion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["configuraciones"] }); // Refresca la lista de configuraciones
    },
  });
};

// Importado en el componente donde se elimina una configuración
