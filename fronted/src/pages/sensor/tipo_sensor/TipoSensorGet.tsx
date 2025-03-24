import { useState } from "react";
import { useFetchTipoSensores } from "@/hooks/sensores/tipo_sensor/useFetchTipoSensor";
import { useDeleteTipoSensor } from "@/hooks/sensores/tipo_sensor/useDeleteTipoSensor";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarTipoSensorModal from "@/pages/sensor/tipo_sensor/EditarTipoSensor";
import RegisterTipoSensorModal from "@/pages/sensor/tipo_sensor/RegisterTipoSensor";
import useAuth from "@/hooks/useAuth";

const TipoSensoresList = () => {
  useAuth();
  const { data: tipoSensores, error } = useFetchTipoSensores();
  const { mutate: deleteTipoSensor } = useDeleteTipoSensor();
  const [tipoSensorSeleccionado, setTipoSensorSeleccionado] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoSensorAEliminar, setTipoSensorAEliminar] = useState<string | null>(null);

  if (error) return <p>Error al cargar tipos de sensores</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Tipos de Sensores Registrados</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tipoSensores?.map((tipoSensor) => (
              <tr key={tipoSensor.id} className="border-b">
                <td className="px-4 py-2">{tipoSensor.id}</td>
                <td className="px-4 py-2">{tipoSensor.nombre}</td>
                <td className="px-4 py-2">{tipoSensor.tipo}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button
                    onClick={() => setTipoSensorSeleccionado(tipoSensor.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => setTipoSensorAEliminar(tipoSensor.id)}
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
        Registrar un Tipo de Sensor
      </Button>

      {mostrarModal && <RegisterTipoSensorModal onClose={() => setMostrarModal(false)} />}

      {tipoSensorSeleccionado && (
        <EditarTipoSensorModal id={tipoSensorSeleccionado} onClose={() => setTipoSensorSeleccionado(null)} />
      )}

      {tipoSensorAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">¿Eliminar Tipo de Sensor?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setTipoSensorAEliminar(null)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteTipoSensor(tipoSensorAEliminar);
                  setTipoSensorAEliminar(null);
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

export default TipoSensoresList;
