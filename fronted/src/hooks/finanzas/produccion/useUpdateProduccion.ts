import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Función para actualizar una producción
const updateProduccion = async ({ id, ...produccion }: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  
  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  const { data } = await axios.patch( // Cambiar de PUT a PATCH
    `http://127.0.0.1:8000/api/produccion/${id}/`,
    produccion,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

// Hook personalizado para usar la mutación
export const useUpdateProduccion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduccion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["producciones"] }); // Refresca la lista de producciones
    },
  });
};
