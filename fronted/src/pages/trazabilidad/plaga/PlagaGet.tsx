import { useState } from "react";
import { useFetchPlagas } from "@/hooks/trazabilidad/plaga/useFetchPlaga";
import { useDeletePlaga } from "@/hooks/trazabilidad/plaga/useDeletePlaga";
import useFetchPlagaOptions from "@/hooks/trazabilidad/plaga/Map_plaga";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarPlagaModal from "@/pages/trazabilidad/plaga/EditarPlaga";
import RegisterPlagaModal from "@/pages/trazabilidad/plaga/RegisterPlaga";
import useAuth from "@/hooks/auth/useAuth";

const PlagasList = () => {
  useAuth();
  const { data: plagas, error } = useFetchPlagas();
  const { tiposPlaga } = useFetchPlagaOptions();
  const { mutate: deletePlaga } = useDeletePlaga();
  const [plagaSeleccionada, setPlagaSeleccionada] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [plagaAEliminar, setPlagaAEliminar] = useState<string | null>(null);

  if (error) return <p>Error al cargar plagas</p>;

  // Asegurarnos de que tenemos los tipos de plaga
  console.log("Tipos de plaga:", tiposPlaga);
  console.log("Plagas:", plagas);

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Plagas Registradas</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Tipo de Plaga</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
  {plagas?.map((plaga) => {
    // Usamos el campo tipo_plaga_nombre del serializer para obtener el nombre del tipo
    const tipoPlaga = plaga.fk_tipo_plaga_tipo ?? "Tipo de plaga no disponible";
    return (
      <tr key={plaga.id} className="border-b">
        <td className="px-4 py-2">{plaga.nombre}</td>
        <td className="px-4 py-2">{tipoPlaga}</td>
        <td className="px-4 py-2 flex gap-2">
          <Button
            onClick={() => setPlagaSeleccionada(plaga.id)}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            Editar
          </Button>
          <Button
            onClick={() => setPlagaAEliminar(plaga.id)}
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
        Registrar una Plaga
      </Button>

      {mostrarModal && <RegisterPlagaModal onClose={() => setMostrarModal(false)} />}

      {plagaSeleccionada && (
        <EditarPlagaModal id={plagaSeleccionada} onClose={() => setPlagaSeleccionada(null)} />
      )}

      {plagaAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">¿Eliminar Plaga?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setPlagaAEliminar(null)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deletePlaga(plagaAEliminar);
                  setPlagaAEliminar(null);
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

export default PlagasList;
