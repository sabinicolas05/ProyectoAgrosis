import { useState } from "react";
import { useFetchInsumo } from "@/hooks/inventario/insumos/useFetchInsumo";
import { useDeleteInsumo } from "@/hooks/inventario/insumos/useDeleteInsumo";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarInsumoModal from "@/pages/inventario/insumo/EditarInsumo";
import RegisterInsumoModal from "@/pages/inventario/insumo/RegisterInsumo";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const InsumosList = () => {
  useAuth();
  
  // Obtener la lista de insumos
  const { data: insumos, error, isLoading } = useFetchInsumo();
  const { mutate: deleteInsumo } = useDeleteInsumo();

  // Estados para manejar modales
  const [insumoSeleccionado, setInsumoSeleccionado] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [insumoAEliminar, setInsumoAEliminar] = useState<string | null>(null);

  if (error) return <p className="text-red-500"> Error al cargar los insumos.</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4"> Insumos Registrados</h2>

        {isLoading ? (
          <p className="text-gray-500">Cargando insumos...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Cantidad</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Tipo Empacado</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Unidad Medida</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {insumos?.map((insumo) => (
                <tr key={insumo.id} className="border-b">
                  <td className="px-4 py-2">{insumo.id}</td>
                  <td className="px-4 py-2">{insumo.cantidad}</td>
                  <td className="px-4 py-2">${insumo.precio}</td>
                  <td className="px-4 py-2">{insumo.tipo_empacado}</td>
                  <td className="px-4 py-2">{insumo.tipo}</td>
                  <td className="px-4 py-2">{insumo.unidadMedida}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button
                      onClick={() => setInsumoSeleccionado(insumo.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                       Editar
                    </Button>
                    <Button
                      onClick={() => setInsumoAEliminar(insumo.id)}
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

      {/* Botón para registrar un nuevo insumo */}
      <Button
        onClick={() => setMostrarModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
         Registrar un insumo
      </Button>

      {/* Modal de registro */}
      {mostrarModal && <RegisterInsumoModal onClose={() => setMostrarModal(false)} />}

      {/* Modal de edición */}
      {insumoSeleccionado && (
        <EditarInsumoModal id={insumoSeleccionado} onClose={() => setInsumoSeleccionado(null)} />
      )}

      {/* Modal de confirmación para eliminar */}
      {insumoAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">❌ ¿Eliminar insumo?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setInsumoAEliminar(null)}>
                 Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteInsumo(insumoAEliminar, {
                    onSuccess: () => toast.success("✅ Insumo eliminado correctamente"),
                    onError: () => toast.error("❌ Error al eliminar el insumo"),
                  });
                  setInsumoAEliminar(null);
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

export default InsumosList;
