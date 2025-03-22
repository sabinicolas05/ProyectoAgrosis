import { useQuery } from "@tanstack/react-query";

// Función para obtener todos los residuos
const fetchResiduos = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }

  const response = await fetch("http://127.0.0.1:8000/api/residuo/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los residuos");
  }

  return response.json();
};

// Hook personalizado para obtener residuos
export const useFetchResiduos = () => {
  return useQuery({
    queryKey: ["residuos"],
    queryFn: fetchResiduos,
    staleTime: 5000, 
    refetchInterval: 5000, 

  });
};
