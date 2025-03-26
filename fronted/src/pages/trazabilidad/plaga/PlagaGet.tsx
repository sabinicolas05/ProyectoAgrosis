import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/global/ReuInput";
import { addToast } from "@/components/global/toastUtils";
import { useNavigate } from "react-router-dom";
import { useFetchPlagas, useDeletePlaga, useUpdatePlaga } from "@/hooks/trazabilidad/plaga/usePlaga";
import { Plaga } from "@/components/types/Plaga";
import Tabla from "@/components/global/Tabla";
import ReuModal from "@/components/global/ReuModal";
import PlagaModal from "@/pages/trazabilidad/plaga/PlagaForm";
import useFetchPlagaOptions from "@/hooks/trazabilidad/plaga/Map_plaga";



const PlagasList: React.FC = () => {
  const [plaga, setPlaga] = useState<Plaga>({
    id: undefined,
    nombre: "",
    fk_tipo_plaga: "",
  });

  const [selectedPlaga, setSelectedPlaga] = useState<Plaga | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const { data: plagas, isLoading } = useFetchPlagas();
  const eliminarMutation = useDeletePlaga();
  const actualizarMutation = useUpdatePlaga();
  const navigate = useNavigate();
  const { tiposPlaga } = useFetchPlagaOptions();

  const columns = [
    { name: "Nombre", uid: "nombre" },
    { name: "Tipo de Plaga", uid: "fk_tipo_plaga" },
    { name: "Acciones", uid: "acciones" },
  ];

  const handleEdit = (plaga: Plaga) => {
    setSelectedPlaga(plaga);
    setPlaga({
      id: plaga.id,
      nombre: plaga.nombre || "",
      fk_tipo_plaga: plaga.fk_tipo_plaga || "",
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (plaga: Plaga) => {
    setSelectedPlaga(plaga);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPlaga && selectedPlaga.id !== undefined) {
      eliminarMutation.mutate(selectedPlaga.id, {
        onSuccess: () => {
          addToast({ title: "Éxito", description: "Plaga eliminada correctamente", variant: "success" });
          setIsDeleteModalOpen(false);
        },
        onError: () => {
          addToast({ title: "Error", description: "No se pudo eliminar la plaga", variant: "destructive" });
        },
      });
    }
  };

  const handleConfirmEdit = () => {
    if (selectedPlaga && selectedPlaga.id) {
      actualizarMutation.mutate({
        id: selectedPlaga.id,
        nombre: plaga.nombre,
        fk_tipo_plaga: plaga.fk_tipo_plaga,
      });
      setIsEditModalOpen(false);
    }
  };

  const transformedData = (plagas ?? []).map((plaga) => ({
    id: plaga.id?.toString() || "",
    nombre: plaga.nombre,
    fk_tipo_plaga: plaga.fk_tipo_plaga_tipo || "No disponible",
    acciones: (
      <>
        <button
          className="text-green-500 hover:underline mr-2"
          onClick={() => handleEdit(plaga)}
        >
          Editar
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => handleDelete(plaga)}
        >
          Eliminar
        </button>
      </>
    ),
  }));

  return (
    <>
      <DefaultLayout>
        <div className="w-full flex flex-col items-center min-h-screen p-6">
          <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Plagas</h2>

            {isLoading ? (
              <p className="text-gray-600">Cargando...</p>
            ) : (
              <>
                <Tabla columns={columns} data={transformedData} />
                <div className="flex justify-end mt-4">
                  <button
                    className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg 
                               hover:bg-blue-700 transition-all duration-300 ease-in-out 
                               shadow-md hover:shadow-lg transform hover:scale-105"
                    onClick={() => setIsRegisterModalOpen(true)}
                  >
                    Registrar Plaga
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </DefaultLayout>

      <ReuModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        title="Editar Plaga"
        onConfirm={handleConfirmEdit}
      >
        <ReuInput
          label="Nombre"
          placeholder="Ingrese el nombre"
          type="text"
          value={plaga.nombre || ""}
          onChange={(e) => setPlaga({ ...plaga, nombre: e.target.value })}
        />
        <label>Tipo de Plaga *</label>
        <select
          name="fk_tipo_plaga"
          value={plaga.fk_tipo_plaga}
          onChange={(e) => setPlaga({ ...plaga, fk_tipo_plaga: e.target.value })}
          required
        >
          <option value="">Seleccione un tipo de plaga</option>
          {tiposPlaga?.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
          ))}
        </select>
      </ReuModal>

      <ReuModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="¿Estás seguro de eliminar esta plaga?"
        onConfirm={handleConfirmDelete}
      >
        <p>Esta acción es irreversible.</p>
      </ReuModal>

      {isRegisterModalOpen && (
        <PlagaModal id={null} onClose={() => setIsRegisterModalOpen(false)} />
      )}
    </>

    
  );
};

export default PlagasList;
