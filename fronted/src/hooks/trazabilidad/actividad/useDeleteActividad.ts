import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteActividad = async (id) => {
  const token = localStorage.getItem("token");

  axios.defaults.withCredentials = true;

  await axios.delete(`http://127.0.0.1:8000/api/actividad/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useDeleteActividad = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteActividad,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actividades"] });
    },
  });
};
