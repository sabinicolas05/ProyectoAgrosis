import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Función para eliminar una producción
const deleteProduccion = async (id: string) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  await axios.delete(`http://127.0.0.1:8000/api/produccion/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
    },
  });
};

// Hook personalizado para usar la mutación
export const useDeleteProduccion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduccion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["producciones"] }); // Refresca la lista de producciones
    },
  });
};
