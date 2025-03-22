import { useState } from "react";
import { useFetchProduccion } from "@/hooks/finanzas/produccion/useFetchProduccion";
import { useDeleteProduccion } from "@/hooks/finanzas/produccion/useDeleteProduccion";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarProduccionModal from "@/pages/finanzas/produccion/EditarProduccion";
import RegisterProduccionModal from "@/pages/finanzas/produccion/RegisterProduccion";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const ProduccionList = () => {
  useAuth();

  // Obtener la lista de producciones
  const { data: producciones, error, isLoading } = useFetchProduccion();
  const { mutate: deleteProduccion } = useDeleteProduccion();

  // Estados para manejar modales
  const [produccionSeleccionada, setProduccionSeleccionada] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [produccionAEliminar, setProduccionAEliminar] = useState<string | null>(null);

  if (error) return <p className="text-red-500">❌ Error al cargar las producciones.</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4"> Producciones Registradas</h2>

        {isLoading ? (
          <p className="text-gray-500">Cargando producciones...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Contenido</th>
                <th className="px-4 py-2">Unidades</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {producciones?.map((produccion) => (
                <tr key={produccion.id} className="border-b">
                  <td className="px-4 py-2">{produccion.id}</td>
                  <td className="px-4 py-2">{produccion.nombre}</td>
                  <td className="px-4 py-2">{produccion.precio}</td>
                  <td className="px-4 py-2">{produccion.contenido}</td>
                  <td className="px-4 py-2">{produccion.unidades}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button
                      onClick={() => setProduccionSeleccionada(produccion.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                       Editar
                    </Button>
                    <Button
                      onClick={() => setProduccionAEliminar(produccion.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                       Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <br />

      {/* Botón para registrar una nueva producción */}
      <Button
        onClick={() => setMostrarModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
         Registrar una producción
      </Button>

      {/* Modal de registro */}
      {mostrarModal && <RegisterProduccionModal onClose={() => setMostrarModal(false)} />}

      {/* Modal de edición */}
      {produccionSeleccionada && (
        <EditarProduccionModal id={produccionSeleccionada} onClose={() => setProduccionSeleccionada(null)} />
      )}

      {/* Modal de confirmación para eliminar */}
      {produccionAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4"> ¿Eliminar producción?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setProduccionAEliminar(null)}
              >
                 Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteProduccion(produccionAEliminar, {
                    onSuccess: () => toast.success("✅ Producción eliminada correctamente"),
                    onError: () => toast.error("❌ Error al eliminar la producción"),
                  });
                  setProduccionAEliminar(null);
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

export default ProduccionList;
