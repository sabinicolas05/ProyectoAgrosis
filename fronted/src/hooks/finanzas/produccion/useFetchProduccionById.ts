import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Función para obtener una producción por su ID
const fetchProduccionById = async (id: string) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  console.log("Token usado en la petición:", token);

  const { data } = await axios.get(`http://127.0.0.1:8000/api/produccion/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Envía el token en los headers
      "Content-Type": "application/json",
    },
  });

  return data;
};

// Hook personalizado para usar la query
export const useFetchProduccionById = (id: string) => {
  return useQuery({
    queryKey: ["produccion", id],
    queryFn: () => fetchProduccionById(id),
    enabled: !!id, // Solo ejecuta la petición si hay un ID
  });
};
