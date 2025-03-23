import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createTipoPlaga = async (nuevoTipoPlaga: { tipo: string; descripcion: string }) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.post("http://127.0.0.1:8000/api/tipo_plaga/", nuevoTipoPlaga, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const useCreateTipoPlaga = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTipoPlaga,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipo_plagas"] });
    },
  });
};
