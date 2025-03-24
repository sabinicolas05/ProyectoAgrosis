import { useState } from "react";
import { useFetchHerramienta } from "@/hooks/inventario/herramienta/useFetchHerramienta";
import { useDeleteHerramienta } from "@/hooks/inventario/herramienta/useDeleteHerramienta";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarHerramientaModal from "@/pages/inventario/herramientas/EditarHerramienta";
import RegisterHerramientaModal from "@/pages/inventario/herramientas/RegisterHerramineta";
import useAuth from "@/hooks/useAuth";

const HerramientasList = () => {
  useAuth();
  const { data: herramienta, error } = useFetchHerramienta();
  const { mutate: deleteHerramienta } = useDeleteHerramienta();
  const [herramientaSeleccionado, setHerraminetaSeleccionado] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [herraminetaAEliminar, setherramientaAEliminar] = useState<string | null>(null);

  if (error) return <p>Error al cargar las herramientas</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Herramientas Registradas</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Unidades</th>
              <th className="px-4 py-2">Precio CU</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {herramienta?.map((herramientas) => (
              <tr key={herramientas.id} className="border-b">
                <td className="px-4 py-2">{herramientas.id}</td>
                <td className="px-4 py-2">{herramientas.nombre}</td>
                <td className="px-4 py-2">{herramientas.unidades}</td>
                <td className="px-4 py-2">{herramientas.precioCU}</td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={herramientas.estado}
                    disabled
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <Button
                    onClick={() => setHerraminetaSeleccionado(herramientas.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => setherramientaAEliminar(herramientas.id)}
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

      {mostrarModal && <RegisterHerramientaModal onClose={() => setMostrarModal(false)} />}

      {herramientaSeleccionado && (
        <EditarHerramientaModal id={herramientaSeleccionado} onClose={() => setHerraminetaSeleccionado(null)} />
      )}

      {herraminetaAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">¿Eliminar herramienta?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setherramientaAEliminar(null)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteHerramienta(herraminetaAEliminar);
                  setherramientaAEliminar(null);
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

export default HerramientasList;
