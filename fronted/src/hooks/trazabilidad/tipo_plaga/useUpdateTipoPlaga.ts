import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateTipoPlaga = async ({ id, ...tipoPlaga }: { id: string; tipo: string; descripcion: string }) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.patch(`http://127.0.0.1:8000/api/tipo_plaga/${id}/`, tipoPlaga, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const useUpdateTipoPlaga = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTipoPlaga,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipo_plagas"] });
    },
  });
};
