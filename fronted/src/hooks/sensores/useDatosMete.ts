import { useState, useEffect, useRef, useCallback } from "react";

// 📌 URLs del WebSocket y la API
const WS_URL = "ws://localhost:8001/ws/datos/"; // Asegúrate de que el puerto sea el correcto
const API_SENSORES = "http://localhost:8001/api/sensor/";

// 📌 Interfaces para los datos
export interface Sensor {
  id: number;
  tipo_sensor: string;
  unidad_medida: string;
  descripcion: string;
}

export interface DatosMeteorologicos {
  fk_id_sensor: number;
  valor_medicion: number;
  fecha_medicion: string;
}

// 📡 Hook personalizado para manejar datos meteorológicos en tiempo real
export function useDatosMeteorologicos() {
  const [mediciones, setMediciones] = useState<DatosMeteorologicos[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const isManuallyClosed = useRef(false);

  // 🔄 Conectar WebSocket con reconexión automática
  const connectWebSocket = useCallback(() => {
    if (isManuallyClosed.current) return;
    console.log("🔄 Intentando conectar al WebSocket...");

    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ WebSocket conectado");
      reconnectAttempts.current = 0;
    };

    socket.onmessage = (event) => {
      try {
        const data: DatosMeteorologicos = JSON.parse(event.data);
        setMediciones((prev) => [...prev.slice(-49), data]);
      } catch (error) {
        console.error("❌ Error procesando mensaje del WebSocket:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
      socket.close();
    };

    socket.onclose = () => {
      if (!isManuallyClosed.current) {
        console.warn("⚠ WebSocket cerrado, intentando reconectar...");
        setTimeout(connectWebSocket, Math.min(5000, 1000 * 2 ** reconnectAttempts.current));
        reconnectAttempts.current = Math.min(reconnectAttempts.current + 1, 6);
      }
    };
  }, []);

  // 🌍 Obtener sensores desde la API REST
  useEffect(() => {
    fetch(API_SENSORES)
      .then((res) => res.json())
      .then(setSensors)
      .catch((error) => console.error("❌ Error obteniendo sensores:", error));
  }, []);

  // 🔗 Conectar WebSocket al montar el componente
  useEffect(() => {
    isManuallyClosed.current = false;
    connectWebSocket();
    return () => {
      isManuallyClosed.current = true;
      socketRef.current?.close();
      console.log("🚫 WebSocket cerrado manualmente");
    };
  }, [connectWebSocket]);

  return { mediciones, sensors };
}
