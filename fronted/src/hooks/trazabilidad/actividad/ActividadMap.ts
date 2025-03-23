import { useState, useEffect } from "react";
import axios from "axios";

const useFetchActividadMap = () => {
  const [usuarios, setUsuarios] = useState<{ id: number; username: string }[]>([]);
  const [bancales, setBancales] = useState<{ id: number; nombre: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

        // Obtener usuarios y bancales simultáneamente
        const [usuariosRes, bancalesRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/usuario/", { headers }),
          axios.get("http://127.0.0.1:8000/api/bancal/", { headers }),
        ]);

        setUsuarios(
          usuariosRes.data.map((usuario: { id: number; username: string }) => ({
            id: usuario.id,
            username: usuario.username, 
          }))
        );
                
        setBancales(
          bancalesRes.data.map((bancal: { id: number; nombre: string }) => ({
            id: bancal.id,
            nombre: bancal.nombre,
          }))
        );
      } catch (err) {
        setError(err as Error);
        console.error("❌ Error al obtener datos de usuarios y bancales:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { usuarios, bancales, loading, error };
};

export default useFetchActividadMap;
