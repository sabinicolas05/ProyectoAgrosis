import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updatePago = async ({ id, ...pago }: any) => {
  const token = localStorage.getItem("token");

  axios.defaults.withCredentials = true;

  const { data } = await axios.patch(
    `http://127.0.0.1:8000/api/pago/${id}/`,
    pago,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useUpdatePago = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePago,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pagos"] }); // Refresca la lista de pagos
    },
  });
};
