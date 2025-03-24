import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Función para obtener un insumo por su ID
const fetchInsumoById = async (id: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }

  const { data } = await axios.get(`http://127.0.0.1:8000/api/insumo/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // Habilita el uso de cookies si es necesario
  });

  return data;
};

export const useFetchInsumoById = (id?: string) => {
  return useQuery({
    queryKey: ["insumo", id],
    queryFn: () => fetchInsumoById(id!),
    enabled: Boolean(id), // Solo ejecuta la consulta si hay un ID válido
    retry: 2, // Intenta dos veces en caso de fallo
    staleTime: 1000 * 60 * 5, // Cachea la respuesta por 5 minutos
  });
};
