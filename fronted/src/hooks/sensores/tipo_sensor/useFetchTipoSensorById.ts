import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Función para obtener un tipo de sensor por su ID
const fetchTipoSensorById = async (id: string) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  console.log("Token usado en la petición:", token);

  const { data } = await axios.get(`http://127.0.0.1:8000/api/tiposensor/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Envía el token en los headers
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const useFetchTipoSensorById = (id: string) => {
  return useQuery({
    queryKey: ["tipoSensor", id],
    queryFn: () => fetchTipoSensorById(id),
    enabled: !!id, // Solo ejecuta la petición si hay un ID
  });
};

// Importado en src/pages/EditarTipoSensor.tsx
