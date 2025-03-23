import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteTipoPlaga = async (id: string) => {
  const token = localStorage.getItem("token");

  await axios.delete(`http://127.0.0.1:8000/api/tipo_plaga/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useDeleteTipoPlaga = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTipoPlaga,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipo_plagas"] });
    },
  });
};
