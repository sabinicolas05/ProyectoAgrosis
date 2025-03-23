import { useState, useEffect } from "react";
import { useFetchLoteById } from "@/hooks/trazabilidad/lote/useFetchLoteById";
import { useUpdateLote } from "@/hooks/trazabilidad/lote/useUpdateLote";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import useAuth from "@/hooks/auth/useAuth";

const EditarLoteModal = ({ id, onClose }) => {
  useAuth();

  // Obtener datos del lote
  const { data: lote, isLoading } = useFetchLoteById(id);
  const { mutate: updateLote, isLoading: isUpdating } = useUpdateLote();

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    ubicacion: "",
  });

  useEffect(() => {
    if (lote && !isLoading) {
      setFormData({
        nombre: lote.nombre ?? "",
        descripcion: lote.descripcion ?? "",
        ubicacion: lote.ubicacion ?? "",
      });
    }
  }, [lote, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.descripcion || !formData.ubicacion) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    updateLote({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Lote actualizado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar lote:", error);
        toast.error("Error al actualizar lote.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Lote</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando lote...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Nombre *</label>
            <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

            <label>Descripción *</label>
            <Input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} required />

            <label>Ubicación *</label>
            <Input type="number" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />

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

export default EditarLoteModal;