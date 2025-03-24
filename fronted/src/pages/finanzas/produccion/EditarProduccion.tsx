import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import { useFetchProduccionById } from './../../../hooks/finanzas/produccion/useFetchProduccionById';
import { useUpdateProduccion } from './../../../hooks/finanzas/produccion/useUpdateProduccion';

const EditarProduccionModal = ({ id, onClose }) => {
  useAuth();
  const { data: produccion, isLoading } = useFetchProduccionById(id);
  const { mutate: updateProduccion, isLoading: isUpdating } = useUpdateProduccion();

  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    contenido: "",
    unidades: "",
    fk_cultivo_id: "",
    fk_usuario_id: "",
  });

  useEffect(() => {
    if (produccion && !isLoading) {
      setFormData({
        nombre: produccion.nombre ?? "",
        precio: produccion.precio ?? "",
        contenido: produccion.contenido ?? "",
        unidades: produccion.unidades ?? "",
        fk_cultivo_id: produccion.fk_cultivo_id ?? "",
        fk_usuario_id: produccion.fk_usuario_id ?? "",
      });
    }
  }, [produccion, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { nombre, precio, contenido, unidades, fk_cultivo_id, fk_usuario_id } = formData;

    if (!nombre || !precio || !contenido || !unidades || !fk_cultivo_id || !fk_usuario_id) {
      toast.error("⚠️ Todos los campos con * son obligatorios.");
      return;
    }

    updateProduccion({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Producción actualizada correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar producción:", error);
        toast.error("❌ Error al actualizar producción");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Producción</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando producción...</p>
        ) : (
          <form onSubmit={handleUpdate}>
            <label>Nombre *</label>
            <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

            <label>Precio *</label>
            <Input type="number" name="precio" value={formData.precio} onChange={handleChange} required />

            <label>Contenido *</label>
            <Input type="text" name="contenido" value={formData.contenido} onChange={handleChange} required />

            <label>Unidades *</label>
            <Input type="number" name="unidades" value={formData.unidades} onChange={handleChange} required />

            <label>Cultivo *</label>
            <Input type="number" name="fk_cultivo_id" value={formData.fk_cultivo_id} onChange={handleChange} required />

            <label>Usuario *</label>
            <Input type="number" name="fk_usuario_id" value={formData.fk_usuario_id} onChange={handleChange} required />

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

export default EditarProduccionModal;
