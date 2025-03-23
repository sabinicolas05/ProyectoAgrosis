import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSensorOptions = () => {
  
  const [bancales, setBancales] = useState([]);
  const [tipoSensores, setTipoSensores] = useState([]);
  const [configuraciones, setConfiguraciones] = useState([]);
  const [cultivos, setCultivos] = useState([]);
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

        const [bancalesRes, tipoSensoresRes, configuracionesRes, cultivosRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/bancal/", { headers }),
          axios.get("http://127.0.0.1:8000/api/tiposensor/", { headers }),
          axios.get("http://127.0.0.1:8000/api/configuracion/", { headers }),
          axios.get("http://127.0.0.1:8000/api/cultivo/", { headers }),
        ]);

        setBancales(bancalesRes.data);
        setTipoSensores(tipoSensoresRes.data);
        setConfiguraciones(configuracionesRes.data);
        setCultivos(cultivosRes.data);

        
      } catch (err) {
        setError(err);
        console.error("Error al obtener datos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { bancales, tipoSensores, configuraciones, cultivos, loading, error };
};

export default useFetchSensorOptions;
