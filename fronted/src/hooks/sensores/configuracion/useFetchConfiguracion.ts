import { useQuery } from "@tanstack/react-query";

const fetchConfiguraciones = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/configuracion/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las configuraciones");
  }

  return response.json();
};

export const useFetchConfiguraciones = () => {
  return useQuery({
    queryKey: ["configuraciones"],
    queryFn: fetchConfiguraciones,
  });
};
