import { useState } from "react";
import { useFetchConfiguraciones } from "@/hooks/sensores/configuracion/useFetchConfiguracion";
import { useDeleteConfiguracion } from "@/hooks/sensores/configuracion/useDeleteConfiguracion";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarConfiguracionModal from "@/pages/sensor/configuracion/EditarConfiguracion";
import RegisterConfiguracionModal from "@/pages/sensor/configuracion/registerConfiguracion";
import useAuth from "@/hooks/useAuth";

const ConfiguracionesList = () => {
  useAuth();
  const { data: configuraciones, error } = useFetchConfiguraciones();
  const { mutate: deleteConfiguracion } = useDeleteConfiguracion();
  const [configSeleccionada, setConfigSeleccionada] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [configAEliminar, setConfigAEliminar] = useState<string | null>(null);

  if (error) return <p>Error al cargar configuraciones de sensores</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Configuraciones Registradas</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Tipo de Cultivo</th>
              <th className="px-4 py-2">Tipo de Sensor</th>
              <th className="px-4 py-2">Valor Mínimo</th>
              <th className="px-4 py-2">Valor Máximo</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {configuraciones?.map((config) => (
              <tr key={config.id} className="border-b">
                <td className="px-4 py-2">{config.id}</td>
                <td className="px-4 py-2">{config.tipo_cultivo}</td>
                <td className="px-4 py-2">{config.tipo_sensor}</td>
                <td className="px-4 py-2">{config.valor_min}</td>
                <td className="px-4 py-2">{config.valor_max}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button
                    onClick={() => setConfigSeleccionada(config.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => setConfigAEliminar(config.id)}
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
        Registrar una Configuración
      </Button>

      {mostrarModal && <RegisterConfiguracionModal onClose={() => setMostrarModal(false)} />}

      {configSeleccionada && (
        <EditarConfiguracionModal id={configSeleccionada} onClose={() => setConfigSeleccionada(null)} />
      )}

      {configAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">¿Eliminar Configuración?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setConfigAEliminar(null)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteConfiguracion(configAEliminar);
                  setConfigAEliminar(null);
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

export default ConfiguracionesList;
