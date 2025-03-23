import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updatePlaga = async ({ id, ...plaga }: any) => {
  const token = localStorage.getItem("token");

  axios.defaults.withCredentials = true;

  const { data } = await axios.patch(
    `http://127.0.0.1:8000/api/plaga/${id}/`,
    plaga,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useUpdatePlaga = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePlaga,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plagas"] });
    },
  });
};
