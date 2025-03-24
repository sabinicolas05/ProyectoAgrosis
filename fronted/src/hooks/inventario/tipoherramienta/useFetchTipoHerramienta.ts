import { useQuery } from "@tanstack/react-query";

const fetchTipoHerramienta = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/tipo_herramienta/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener  un tipo de herramienta");
  }

  return response.json();
};

export const useFetchTipoHerramienta = () => {
  return useQuery({
    queryKey: ["tipo_herramientas"],
    queryFn: fetchTipoHerramienta,
  });
};
