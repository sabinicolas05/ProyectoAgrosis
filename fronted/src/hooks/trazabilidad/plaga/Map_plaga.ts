import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPlagaOptions = () => {
  const [tiposPlaga, setTiposPlaga] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get("http://127.0.0.1:8000/api/tipo_plaga/", { headers });
        
        // Verificar la estructura de la respuesta
        console.log(response.data); 

        const mappedData = response.data.map((tipo) => ({
          id: tipo.id,
          nombre: tipo.tipo, // Asegúrate de que `tipo.tipo` es el campo correcto en el serializer
        }));

        setTiposPlaga(mappedData);
      } catch (err) {
        setError(err);
        console.error("Error al obtener tipos de plaga", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tiposPlaga, loading, error };
};

export default useFetchPlagaOptions;
