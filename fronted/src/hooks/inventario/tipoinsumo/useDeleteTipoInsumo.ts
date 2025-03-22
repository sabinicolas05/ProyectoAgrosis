import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteTipoInsumo = async (id: string) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  await axios.delete(`http://127.0.0.1:8000/api/tipo_insumo/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
    },
  });
};

export const useDeleteTipoInsumo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTipoInsumo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipo_insumos"] }); // Refresca la lista de tipos de insumo
    },
  });
};
