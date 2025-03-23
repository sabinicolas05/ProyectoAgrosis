import { useQuery } from "@tanstack/react-query";

const fetchTipoSensores = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/tiposensor/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los tipos de sensores"); 
  }

  return response.json();
};

export const useFetchTipoSensores = () => {
  return useQuery({
    queryKey: ["tipoSensores"],
    queryFn: fetchTipoSensores,
  });
};
