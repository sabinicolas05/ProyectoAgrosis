import { useQuery } from "@tanstack/react-query";

const fetchTipoInsumo = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/tipo_insumo/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener un tipo de insumo");
  }

  return response.json();
};

export const useFetchTipoInsumo = () => {
  return useQuery({
    queryKey: ["tipo_insumos"],
    queryFn: fetchTipoInsumo,
  });
};

