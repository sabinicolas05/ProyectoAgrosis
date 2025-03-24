import { useState } from "react";
import { useFetchTipoInsumo } from "@/hooks/inventario/tipoinsumo/useFetchTipoInsumo"; // Cambio aquí
import { useDeleteTipoInsumo } from "@/hooks/inventario/tipoinsumo/useDeleteTipoInsumo"; // Cambio aquí
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarTipoInsumoModal from "@/pages/inventario/tipo_insumo/EditarTipoInsumo"; // Cambio aquí
import RegisterTipoInsumoModal from "@/pages/inventario/tipo_insumo/RegisterTipoInsumo"; // Cambio aquí
import useAuth from "@/hooks/useAuth";


const TipoInsumosList = () => { // Cambio aquí
  useAuth();
  const { data: tipoinsumo, error } = useFetchTipoInsumo(); // Cambio aquí
  const { mutate: deleteTipoInsumo } = useDeleteTipoInsumo(); // Cambio aquí
  const [tipoInsumoSeleccionado, setTipoInsumoSeleccionado] = useState<string | null>(null); // Cambio aquí
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoInsumoAEliminar, setTipoInsumoAEliminar] = useState<string | null>(null); // Cambio aquí

  if (error) return <p>Error al cargar los tipos de insumos</p>; // Cambio aquí

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Tipos de Insumos Registrados</h2> {/* Cambio aquí */}
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Tipo</th> {/* Cambio aquí */}
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tipoinsumo?.map((insumo) => ( // Cambio aquí
              <tr key={insumo.id} className="border-b">
                <td className="px-4 py-2">{insumo.id}</td> {/* Cambio aquí */}
                <td className="px-4 py-2">{insumo.tipo}</td> {/* Cambio aquí */}
                <td className="px-4 py-2 flex gap-2">
                  <Button
                    onClick={() => setTipoInsumoSeleccionado(insumo.id)} // Cambio aquí
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => setTipoInsumoAEliminar(insumo.id)} // Cambio aquí
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
        Registrar un insumo {/* Cambio aquí */}
      </Button>

      {mostrarModal && <RegisterTipoInsumoModal onClose={() => setMostrarModal(false)} />} {/* Cambio aquí */}

      {tipoInsumoSeleccionado && (
        <EditarTipoInsumoModal id={tipoInsumoSeleccionado} onClose={() => setTipoInsumoSeleccionado(null)} /> 
      )}

      {tipoInsumoAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">¿Eliminar tipo de insumo?</h2> {/* Cambio aquí */}
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setTipoInsumoAEliminar(null)}
              >
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteTipoInsumo(tipoInsumoAEliminar); // Cambio aquí
                  setTipoInsumoAEliminar(null); // Cambio aquí
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

export default TipoInsumosList; // Cambio aquí
