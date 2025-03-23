import { useState } from "react";
import { useFetchSemilleros } from "@/hooks/trazabilidad/semillero/useFetchSemillero";
import { useDeleteSemillero } from "@/hooks/trazabilidad/semillero/useDeleteSemillero";
import useFetchSemilleroOptions from "@/hooks/trazabilidad/semillero/Map.semillero";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarSemilleroModal from "@/pages/trazabilidad/semillero/EditarSemillero";
import RegisterSemilleroModal from "@/pages/trazabilidad/semillero/RegisterSemillero";
import useAuth from "@/hooks/auth/useAuth";

const SemillerosList = () => {
  useAuth();
  const { data: semilleros, error } = useFetchSemilleros();
  const { especies, lotes } = useFetchSemilleroOptions(); // Importamos las especies y lotes
  const { mutate: deleteSemillero } = useDeleteSemillero();
  const [semilleroSeleccionado, setSemilleroSeleccionado] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [semilleroAEliminar, setSemilleroAEliminar] = useState<string | null>(null);

  if (error) return <p>Error al cargar semilleros</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Semilleros Registrados</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Especie</th>
              <th className="px-4 py-2">Lote</th>
              <th className="px-4 py-2">Fecha Siembra</th>
              <th className="px-4 py-2">Fecha Estimada</th>
              <th className="px-4 py-2">Unidades</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {semilleros?.map((semillero) => {
              const especie = especies.find((e) => e.id === semillero.fk_especie);
              const lote = lotes.find((l) => l.id === semillero.fk_lote);

              return (
                <tr key={semillero.id} className="border-b">
                  <td className="px-4 py-2">{semillero.nombre_semilla}</td>
                  <td className="px-4 py-2">{especie?.nombre || "N/A"}</td>
                  <td className="px-4 py-2">{lote?.nombre || "N/A"}</td>
                  <td className="px-4 py-2">{semillero.fecha_siembra}</td>
                  <td className="px-4 py-2">{semillero.fecha_estimada}</td>
                  <td className="px-4 py-2">{semillero.unidades}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button
                      onClick={() => setSemilleroSeleccionado(semillero.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => setSemilleroAEliminar(semillero.id)}
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
        Registrar un Semillero
      </Button>

      {mostrarModal && <RegisterSemilleroModal onClose={() => setMostrarModal(false)} />}

      {semilleroSeleccionado && (
        <EditarSemilleroModal id={semilleroSeleccionado} onClose={() => setSemilleroSeleccionado(null)} />
      )}

      {semilleroAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">¿Eliminar Semillero?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setSemilleroAEliminar(null)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteSemillero(semilleroAEliminar);
                  setSemilleroAEliminar(null);
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

export default SemillerosList;
