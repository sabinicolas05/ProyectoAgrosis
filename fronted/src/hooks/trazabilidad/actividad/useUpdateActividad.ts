import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateActividad = async ({ id, ...actividad }: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  
  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  const { data } = await axios.patch(
    `http://127.0.0.1:8000/api/actividad/${id}/`,
    actividad,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useUpdateActividad = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateActividad,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actividades"] }); // Refresca la lista de actividades
    },
  });
};
