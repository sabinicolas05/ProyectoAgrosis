import { useState, useEffect } from "react";
import { useFetchTipoEspecieById } from "@/hooks/trazabilidad/tipo_especie/useFetchTipoEspecieById";
import { useUpdateTipoEspecie } from "@/hooks/trazabilidad/tipo_especie/useUpdateTipoEspecie";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import useAuth from "@/hooks/auth/useAuth";

const EditarTipoEspecieModal = ({ id, onClose }) => {
  useAuth();

  // Obtener datos del tipo de especie
  const { data: tipoEspecie, isLoading } = useFetchTipoEspecieById(id);
  const { mutate: updateTipoEspecie, isLoading: isUpdating } = useUpdateTipoEspecie();

  const [formData, setFormData] = useState({
    tipo: "",
    descripcion: "",
    tiempo_crecimiento: "",
  });

  useEffect(() => {
    if (tipoEspecie && !isLoading) {
      setFormData({
        tipo: tipoEspecie.tipo ?? "",
        descripcion: tipoEspecie.descripcion ?? "",
        tiempo_crecimiento: tipoEspecie.tiempo_crecimiento ?? "",
      });
    }
  }, [tipoEspecie, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.tipo || !formData.descripcion || !formData.tiempo_crecimiento) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    updateTipoEspecie({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Tipo de Especie actualizado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar tipo de especie:", error);
        toast.error("Error al actualizar tipo de especie.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Tipo de Especie</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando datos...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Tipo *</label>
            <Input type="text" name="tipo" value={formData.tipo} onChange={handleChange} required />

            <label>Descripción *</label>
            <Input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} required />

            <label>Tiempo de Crecimiento (días) *</label>
            <Input type="number" name="tiempo_crecimiento" value={formData.tiempo_crecimiento} onChange={handleChange} required />

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={isUpdating}>
                {isUpdating ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditarTipoEspecieModal;
