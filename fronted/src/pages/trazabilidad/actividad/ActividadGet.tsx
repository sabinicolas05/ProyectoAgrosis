import { useState } from "react";
import { useFetchActividad } from "@/hooks/trazabilidad/actividad/useFetchActividad";
import { useDeleteActividad } from "@/hooks/trazabilidad/actividad/useDeleteActividad";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarActividadModal from "@/pages/trazabilidad/actividad/EditarActividad";
import RegisterActividadModal from "@/pages/trazabilidad/actividad/RegisterActividad";
import useAuth from "@/hooks/auth/useAuth";

const ActividadList = () => {
  useAuth();
  const { data: actividades, error } = useFetchActividad();
  const { mutate: deleteActividad } = useDeleteActividad();
  const [actividadSeleccionada, setActividadSeleccionada] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [actividadAEliminar, setActividadAEliminar] = useState<string | null>(null);

  if (error) return <p>Error al cargar las actividades</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Actividades Registradas</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Bancal</th>
              <th className="px-4 py-2">Fecha Inicio</th>
              <th className="px-4 py-2">Fecha Fin</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {actividades?.map((actividad) => (
              <tr key={actividad.id} className="border-b">
                <td className="px-4 py-2">{actividad.id}</td>
                <td className="px-4 py-2">{actividad.descripcion}</td>
                <td className="px-4 py-2">{actividad.fk_usuario_nombre || "Sin usuario"}</td>
                <td className="px-4 py-2">{actividad.fk_bancal_nombre || "Sin bancal"}</td>
                <td className="px-4 py-2">{actividad.fecha_inicio}</td>
                <td className="px-4 py-2">{actividad.fecha_fin}</td>
                <td className="px-4 py-2">{actividad.estado ? "Activa" : "Inactiva"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button
                    onClick={() => setActividadSeleccionada(actividad.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => setActividadAEliminar(actividad.id)}
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
        Registrar una Actividad
      </Button>

      {mostrarModal && <RegisterActividadModal onClose={() => setMostrarModal(false)} />}

      {actividadSeleccionada && (
        <EditarActividadModal id={actividadSeleccionada} onClose={() => setActividadSeleccionada(null)} />
      )}

      {actividadAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">¿Eliminar Actividad?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setActividadAEliminar(null)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteActividad(actividadAEliminar);
                  setActividadAEliminar(null);
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

export default ActividadList;
