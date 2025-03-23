import { useState } from "react";
import { useFetchBancales } from "@/hooks/trazabilidad/bancal/useFetchBancal";
import { useDeleteBancal } from "@/hooks/trazabilidad/bancal/useDeleteBancal";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarBancalModal from "@/pages/trazabilidad/bancal/EditarBancal";
import RegisterBancalModal from "@/pages/trazabilidad/bancal/RegisterBancal";
import useAuth from "@/hooks/auth/useAuth";

const BancalesList = () => {
  useAuth();
  const { data: bancales, error } = useFetchBancales();
  const { mutate: deleteBancal } = useDeleteBancal();
  const [bancalSeleccionado, setBancalSeleccionado] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [bancalAEliminar, setBancalAEliminar] = useState<string | null>(null);

  if (error) return <p>Error al cargar los bancales</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Bancales Registrados</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Ubicación</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bancales?.map((bancal) => (
              <tr key={bancal.id} className="border-b">
                <td className="px-4 py-2">{bancal.id}</td>
                <td className="px-4 py-2">{bancal.nombre}</td>
                <td className="px-4 py-2">{bancal.descripcion}</td>
                <td className="px-4 py-2">{bancal.ubicacion}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button
                    onClick={() => setBancalSeleccionado(bancal.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => setBancalAEliminar(bancal.id)}
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
        Registrar un Bancal
      </Button>

      {mostrarModal && <RegisterBancalModal onClose={() => setMostrarModal(false)} />}

      {bancalSeleccionado && (
        <EditarBancalModal id={bancalSeleccionado} onClose={() => setBancalSeleccionado(null)} />
      )}

      {bancalAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">¿Eliminar Bancal?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setBancalAEliminar(null)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  deleteBancal(bancalAEliminar);
                  setBancalAEliminar(null);
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

export default BancalesList;