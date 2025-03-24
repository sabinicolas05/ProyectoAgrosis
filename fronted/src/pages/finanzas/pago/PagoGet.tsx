import { useState } from "react";
import { useFetchPago } from "@/hooks/finanzas/pagos/useFetchPago";
import { useDeletePago } from "@/hooks/finanzas/pagos/useDeletePago";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarPagoModal from "@/pages/finanzas/pago/EditarPago";
import RegisterPagoModal from "@/pages/finanzas/pago/RegisterPago";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const PagosList = () => {
  useAuth();

  // Obtener la lista de pagos
  const { data: pagos, error, isLoading } = useFetchPago();
  const { mutate: deletePago } = useDeletePago();

  // Estados para manejar modales
  const [pagoSeleccionado, setPagoSeleccionado] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pagoAEliminar, setPagoAEliminar] = useState<string | null>(null);

  if (error) return <p className="text-red-500"> Error al cargar los pagos.</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4"> Pagos Registrados</h2>

        {isLoading ? (
          <p className="text-gray-500">Cargando pagos...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Cantidad</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Asignación de Actividad</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pagos?.map((pago) => (
                <tr key={pago.id} className="border-b">
                  <td className="px-4 py-2">{pago.id}</td>
                  <td className="px-4 py-2">{pago.cantidad}</td>
                  <td className="px-4 py-2">{pago.fecha}</td>
                  <td className="px-4 py-2">{pago.fk_asignacion_actividad_id}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button
                      onClick={() => setPagoSeleccionado(pago.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                       Editar
                    </Button>
                    <Button
                      onClick={() => setPagoAEliminar(pago.id)}
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

      {/* Botón para registrar un nuevo pago */}
      <Button
        onClick={() => setMostrarModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
         Registrar un pago
      </Button>

      {/* Modal de registro */}
      {mostrarModal && <RegisterPagoModal onClose={() => setMostrarModal(false)} />}

      {/* Modal de edición */}
      {pagoSeleccionado && (
        <EditarPagoModal id={pagoSeleccionado} onClose={() => setPagoSeleccionado(null)} />
      )}

      {/* Modal de confirmación para eliminar */}
      {pagoAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">❌ ¿Eliminar pago?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setPagoAEliminar(null)}>
                 Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deletePago(pagoAEliminar, {
                    onSuccess: () => toast.success("✅ Pago eliminado correctamente"),
                    onError: () => toast.error("❌ Error al eliminar el pago"),
                  });
                  setPagoAEliminar(null);
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

export default PagosList;
