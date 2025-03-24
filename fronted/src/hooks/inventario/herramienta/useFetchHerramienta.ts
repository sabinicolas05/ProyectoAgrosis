import { useQuery } from "@tanstack/react-query";

const fetchHerramienta = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/herramienta/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener herramientas");
  }

  return response.json();
};

export const useFetchHerramienta = () => {
  return useQuery({
    queryKey: ["herramientas"],
    queryFn: fetchHerramienta,
    refetchInterval: 5000, 
  });
};
