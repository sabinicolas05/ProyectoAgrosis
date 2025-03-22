import { useQuery } from "@tanstack/react-query";

const fetchUsuarios = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/usuario/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los usuarios");
  }

  return response.json();
};

export const useFetchUsuarios = () => {
  return useQuery({
    queryKey: ["usuarios"],
    queryFn: fetchUsuarios,
  });
};
