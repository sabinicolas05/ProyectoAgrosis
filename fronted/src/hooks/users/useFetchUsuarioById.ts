import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//Trae usuarios
const fetchUsuarioById = async (id: string) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/api/usuario/${id}/`);
  return data;
};

export const useFetchUsuarioById = (id: string) => {
  return useQuery({
    queryKey: ["usuario", id],
    queryFn: () => fetchUsuarioById(id),
    enabled: !!id, // Solo ejecuta la petición si hay un ID
  });
};

//Importado en src\pages\EditarUsuario.tsx

