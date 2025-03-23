import { useQuery } from "@tanstack/react-query";

const fetchSemilleros = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/semillero/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los semilleros"); 
  }

  return response.json();
};

export const useFetchSemilleros = () => {
  return useQuery({
    queryKey: ["semilleros"],
    queryFn: fetchSemilleros,
  });
};
