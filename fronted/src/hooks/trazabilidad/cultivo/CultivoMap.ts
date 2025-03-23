import { useState, useEffect } from "react";
import axios from "axios";

const useFetchCultivoMap = () => {
  const [cultivos, setCultivos] = useState<
    { id: number; nombre: string; nombre_semillero: string; nombre_especie: string }[]
  >([]);
  const [semilleros, setSemilleros] = useState<{ id: number; nombre_semilla: string }[]>([]);
  const [especies, setEspecies] = useState<{ id: number; tipo: string }[]>([]);
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

        // Obtener datos de cultivo, semillero y especie
        const cultivoRes = await axios.get("http://127.0.0.1:8000/api/cultivo/", { headers });
        const semilleroRes = await axios.get("http://127.0.0.1:8000/api/semillero/", { headers });
        const especieRes = await axios.get("http://127.0.0.1:8000/api/especie/", { headers });

        console.log("➡️ Cultivo API Response:", cultivoRes.data);
        console.log("➡️ Semillero API Response:", semilleroRes.data);
        console.log("➡️ Especie API Response:", especieRes.data);

        setSemilleros(semilleroRes.data);
        setEspecies(especieRes.data);

        // Mapear IDs con nombres
        const semilleroMap = new Map(
          semilleroRes.data.map((item: { id: number; nombre_semilla: string }) => [item.id, item.nombre_semilla])
        );
        const especieMap = new Map(
          especieRes.data.map((item: { id: number; tipo: string }) => [item.id, item.tipo])
        );

        const cultivosMapped = cultivoRes.data.map(
          (item: { id: number; nombre: string; fk_semillero: number | null; fk_especie: number | null }) => ({
            id: item.id,
            nombre: item.nombre,
            nombre_semillero: item.fk_semillero && semilleroMap.has(item.fk_semillero)
              ? semilleroMap.get(item.fk_semillero)
              : "Sin semillero",
            nombre_especie: item.fk_especie && especieMap.has(item.fk_especie)
              ? especieMap.get(item.fk_especie)
              : "Sin especie",
          })
        );

        setCultivos(cultivosMapped);
      } catch (err) {
        setError(err as Error);
        console.error("❌ Error al obtener los cultivos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cultivos, semilleros, especies, loading, error };
};

export default useFetchCultivoMap;
