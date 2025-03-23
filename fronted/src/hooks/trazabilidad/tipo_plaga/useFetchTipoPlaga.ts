import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FetchTiposPlaga = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get("http://127.0.0.1:8000/api/tipo_plaga/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useFetchTiposPlaga = () => {
  return useQuery({
    queryKey: ["tipo_plagas"],
    queryFn: FetchTiposPlaga,
    staleTime: 5000,
    refetchInterval: 5000,
  });
};
