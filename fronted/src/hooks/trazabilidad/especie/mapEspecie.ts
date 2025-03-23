import { useState, useEffect } from "react";
import axios from "axios";

const useFetchTipoEspecieMap = () => {
  const [tiposEspecie, setTiposEspecie] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get("http://127.0.0.1:8000/api/tipo_especie/", { headers });

        // Extrae solo el atributo `tipo`
        setTiposEspecie(response.data.map((item: { id: number; tipo: string }) => ({
            id: item.id,
            tipo: item.tipo
          })));
                } catch (err) {
        setError(err as Error);
        console.error("❌ Error al obtener los tipos de especie:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tiposEspecie, loading, error };
};

export default useFetchTipoEspecieMap;
