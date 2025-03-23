import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Función para obtener un cultivo por su ID
const fetchCultivoById = async (id: string) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  console.log("Token usado en la petición:", token);

  const { data } = await axios.get(`http://127.0.0.1:8000/api/cultivo/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Envía el token en los headers
      "Content-Type": "application/json",
    },
  });

  return data;
};

// Hook personalizado para usar en React
export const useFetchCultivoById = (id: string) => {
  return useQuery({
    queryKey: ["cultivo", id],
    queryFn: () => fetchCultivoById(id),
    enabled: !!id, // Solo ejecuta la petición si hay un ID
  });
};
