import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateInsumo = async ({ id, ...insumo }: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  const { data } = await axios.patch( // Cambiar de PUT a PATCH
    `http://127.0.0.1:8000/api/insumo/${id}/`,
    insumo,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useUpdateInsumo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInsumo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insumos"] }); // Refresca la lista de insumos
    },
  });
};
