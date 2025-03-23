import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deletePlaga = async (id: string) => {
  const token = localStorage.getItem("token");

  axios.defaults.withCredentials = true;

  await axios.delete(`http://127.0.0.1:8000/api/plaga/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useDeletePlaga = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlaga,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plagas"] }); // Refresca la lista de plagas
    },
  });
};
