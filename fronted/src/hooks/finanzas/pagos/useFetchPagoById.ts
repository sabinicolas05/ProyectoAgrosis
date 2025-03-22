import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPagoById = async (id: string) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(`http://127.0.0.1:8000/api/pago/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const useFetchPagoById = (id: string) => {
  return useQuery({
    queryKey: ["pago", id],
    queryFn: () => fetchPagoById(id),
    enabled: !!id,
  });
};
