import { useState } from "react";
import { useFetchInventario } from "@/hooks/inventario/inventarios/useFetchInventario";
import { useDeleteInventario } from "@/hooks/inventario/inventarios/useDeleteInventario";
import useFetchInventarioMap from "@/hooks/inventario/inventarios/MapInventario"; // ✅ Importación corregida
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarInventarioModal from "@/pages/inventario/inventarios/EditarInventario";
import RegisterInventarioModal from "@/pages/inventario/inventarios/RegisterInventario";
import useAuth from "@/hooks/useAuth";

const InventarioList = () => {
  useAuth();

  const { data: inventarios, error } = useFetchInventario();
  const { mutate: deleteInventario } = useDeleteInventario();
  const { herramientas, insumos, loading, error: mapError } = useFetchInventarioMap(); // ✅ Uso correcto del hook

  const [inventarioSeleccionado, setInventarioSeleccionado] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [inventarioAEliminar, setInventarioAEliminar] = useState<string | null>(null);

  if (loading) return <p>Cargando datos del inventario...</p>;
  if (error || mapError) return <p>Error al cargar los datos del inventario.</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Inventario Registrado</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Herramienta</th>
              <th className="px-4 py-2">Insumo</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inventarios?.map((item) => {
              const herramienta = herramientas.find(h => h.id === item.fk_herramienta)?.nombre || "Sin herramienta";
              const insumo = insumos.find(i => i.id === item.fk_insumo)?.tipo || "Sin insumo";

              return (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{herramienta}</td>
                  <td className="px-4 py-2">{insumo}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button
                      onClick={() => setInventarioSeleccionado(item.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => setInventarioAEliminar(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <br />

      <Button
        onClick={() => setMostrarModal(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Registrar en Inventario
      </Button>

      {mostrarModal && <RegisterInventarioModal onClose={() => setMostrarModal(false)} />}
      {inventarioSeleccionado && (
        <EditarInventarioModal id={inventarioSeleccionado} onClose={() => setInventarioSeleccionado(null)} />
      )}

      {inventarioAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">¿Eliminar Inventario?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setInventarioAEliminar(null)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteInventario(inventarioAEliminar);
                  setInventarioAEliminar(null);
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

export default InventarioList;
