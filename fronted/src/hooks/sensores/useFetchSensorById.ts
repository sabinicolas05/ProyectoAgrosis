import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Función para obtener un sensor por su ID
const fetchSensorById = async (id: string) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  console.log("Token usado en la petición:", token);

  const { data } = await axios.get(`http://127.0.0.1:8000/api/sensor/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Envía el token en los headers
      "Content-Type": "application/json",
    },
  });

  return data;
};

// Hook personalizado para usar en React
export const useFetchSensorById = (id: string) => {
  return useQuery({
    queryKey: ["sensor", id],
    queryFn: () => fetchSensorById(id),
    enabled: !!id, // Solo ejecuta la petición si hay un ID
  });
};

// Importado en src/pages/EditarSensor.tsx
