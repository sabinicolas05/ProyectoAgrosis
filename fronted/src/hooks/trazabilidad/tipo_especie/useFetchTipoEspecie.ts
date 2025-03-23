import { useQuery } from "@tanstack/react-query";

const fetchTipoEspecie = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/tipo_especie/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los tipos de especie");
  }

  return response.json();
};

export const useFetchTipoEspecie = () => {
  return useQuery({
    queryKey: ["tipos-especie"],
    queryFn: fetchTipoEspecie,
    staleTime: 1000, // Se vuelve "viejo" en 1s
    refetchInterval: 5000, // Hace refetch cada 5s automáticamente
  });
};
