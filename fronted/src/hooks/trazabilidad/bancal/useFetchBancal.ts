import { useQuery } from "@tanstack/react-query";

const fetchBancales = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/bancal/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los bancales");
  }

  return response.json();
};

export const useFetchBancales = () => {
  return useQuery({
    queryKey: ["bancales"],
    queryFn: fetchBancales,
  });
};
