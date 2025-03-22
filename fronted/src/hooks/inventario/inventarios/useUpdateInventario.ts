import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface InventarioData {
  id: string;
  fk_herramienta?: string;
  fk_insumo?: string;
}

const updateInventario = async ({ id, ...inventario }: InventarioData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }

  const { data } = await axios.patch(
    `http://127.0.0.1:8000/api/inventario/${id}/`,
    inventario,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useUpdateInventario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInventario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventario"] });
    }, 
  });
};
