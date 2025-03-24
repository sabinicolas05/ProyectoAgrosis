import { useState, useEffect } from "react";
import { useFetchTipoInsumoById } from "@/hooks/inventario/tipoinsumo/useFetchTipoInsumoById";
import { useUpdateTipoInsumo } from "@/hooks/inventario/tipoinsumo/useUpdateTipoInsumo";
import useAuth from "@/hooks/useAuth";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";

const EditarTipoInsumoModal = ({ id, onClose }) => {
  useAuth();
  const { data: tipoInsumo, isLoading } = useFetchTipoInsumoById(id);
  const { mutate: updateTipoInsumo, isLoading: isUpdating } = useUpdateTipoInsumo();

  const [formData, setFormData] = useState({
    tipo: "",
  });

  useEffect(() => {
    if (tipoInsumo && !isLoading) {
      setFormData({
        tipo: tipoInsumo.tipo ?? "",
      });
    }
  }, [tipoInsumo, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.tipo) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    updateTipoInsumo({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Tipo de insumo actualizado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar el tipo de insumo:", error);
        toast.error("❌ Error al actualizar el tipo de insumo");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar tipo de insumo</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando tipo de insumo...</p>
        ) : (
          <form onSubmit={handleUpdate}>
            <label>Tipo *</label>
            <Input type="text" name="tipo" value={formData.tipo} onChange={handleChange} required />

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

export default EditarTipoInsumoModal;
