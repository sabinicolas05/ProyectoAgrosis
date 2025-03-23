import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateLote = async ({ id, ...lote }: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  
  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  const { data } = await axios.patch( // Cambiar de PUT a PATCH
    `http://127.0.0.1:8000/api/lote/${id}/`,
    lote,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useUpdateLote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lotes"] }); // Refresca la lista de lotes
    },
  });
};

// Importado en src/pages/EditarLote.tsx
