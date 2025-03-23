import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateConfiguracion = async ({ id, ...configuracion }: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  
  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  const { data } = await axios.patch(
    `http://127.0.0.1:8000/api/configuracion/${id}/`,
    configuracion,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useUpdateConfiguracion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateConfiguracion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["configuraciones"] }); // Refresca la lista de configuraciones
    },
  });
};

// Importado en src/pages/EditarConfiguracion.tsx
