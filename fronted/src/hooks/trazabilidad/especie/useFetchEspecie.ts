import { useQuery } from "@tanstack/react-query";

const fetchEspecie = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/especie/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las especies");
  }

  return response.json();
};

export const useFetchEspecie = () => {
  return useQuery({
    queryKey: ["especies"],
    queryFn: fetchEspecie,
    staleTime: 5000, 
    refetchInterval: 5000, 
  });
};
