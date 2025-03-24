import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Función para obtener un tipo de insumo por su ID
const fetchTipoInsumoById = async (id: string) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  console.log("Token usado en la petición:", token);

  const { data } = await axios.get(`http://127.0.0.1:8000/api/tipo_insumo/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Envía el token en los headers
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const useFetchTipoInsumoById = (id: string) => {
  return useQuery({
    queryKey: ["tipo_insumo", id],
    queryFn: () => fetchTipoInsumoById(id),
    enabled: !!id, // Solo ejecuta la petición si hay un ID
  });
};
