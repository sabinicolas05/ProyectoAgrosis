import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateCultivo = async ({ id, ...cultivo }: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  
  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  const { data } = await axios.patch( // Cambiar de PUT a PATCH
    `http://127.0.0.1:8000/api/cultivo/${id}/`,
    cultivo,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useUpdateCultivo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCultivo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cultivos"] }); // Refresca la lista de cultivos
    },
  });
};
