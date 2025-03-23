import { useState } from "react";
import { useFetchTiposPlaga } from "@/hooks/trazabilidad/tipo_plaga/useFetchTipoPlaga";
import { useDeleteTipoPlaga } from "@/hooks/trazabilidad/tipo_plaga/useDeleteTipoPlaga";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarTipoPlagaModal from "@/pages/trazabilidad/tipo_plaga/EditarTipoPlaga";
import RegisterTipoPlagaModal from "@/pages/trazabilidad/tipo_plaga/RegisterTipoPlaga";
import useAuth from "@/hooks/auth/useAuth";

const TipoPlagaList = () => {
  useAuth();
  const { data: tiposPlaga, error } = useFetchTiposPlaga();
  const { mutate: deleteTipoPlaga } = useDeleteTipoPlaga();
  const [tipoPlagaSeleccionado, setTipoPlagaSeleccionado] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoPlagaAEliminar, setTipoPlagaAEliminar] = useState<string | null>(null);

  if (error) return <p>Error al cargar los tipos de plaga</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Tipos de Plaga Registrados</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tiposPlaga?.map((tipoPlaga) => (
              <tr key={tipoPlaga.id} className="border-b">
                <td className="px-4 py-2">{tipoPlaga.tipo}</td>
                <td className="px-4 py-2">{tipoPlaga.descripcion}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button
                    onClick={() => setTipoPlagaSeleccionado(tipoPlaga.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => setTipoPlagaAEliminar(tipoPlaga.id)}
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
        Registrar un Tipo de Plaga
      </Button>

      {mostrarModal && <RegisterTipoPlagaModal onClose={() => setMostrarModal(false)} />}

      {tipoPlagaSeleccionado && (
        <EditarTipoPlagaModal id={tipoPlagaSeleccionado} onClose={() => setTipoPlagaSeleccionado(null)} />
      )}

      {tipoPlagaAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">¿Eliminar Tipo de Plaga?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setTipoPlagaAEliminar(null)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteTipoPlaga(tipoPlagaAEliminar);
                  setTipoPlagaAEliminar(null);
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

export default TipoPlagaList;
