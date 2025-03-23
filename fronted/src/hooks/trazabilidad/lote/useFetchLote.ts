import { useQuery } from "@tanstack/react-query";

const fetchLotes = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/lote/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los lotes");
  }

  return response.json();
};

export const useFetchLotes = () => {
  return useQuery({
    queryKey: ["lotes"],
    queryFn: fetchLotes,
  });
};
