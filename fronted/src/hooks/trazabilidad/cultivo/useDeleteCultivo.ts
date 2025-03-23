import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteCultivo = async (id) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  await axios.delete(`http://127.0.0.1:8000/api/cultivo/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
    },
  });
};

export const useDeleteCultivo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCultivo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cultivos"] }); // Refresca la lista de cultivos
    },
  });
};

// Importado en el componente donde se elimina un cultivo
