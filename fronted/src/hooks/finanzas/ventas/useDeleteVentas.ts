import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Función para eliminar una venta
const deleteVenta = async (id: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }

  await axios.delete(`http://127.0.0.1:8000/api/venta/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Hook personalizado para eliminar una venta
export const useDeleteVenta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVenta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] }); // Refresca la lista de ventas
    },
  });
};
