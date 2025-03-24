import DefaultLayout from "@/layouts/default";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "@/hooks/useAuth";
import { useState, useEffect, useMemo } from "react";
import { useDatosMeteorologicos } from "../hooks/sensores/useDatosMete";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function IndexPage() {
  useAuth();

  const { mediciones, sensors } = useDatosMeteorologicos();
  const [chartsData, setChartsData] = useState<Record<number, any[]>>({});

  // 🔹 Función para obtener el nombre del sensor con tipado explícito
  const getSensorName = useMemo(() => {
    return (sensorId: number): string => {
      const sensor = sensors?.find((s) => Number(s.id) === sensorId);
      return sensor ? sensor.tipo_sensor : "Desconocido";
    };
  }, [sensors]);

  useEffect(() => {
    if (!sensors || !mediciones) return;

    const groupedData = mediciones.reduce((acc: Record<number, any[]>, reading) => {
      const sensorId = Number(reading.fk_id_sensor);
      if (!sensorId) return acc;

      if (!acc[sensorId]) acc[sensorId] = [];

      acc[sensorId].push({
        fecha: new Date(reading.fecha_medicion).toLocaleTimeString(),
        valor: reading.valor_medicion,
        sensor: getSensorName(sensorId),
      });
      return acc;
    }, {});

    setChartsData(groupedData);
  }, [mediciones, sensors, getSensorName]);


  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className="text-2xl font-bold">Agrosis</h1>
        <h2 className="text-2xl font-bold">Bienvenido al inicio</h2>

      </section>

      {/* 📡 Sensores y Mediciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 p-6">
        {/* Sensores Activos */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-xl font-semibold text-green-700">📡 Sensores Activos</h2>
          <ul className="text-gray-600">
            {mediciones.length > 0 ? (
              [...new Set(mediciones.map((r) => Number(r.fk_id_sensor)))].map((sensorId) => (
                <li key={sensorId} className="border-b py-2">
                  <strong>Sensor: {getSensorName(sensorId)}</strong>:{" "}
                  <span className="text-green-600">Activo</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No hay sensores activos</li>
            )}
          </ul>
        </div>

        {/* Últimas Mediciones */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-xl font-semibold text-green-700">🌡 Últimas Mediciones</h2>
          <ul className="text-gray-600">
            {mediciones.length > 0 ? (
              [...new Set(mediciones.map((r) => Number(r.fk_id_sensor)))].map((sensorId) => {
                const latestReading = mediciones
                  .filter((r) => Number(r.fk_id_sensor) === sensorId)
                  .slice(-1)[0];

                return (
                  <li key={sensorId} className="border-b py-2">
                    <strong>Sensor: {getSensorName(sensorId)}</strong>:{" "}
                    <span className="font-medium text-blue-600">
                      {latestReading?.valor_medicion ?? "--"}{" "}
                      {sensors.find((s) => Number(s.id) === sensorId)?.unidad_medida ?? ""}
                    </span>{" "}
                    (<span className="text-gray-500">
                      {latestReading?.fecha_medicion
                        ? new Date(latestReading.fecha_medicion).toLocaleTimeString()
                        : "Hora desconocida"}
                    </span>)
                  </li>
                );
              })
            ) : (
              <li className="text-gray-500">No hay mediciones disponibles</li>
            )}
          </ul>
        </div>

        {/* Gráficos */}
        <div className="bg-white shadow-md rounded-lg p-9 col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold text-green-700">📊 Gráficos de Sensores y Mediciones</h2>
          <Carousel>
            <CarouselContent>
              {Object.keys(chartsData).length > 0 ? (
                Object.keys(chartsData).map((sensorIdStr) => {
                  const sensorId = Number(sensorIdStr); // 🔹 Convertimos a número
                  const sensorData = chartsData[sensorId] || [];

                  console.log("Sensor ID:", sensorId, "Data:", sensorData); // Depuración

                  return (
                    <CarouselItem key={sensorId}>
                      <h3 className="text-lg font-semibold text-center">
                        {getSensorName(sensorId)}
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={sensorData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="fecha" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="valor" stroke="#8884d8" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CarouselItem>
                  );
                })
              ) : (
                <p className="text-center text-gray-500">No hay datos para mostrar</p>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </DefaultLayout>
  );
}
