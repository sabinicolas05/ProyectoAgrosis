import { useState, useEffect } from "react";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import useFetchPlagaOptions from "@/hooks/trazabilidad/plaga/Map_plaga";
import useAuth from "@/hooks/auth/useAuth";
import { useCreatePlaga } from "@/hooks/trazabilidad/plaga/useCreatePlaga";
import { useFetchPlagaById } from "@/hooks/trazabilidad/plaga/useFetchPlagaById";
import { useUpdatePlaga } from "@/hooks/trazabilidad/plaga/useUpdatePlaga";

const PlagaModal = ({ id = null, onClose }) => {
  useAuth();
  
  const isEditMode = Boolean(id);
  const { tiposPlaga } = useFetchPlagaOptions();
  const { mutate: createPlaga, isLoading: isCreating } = useCreatePlaga();
  const { data: plaga, isLoading: isFetching } = useFetchPlagaById(id);
  const { mutate: updatePlaga, isLoading: isUpdating } = useUpdatePlaga();

  const [formData, setFormData] = useState({
    nombre: "",
    fk_tipo_plaga: "",
  });

  useEffect(() => {
    if (isEditMode && plaga && !isFetching) {
      setFormData({
        nombre: plaga.nombre ?? "",
        fk_tipo_plaga: plaga.fk_tipo_plaga?.id ?? "",
      });
    }
  }, [plaga, isFetching, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.fk_tipo_plaga) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    const action = isEditMode ? updatePlaga : createPlaga;
    const successMessage = isEditMode ? "Plaga actualizada correctamente" : "Plaga registrada correctamente";
    const errorMessage = isEditMode ? "Error al actualizar plaga" : "Error al registrar plaga";

    action(isEditMode ? { id, ...formData } : formData, {
      onSuccess: () => {
        toast.success(`✅ ${successMessage}`);
        onClose();
      },
      onError: (error) => {
        console.error(`❌ ${errorMessage}:`, error);
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">{isEditMode ? "Editar Plaga" : "Registrar Plaga"}</h2>
        {isEditMode && isFetching ? (
          <p className="text-center text-gray-500">Cargando plaga...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Nombre *</label>
            <br />
            <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            
            <label>Tipo de Plaga *</label>
            <br />
            <select name="fk_tipo_plaga" value={formData.fk_tipo_plaga} onChange={handleChange} required>
              <option value="">Seleccione un tipo de plaga</option>
              {tiposPlaga?.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
              ))}
            </select>

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={isCreating || isUpdating}>
                {(isCreating || isUpdating) ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PlagaModal;
