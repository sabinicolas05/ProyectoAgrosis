import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateTipoHerramienta = async ({ id, ...bancal }: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  
  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  const { data } = await axios.patch( // Cambiar de PUT a PATCH
    `http://127.0.0.1:8000/api/tipo_herramienta/${id}/`,
    bancal,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useUpdateTipoHerramienta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTipoHerramienta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipo_herramientas"] }); // Refresca la lista de bancales
    },
  });
};

// Importado en src/pages/EditarBancal.tsx
