import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Función para obtener un residuo por su ID
const fetchResiduoById = async (id: string) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(`http://127.0.0.1:8000/api/residuo/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};

// Hook personalizado para obtener un residuo por ID
export const useFetchResiduoById = (id: string) => {
  return useQuery({
    queryKey: ["residuo", id],
    queryFn: () => fetchResiduoById(id),
    enabled: !!id, // Solo ejecuta la query si el ID es válido
  });
};
