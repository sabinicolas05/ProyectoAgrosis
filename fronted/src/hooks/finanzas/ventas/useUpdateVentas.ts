import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Función para actualizar una venta
const updateVenta = async ({ id, ...venta }: any) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.patch(
    `http://127.0.0.1:8000/api/venta/${id}/`,
    venta,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

// Hook personalizado para actualizar una venta
export const useUpdateVenta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVenta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] }); // Refresca la lista de ventas
    },
  });
};
