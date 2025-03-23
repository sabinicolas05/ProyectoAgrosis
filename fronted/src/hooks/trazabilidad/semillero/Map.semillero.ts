import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSemilleroOptions = () => {
  const [semilleros, setSemilleros] = useState([]);
  const [especies, setEspecies] = useState([]);
  const [lotes, setLotes] = useState([]);
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

        const [semillerosRes, especiesRes, lotesRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/semillero/", { headers }),
          axios.get("http://127.0.0.1:8000/api/especie/", { headers }),
          axios.get("http://127.0.0.1:8000/api/lote/", { headers }),
        ]);

        setSemilleros(semillerosRes.data);
        setEspecies(especiesRes.data);
        setLotes(lotesRes.data);
      } catch (err) {
        setError(err);
        console.error("Error al obtener datos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { semilleros, especies, lotes, loading, error };
};

export default useFetchSemilleroOptions;
