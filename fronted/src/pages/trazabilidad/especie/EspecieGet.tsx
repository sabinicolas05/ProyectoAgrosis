  import { useState } from "react";
  import { useFetchEspecie } from "@/hooks/trazabilidad/especie/useFetchEspecie";
  import { useDeleteEspecie } from "@/hooks/trazabilidad/especie/useDeleteEspecie";
  import DefaultLayout from "@/layouts/default";
  import { Button } from "@heroui/react";
  import EditarEspecieModal from "@/pages/trazabilidad/especie/EditarEspecie";
  import RegisterEspecieModal from "@/pages/trazabilidad/especie/RegisterEspecie";
  import useAuth from "@/hooks/auth/useAuth";

  const EspeciesList = () => {
    useAuth();
    const { data: especies, error } = useFetchEspecie();
    const { mutate: deleteEspecie } = useDeleteEspecie();
    const [especieSeleccionada, setEspecieSeleccionada] = useState<string | null>(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [especieAEliminar, setEspecieAEliminar] = useState<string | null>(null);

    if (error) return <p>Error al cargar las especies</p>;

    return (
      
      <DefaultLayout>
        <div className="overflow-x-auto">
          <h2 className="text-lg font-bold mb-4">Especies Registradas</h2>
          <table className="min-w-full bg-white border border-gray-300 shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Tipo de Especie</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>

              {especies?.map((especie) => (
                <tr key={especie.id} className="border-b">
                  <td className="px-4 py-2">{especie.id}</td>
                  <td className="px-4 py-2">{especie.nombre}</td>
                  <td>{especie.fk_tipo_especie_nombre || "Sin tipo"}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button
                      onClick={() => setEspecieSeleccionada(especie.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => setEspecieAEliminar(especie.id)}
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
          Registrar una Especie
        </Button>

        {mostrarModal && <RegisterEspecieModal onClose={() => setMostrarModal(false)} />}

        {especieSeleccionada && (
          <EditarEspecieModal id={especieSeleccionada} onClose={() => setEspecieSeleccionada(null)} />
        )}

        {especieAEliminar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 shadow-md rounded-lg w-96">
              <h2 className="text-lg font-bold mb-4">¿Eliminar Especie?</h2>
              <p className="mb-4">Esta acción no se puede deshacer.</p>
              <div className="flex justify-end gap-2">
                <Button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setEspecieAEliminar(null)}>
                  Cancelar
                </Button>
                <Button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    deleteEspecie(especieAEliminar);
                    setEspecieAEliminar(null);
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

  export default EspeciesList;