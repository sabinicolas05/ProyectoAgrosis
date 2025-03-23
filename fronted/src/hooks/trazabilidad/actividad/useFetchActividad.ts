import { useQuery } from "@tanstack/react-query";

const fetchActividad = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/actividad/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las actividades");
  }

  return response.json();
};

export const useFetchActividad = () => {
  return useQuery({
    queryKey: ["actividades"],
    queryFn: fetchActividad,
    staleTime: 5000,
    refetchInterval: 5000,
  });
};
