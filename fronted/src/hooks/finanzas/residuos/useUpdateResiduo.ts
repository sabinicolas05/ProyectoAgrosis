import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Función para actualizar un residuo
const updateResiduo = async ({ id, ...residuo }: any) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.patch(
    `http://127.0.0.1:8000/api/residuo/${id}/`,
    residuo,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

// Hook personalizado para actualizar un residuo
export const useUpdateResiduo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateResiduo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["residuos"] }); // Refresca la lista de residuos
    },
  });
};
