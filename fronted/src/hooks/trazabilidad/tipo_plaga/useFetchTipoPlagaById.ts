import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTipoPlagaById = async (id: string) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(`http://127.0.0.1:8000/api/tipo_plaga/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useFetchTipoPlagaById = (id: string) => {
  return useQuery({
    queryKey: ["tipo_plaga", id],
    queryFn: () => fetchTipoPlagaById(id),
    enabled: !!id,
  });
};
