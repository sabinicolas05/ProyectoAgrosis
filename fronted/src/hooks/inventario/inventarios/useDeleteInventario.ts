import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Función para eliminar un inventario
const deleteInventario = async (id: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }

  await axios.delete(`http://127.0.0.1:8000/api/inventario/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Hook personalizado para eliminar un inventario
export const useDeleteInventario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInventario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventarios"] }); // Refresca la lista de inventarios
    },
  });
};
