import { useQuery } from "@tanstack/react-query";

const fetchSensors = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/sensor/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los sensores"); 
  }

  return response.json();
};

export const useFetchSensors = () => {
  return useQuery({
    queryKey: ["sensores"],
    queryFn: fetchSensors,
  });
};
