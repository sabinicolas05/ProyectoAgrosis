import { useState } from "react";
import { useFetchResiduos } from "@/hooks/finanzas/residuos/useFetchResiduo";
import { useDeleteResiduo } from "@/hooks/finanzas/residuos/useDeleteResiduo";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import  EditarResiduoModal from "@/pages/finanzas/residuo/EditarResiduo";
import RegisterResiduoModal from "@/pages/finanzas/residuo/RegisterResiduo";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const ResiduosList = () => {
  useAuth();

  // Obtener la lista de residuos
  const { data: residuos, error, isLoading } = useFetchResiduos();
  const { mutate: deleteResiduo } = useDeleteResiduo();

  // Estados para manejar modales
  const [residuoSeleccionado, setResiduoSeleccionado] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [residuoAEliminar, setResiduoAEliminar] = useState<string | null>(null);

  if (error) return <p className="text-red-500">❌ Error al cargar los residuos.</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4"> Residuos Registrados</h2>

        {isLoading ? (
          <p className="text-gray-500">Cargando residuos...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Cantidad</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Cultivo</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {residuos?.map((residuo) => (
                <tr key={residuo.id} className="border-b">
                  <td className="px-4 py-2">{residuo.id}</td>
                  <td className="px-4 py-2">{residuo.cantidad}</td>
                  <td className="px-4 py-2">{residuo.tipo_residuo}</td>
                  <td className="px-4 py-2">{residuo.fk_cultivo_id}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button
                      onClick={() => setResiduoSeleccionado(residuo.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                       Editar
                    </Button>
                    <Button
                      onClick={() => setResiduoAEliminar(residuo.id)}
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

      {/* Botón para registrar un nuevo residuo */}
      <Button
        onClick={() => setMostrarModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
         Registrar un residuo
      </Button>

      {/* Modal de registro */}
      {mostrarModal && <RegisterResiduoModal onClose={() => setMostrarModal(false)} />}

      {/* Modal de edición */}
      {residuoSeleccionado && (
        <EditarResiduoModal id={residuoSeleccionado} onClose={() => setResiduoSeleccionado(null)} />
      )}

      {/* Modal de confirmación para eliminar */}
      {residuoAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4"> ¿Eliminar residuo?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setResiduoAEliminar(null)}
              >
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteResiduo(residuoAEliminar, {
                    onSuccess: () => toast.success("✅ Residuo eliminado correctamente"),
                    onError: () => toast.error("❌ Error al eliminar el residuo"),
                  });
                  setResiduoAEliminar(null);
                }}
              >
                ✅ Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default ResiduosList;
