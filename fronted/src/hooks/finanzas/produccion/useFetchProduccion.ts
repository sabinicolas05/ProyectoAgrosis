import { useQuery } from "@tanstack/react-query";

// Función para obtener producciones
const fetchProduccion = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/produccion/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener producciones");
  }

  return response.json();
};

// Hook personalizado para usar la query
export const useFetchProduccion = () => {
  return useQuery({
    queryKey: ["producciones"],
    queryFn: fetchProduccion,
    staleTime: 5000, 
    refetchInterval: 5000, 

  });
};
