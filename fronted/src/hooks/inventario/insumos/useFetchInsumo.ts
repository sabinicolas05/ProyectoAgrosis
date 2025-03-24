import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchInsumo = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("http://127.0.0.1:8000/api/insumo/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // Habilita cookies si el backend las usa
  });

  return response.data; // Retorna los datos obtenidos
};

export const useFetchInsumo = () => {
  return useQuery({
    queryKey: ["insumos"],
    queryFn: fetchInsumo,
    staleTime: 1000 * 60 * 5, // Cache de 5 minutos
    retry: 2, // Reintentar en caso de fallo
  });
};
