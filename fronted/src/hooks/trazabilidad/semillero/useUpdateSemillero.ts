import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateSemillero = async ({ id, ...semillero }: any) => {
  const token = localStorage.getItem("token");

  axios.defaults.withCredentials = true;

  const { data } = await axios.patch(
    `http://127.0.0.1:8000/api/semillero/${id}/`,
    semillero,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useUpdateSemillero = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSemillero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["semilleros"] });
    },
  });
};
