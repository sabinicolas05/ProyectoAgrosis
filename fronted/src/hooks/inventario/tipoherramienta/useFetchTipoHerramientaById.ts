import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Función para obtener un tipo de herramienta por su ID
const fetchTipoHerramientaById = async (id: string) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  console.log("Token usado en la petición:", token);

  const { data } = await axios.get(`http://127.0.0.1:8000/api/tipo_herramienta/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Envía el token en los headers
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const useFetchTipoHerramientaById = (id: string) => {
  return useQuery({
    queryKey: ["tipoHerramienta", id], // Se cambia "bancal" por "tipoHerramienta"
    queryFn: () => fetchTipoHerramientaById(id),
    enabled: !!id, // Solo ejecuta la petición si hay un ID válido
  });
};
