import { useQuery } from "@tanstack/react-query";

const fetchInventario = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/inventario/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener el inventario");
  }

  return response.json();
};

export const useFetchInventario = () => {
  return useQuery({
    queryKey: ["inventario"],
    queryFn: fetchInventario,
    staleTime: 5000,
    refetchInterval: 5000,
  });
};
