import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const deleteInsumo = async (id: number) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  try {
    await axios.delete(`http://127.0.0.1:8000/api/insumo/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
      },
    });

    toast.success("✅ Insumo eliminado correctamente");
  } catch (error) {
    console.error("❌ Error al eliminar el insumo:", error);
    toast.error("❌ Error al eliminar el insumo");
    throw error; // React Query manejará este error
  }
};

export const useDeleteInsumo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInsumo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insumos"] }); // Refresca la lista de insumos
    },
  });
};
