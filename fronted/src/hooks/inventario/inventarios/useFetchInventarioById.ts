import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchInventarioById = async (id: string) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(`http://127.0.0.1:8000/api/inventario/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const useFetchInventarioById = (id: string) => {
  return useQuery({
    queryKey: ["inventario", id],
    queryFn: () => fetchInventarioById(id),
    enabled: !!id, 
  });
};
