import { useQuery } from "@tanstack/react-query";

// Función para obtener todas las ventas
const fetchVentas = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }

  const response = await fetch("http://127.0.0.1:8000/api/venta/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las ventas");
  }

  return response.json();
};

// Hook personalizado para obtener ventas
export const useFetchVentas = () => {
  return useQuery({
    queryKey: ["ventas"],
    queryFn: fetchVentas,
    staleTime: 5000, 
    refetchInterval: 5000, 

  });
};
