import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteTipoHerramienta = async (id: string) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  await axios.delete(`http://127.0.0.1:8000/api/tipo_herramienta/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
    },
  });
};

export const useDeleteTipoHerramienta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTipoHerramienta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipo_herramientas"] }); // Refresca la lista de bancales
    },
  });
};
