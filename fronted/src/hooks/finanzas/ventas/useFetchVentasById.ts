import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchVentaById = async (id: string) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(`http://127.0.0.1:8000/api/venta/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const useFetchVentaById = (id: string) => {
  return useQuery({
    queryKey: ["venta", id],
    queryFn: () => fetchVentaById(id),
    enabled: !!id, 
  });
};
