  import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteLote = async (id: string) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  await axios.delete(`http://127.0.0.1:8000/api/lote/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
    },
  });
};

export const useDeleteLote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lotes"] }); // Refresca la lista de lotes
    },
  });
};
