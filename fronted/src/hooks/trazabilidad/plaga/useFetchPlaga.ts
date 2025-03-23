import { useQuery } from "@tanstack/react-query";

const fetchPlagas = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/plaga/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las plagas");
  }

  return response.json();
};

export const useFetchPlagas = () => {
  return useQuery({
    queryKey: ["plagas"],
    queryFn: fetchPlagas,
    staleTime: 5000, 
    refetchInterval: 5000, 
  });
};
