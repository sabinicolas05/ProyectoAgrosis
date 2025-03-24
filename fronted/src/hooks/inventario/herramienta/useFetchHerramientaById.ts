import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Función para obtener un bancal por su ID
const fetchHerramientaById = async (id: string) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  console.log("Token usado en la petición:", token);

  const { data } = await axios.get(`http://127.0.0.1:8000/api/herramienta/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Envía el token en los headers
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const useFetchHerramientaById = (id: string) => {
  return useQuery({
    queryKey: ["bancal", id],
    queryFn: () => fetchHerramientaById(id),
    enabled: !!id, // Solo ejecuta la petición si hay un ID
  });
};

// Importado en src/pages/EditarBancal.tsx
