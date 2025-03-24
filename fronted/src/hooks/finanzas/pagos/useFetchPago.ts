import { useQuery } from "@tanstack/react-query";

const fetchPago = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/pago/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener pagos");
  }

  return response.json();
};

export const useFetchPago = () => {
  return useQuery({
    queryKey: ["pagos"],
    queryFn: fetchPago,
    staleTime: 5000, 
    refetchInterval: 5000, 
  });
};
