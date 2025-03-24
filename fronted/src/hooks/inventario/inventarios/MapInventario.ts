import { useState, useEffect } from "react";
import axios from "axios";

const useFetchInventarioMap = () => {
  const [herramientas, setHerramientas] = useState([]);
  const [insumos, setInsumos] = useState([]);
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

        const [herramientasRes, insumosRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/herramienta/", { headers }),
          axios.get("http://127.0.0.1:8000/api/insumo/", { headers }),
        ]);

        setHerramientas(herramientasRes.data);
        setInsumos(insumosRes.data);
      } catch (err) {
        setError(err);
        console.error("Error al obtener datos de inventario", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { herramientas, insumos, loading, error };
};

export default useFetchInventarioMap;
