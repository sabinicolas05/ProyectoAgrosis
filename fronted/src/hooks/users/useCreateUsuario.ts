import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createUsuario = async (usuario: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  const { data } = await axios.post(
    "http://127.0.0.1:8000/api/usuario/",
    usuario,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useCreateUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] }); // Refresca la lista de usuarios
    },
  });
};
