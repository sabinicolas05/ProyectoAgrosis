import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createConfiguracion = async (configuracion: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  const { data } = await axios.post(
    "http://127.0.0.1:8000/api/configuracion/",
    configuracion,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useCreateConfiguracion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createConfiguracion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["configuraciones"] }); // Refresca la lista de configuraciones
    },
  });
};
