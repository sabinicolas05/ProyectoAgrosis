import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateEspecie = async ({ id, ...especie }: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  
  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  const { data } = await axios.patch( // Cambiar de PUT a PATCH
    `http://127.0.0.1:8000/api/especie/${id}/`,
    especie,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useUpdateEspecie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEspecie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["especies"] }); // Refresca la lista de especies
    },
  });
};

// Importado en src/pages/EditarEspecie.tsx
