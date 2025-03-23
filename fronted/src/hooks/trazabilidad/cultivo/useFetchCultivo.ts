import { useQuery } from "@tanstack/react-query";

const FetchCultivo = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/cultivo/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los cultivos"); 
  }

  return response.json();
};

export const useFetchCultivo = () => {
  return useQuery({
    queryKey: ["cultivos"],
    queryFn: FetchCultivo,
    staleTime: 5000, 
    refetchInterval: 5000, 

  });
};
