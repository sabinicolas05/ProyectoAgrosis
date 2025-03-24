import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateTipoInsumo = async ({ id, ...tipoInsumo }: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  const { data } = await axios.patch( // Cambiar de PUT a PATCH
    `http://127.0.0.1:8000/api/tipo_insumo/${id}/`,
    tipoInsumo,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useUpdateTipoInsumo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTipoInsumo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipo_insumos"] }); // Refresca la lista de tipos de insumo
    },
  });
};
