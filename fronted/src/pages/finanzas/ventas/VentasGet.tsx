import { useState } from "react";
import { useFetchVentas } from "@/hooks/finanzas/ventas/useFetchVentas";
import { useDeleteVenta } from "@/hooks/finanzas/ventas/useDeleteVentas";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarVentaModal from "@/pages/finanzas/ventas/EditarVentas";
import RegisterVentaModal from "@/pages/finanzas/ventas/RegisterVentas";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const VentasList = () => {
  useAuth();

  // Obtener la lista de ventas
  const { data: ventas, error, isLoading } = useFetchVentas();
  const { mutate: deleteVenta } = useDeleteVenta();

  // Estados para manejar modales
  const [ventaSeleccionada, setVentaSeleccionada] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ventaAEliminar, setVentaAEliminar] = useState<string | null>(null);

  if (error) return <p className="text-red-500">❌ Error al cargar las ventas.</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4"> Ventas Registradas</h2>

        {isLoading ? (
          <p className="text-gray-500">Cargando ventas...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Producción</th>
                <th className="px-4 py-2">Precio Unitario</th>
                <th className="px-4 py-2">Cantidad</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas?.map((venta) => (
                <tr key={venta.id} className="border-b">
                  <td className="px-4 py-2">{venta.id}</td>
                  <td className="px-4 py-2">{venta.fk_produccion}</td>
                  <td className="px-4 py-2">{venta.precio_unitario}</td>
                  <td className="px-4 py-2">{venta.cantidad_produccion}</td>
                  <td className="px-4 py-2">{venta.fecha}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button
                      onClick={() => setVentaSeleccionada(venta.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => setVentaAEliminar(venta.id)}
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

      {/* Botón para registrar una nueva venta */}
      <Button
        onClick={() => setMostrarModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Registrar una venta
      </Button>

      {/* Modal de registro */}
      {mostrarModal && <RegisterVentaModal onClose={() => setMostrarModal(false)} />}

      {/* Modal de edición */}
      {ventaSeleccionada && (
        <EditarVentaModal id={ventaSeleccionada} onClose={() => setVentaSeleccionada(null)} />
      )}

      {/* Modal de confirmación para eliminar */}
      {ventaAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4"> ¿Eliminar venta?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setVentaAEliminar(null)}
              >
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteVenta(ventaAEliminar, {
                    onSuccess: () => toast.success("✅ Venta eliminada correctamente"),
                    onError: () => toast.error("❌ Error al eliminar la venta"),
                  });
                  setVentaAEliminar(null);
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

export default VentasList;
