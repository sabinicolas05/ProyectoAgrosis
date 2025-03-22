import { useState } from "react";
import { useFetchTipoHerramienta } from "@/hooks/inventario/tipoherramienta/useFetchTipoHerramienta";
import { useDeleteTipoHerramienta } from "@/hooks/inventario/tipoherramienta/useDeleteTipoHerramienta";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import  EditarTipoHerramientaModal from "@/pages/inventario/tipo_herramientas/EditarTipoHerramienta";
import RegisterTipoHerramientaModal from "@/pages/inventario/tipo_herramientas/RegisterTipoHerramineta";
import useAuth from "@/hooks/useAuth";


const TipoHerramientasList = () => {
  useAuth();
  const { data: tipoherramienta, error } = useFetchTipoHerramienta();
  const { mutate: deleteTipoHerramienta } = useDeleteTipoHerramienta();
  const [tipoherramientaSeleccionado, setTipoHerraminetaSeleccionado] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoherraminetaAEliminar, settipoherramientaAEliminar] = useState<string | null>(null);

  if (error) return <p>Error al cargar el tipo deherraminetas</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">tipo de Herraminetas Registradas</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">tipo</th>
              <th className="px-4 py-2">Acciones</th>

            </tr>
          </thead>
          <tbody>
            {tipoherramienta?.map((tipoherramientas) => (
              <tr key={tipoherramientas.id} className="border-b">
                <td className="px-4 py-2">{tipoherramientas.id}</td>
                <td className="px-4 py-2">{tipoherramientas.tipo}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button
                    onClick={() => setTipoHerraminetaSeleccionado(tipoherramientas.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => settipoherramientaAEliminar(tipoherramientas.id)}
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
        Registrar una herramienta
      </Button>

      {mostrarModal && <RegisterTipoHerramientaModal onClose={() => setMostrarModal(false)} />}

      {tipoherramientaSeleccionado && (
        <EditarTipoHerramientaModal id={tipoherramientaSeleccionado} onClose={() => setTipoHerraminetaSeleccionado(null)} />
      )}

      {tipoherraminetaAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">¿Eliminar tipoherramienta?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => settipoherramientaAEliminar(null)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteTipoHerramienta (tipoherraminetaAEliminar);
                  settipoherramientaAEliminar(null);
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

export default TipoHerramientasList;