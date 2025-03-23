import { useState } from "react";
import { useFetchCultivo } from "@/hooks/trazabilidad/cultivo/useFetchCultivo";
import  useFetchCultivoMap  from "@/hooks/trazabilidad/cultivo/CultivoMap";
import { useDeleteCultivo } from "@/hooks/trazabilidad/cultivo/useDeleteCultivo";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarCultivoModal from "@/pages/trazabilidad/cultivo/editarCultivo";
import RegisterCultivoModal from "@/pages/trazabilidad/cultivo/registerCultivo";
import useAuth from "@/hooks/auth/useAuth";

const CultivosList = () => {
  useAuth();
  const { data: cultivos, error } = useFetchCultivo();
  const { data: cultivoMap } = useFetchCultivoMap();
  const { mutate: deleteCultivo } = useDeleteCultivo();
  const [cultivoSeleccionado, setCultivoSeleccionado] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cultivoAEliminar, setCultivoAEliminar] = useState<string | null>(null);

  if (error) return <p>Error al cargar los cultivos</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Cultivos Registrados</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Especie</th>
              <th className="px-4 py-2">Semillero</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Fecha de Siembra</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cultivos?.map((cultivo) => (
              <tr key={cultivo.id} className="border-b">
                <td className="px-4 py-2">{cultivo.id}</td>
                <td className="px-4 py-2">{cultivo.nombre}</td>
                <td>{cultivo.fk_especie_nombre || "Sin especie"}</td>
                <td>{cultivo.fk_semillero_nombre || "Sin semillero"}</td>
                <td className="px-4 py-2">{cultivo.cantidad}</td>
                <td className="px-4 py-2">{cultivo.fecha_siembra}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button
                    onClick={() => setCultivoSeleccionado(cultivo.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => setCultivoAEliminar(cultivo.id)}
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
        Registrar un Cultivo
      </Button>

      {mostrarModal && <RegisterCultivoModal onClose={() => setMostrarModal(false)} />}

      {cultivoSeleccionado && (
        <EditarCultivoModal id={cultivoSeleccionado} onClose={() => setCultivoSeleccionado(null)} />
      )}

      {cultivoAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">¿Eliminar Cultivo?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setCultivoAEliminar(null)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteCultivo(cultivoAEliminar);
                  setCultivoAEliminar(null);
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

export default CultivosList;
