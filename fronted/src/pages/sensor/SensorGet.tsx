import { useState } from "react";
import { useFetchSensors } from "@/hooks/sensores/useFetchSensors";
import { useDeleteSensor } from "@/hooks/sensores/useDeleteSensor";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarSensorModal from "@/pages/sensor/EditarSensor";
import RegisterSensorModal from "@/pages/sensor/registerModalSensor";
import useAuth from "@/hooks/useAuth";

const SensoresList = () => {
  useAuth();
  const { data: sensores, error } = useFetchSensors();
  const { mutate: deleteSensor } = useDeleteSensor();
  const [sensorSeleccionado, setSensorSeleccionado] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [sensorAEliminar, setSensorAEliminar] = useState<string | null>(null);

  if (error) return <p>Error al cargar sensores</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Sensores Registrados</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Bancal</th>
              <th className="px-4 py-2">Tipo de Sensor</th>
              <th className="px-4 py-2">Configuración</th>
              <th className="px-4 py-2">Cultivo</th>
              <th className="px-4 py-2">Medición</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sensores?.map((sensor) => (
              <tr key={sensor.id} className="border-b">
<td className="px-4 py-2">{sensor.fk_bancal_nombre || "N/A"}</td>
<td className="px-4 py-2">{sensor.fk_tipo_sensor_nombre || "N/A"}</td>
<td className="px-4 py-2">
  {sensor.valor_min !== undefined && sensor.valor_max !== undefined
    ? `Min: ${sensor.valor_min}, Max: ${sensor.valor_max}`
    : "N/A"}
</td>
<td className="px-4 py-2">{sensor.fk_cultivo_nombre || "N/A"}</td>
                <td className="px-4 py-2">{sensor.medicion}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button
                    onClick={() => setSensorSeleccionado(sensor.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => setSensorAEliminar(sensor.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <br />

      <Button
        onClick={() => setMostrarModal(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Registrar un Sensor
      </Button>

      {mostrarModal && <RegisterSensorModal onClose={() => setMostrarModal(false)} />}

      {sensorSeleccionado && (
        <EditarSensorModal id={sensorSeleccionado} onClose={() => setSensorSeleccionado(null)} />
      )}

      {sensorAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">¿Eliminar Sensor?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setSensorAEliminar(null)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteSensor(sensorAEliminar);
                  setSensorAEliminar(null);
                }}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default SensoresList;
