import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Función para eliminar un residuo
const deleteResiduo = async (id: string) => {
  const token = localStorage.getItem("token");

  await axios.delete(`http://127.0.0.1:8000/api/residuo/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Hook personalizado para eliminar un residuo
export const useDeleteResiduo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResiduo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["residuos"] }); // Refresca la lista de residuos
    },
  });
};
