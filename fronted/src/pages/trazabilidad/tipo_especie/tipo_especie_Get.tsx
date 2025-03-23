import { useState } from "react";
import { useFetchTipoEspecie } from "@/hooks/trazabilidad/tipo_especie/useFetchTipoEspecie";
import { useDeleteTipoEspecie } from "@/hooks/trazabilidad/tipo_especie/useDeleteTipoEspecie";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarTipoEspecieModal from "@/pages/trazabilidad/tipo_especie/EditarTipoEspecie";
import RegisterTipoEspecieModal from "@/pages/trazabilidad/tipo_especie/RegisterTipoEspecie";
import useAuth from "@/hooks/auth/useAuth";

const TipoEspecieList = () => {
  useAuth();
  const { data: tipoEspecies, error } = useFetchTipoEspecie();
  const { mutate: deleteTipoEspecie } = useDeleteTipoEspecie();
  const [tipoEspecieSeleccionado, setTipoEspecieSeleccionado] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoEspecieAEliminar, setTipoEspecieAEliminar] = useState<string | null>(null);

  if (error) return <p>Error al cargar los tipos de especie</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Tipos de Especie Registrados</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Tiempo de Crecimiento</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tipoEspecies?.map((tipoEspecie) => (
              <tr key={tipoEspecie.id} className="border-b">
                <td className="px-4 py-2">{tipoEspecie.id}</td>
                <td className="px-4 py-2">{tipoEspecie.tipo}</td>
                <td className="px-4 py-2">{tipoEspecie.descripcion}</td>
                <td className="px-4 py-2">{tipoEspecie.tiempo_crecimiento} días</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button
                    onClick={() => setTipoEspecieSeleccionado(tipoEspecie.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => setTipoEspecieAEliminar(tipoEspecie.id)}
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
        Registrar un Tipo de Especie
      </Button>

      {mostrarModal && <RegisterTipoEspecieModal onClose={() => setMostrarModal(false)} />}

      {tipoEspecieSeleccionado && (
        <EditarTipoEspecieModal id={tipoEspecieSeleccionado} onClose={() => setTipoEspecieSeleccionado(null)} />
      )}

      {tipoEspecieAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">¿Eliminar Tipo de Especie?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setTipoEspecieAEliminar(null)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteTipoEspecie(tipoEspecieAEliminar);
                  setTipoEspecieAEliminar(null);
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

export default TipoEspecieList;
