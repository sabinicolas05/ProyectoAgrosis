import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deletePago = async (id: string) => {
  const token = localStorage.getItem("token");

  axios.defaults.withCredentials = true;

  await axios.delete(`http://127.0.0.1:8000/api/pago/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useDeletePago = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePago,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pagos"] });
    },
  });
};
