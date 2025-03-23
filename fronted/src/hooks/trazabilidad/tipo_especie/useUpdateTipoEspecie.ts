import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateTipoEspecie = async ({ id, ...tipoEspecie }: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  const { data } = await axios.patch( // Cambiar de PUT a PATCH
    `http://127.0.0.1:8000/api/tipo_especie/${id}/`,
    tipoEspecie,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useUpdateTipoEspecie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTipoEspecie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipos-especie"] }); // Refresca la lista de tipos de especie
    },
  });
};

// Importado en src/pages/tipoEspecie/EditarTipoEspecie.tsx
