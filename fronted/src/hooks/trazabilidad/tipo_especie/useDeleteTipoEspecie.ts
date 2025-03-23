import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteTipoEspecie = async (id: string) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  await axios.delete(`http://127.0.0.1:8000/api/tipo_especie/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
    },
  });
};

export const useDeleteTipoEspecie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTipoEspecie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipos-especie"] }); // Refresca la lista de tipos de especie
    },
  });
};
