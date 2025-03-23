import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Función para obtener una plaga por su ID
const fetchPlagaById = async (id: string) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  console.log("Token usado en la petición:", token);

  const { data } = await axios.get(`http://127.0.0.1:8000/api/plaga/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, 
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const useFetchPlagaById = (id: string) => {
  return useQuery({
    queryKey: ["plaga", id],
    queryFn: () => fetchPlagaById(id),
    enabled: !!id, // Solo ejecuta la petición si hay un ID
  });
};
