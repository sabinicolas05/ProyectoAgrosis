import { useState, useEffect } from "react";
import { useFetchInventarioById } from "@/hooks/inventario/inventarios/useFetchInventarioById";
import { useUpdateInventario } from "@/hooks/inventario/inventarios/useUpdateInventario";
import useAuth from "@/hooks/useAuth";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";

const EditarInventarioModal = ({ id, onClose }) => {
  useAuth();

  const { data: inventario, isLoading } = useFetchInventarioById(id);
  const { mutate: updateInventario, isLoading: isUpdating } = useUpdateInventario();

  const [formData, setFormData] = useState({
    fk_herramienta: "",
    fk_insumo: "",
  });

  useEffect(() => {
    if (inventario && !isLoading) {
      setFormData({
        fk_herramienta: inventario.fk_herramienta ?? "",
        fk_insumo: inventario.fk_insumo ?? "",
      });
    }
  }, [inventario, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fk_herramienta || !formData.fk_insumo) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    updateInventario({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Inventario actualizado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar inventario:", error);
        toast.error("Error al actualizar inventario.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Inventario</h2>
        {isLoading ? (
          <p className="text-center text-gray-500">Cargando datos...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Herramienta *</label>
            <Input
              type="text"
              name="fk_herramienta"
              value={formData.fk_herramienta}
              onChange={handleChange}
              required
            />

            <label>Insumo *</label>
            <Input
              type="text"
              name="fk_insumo"
              value={formData.fk_insumo}
              onChange={handleChange}
              required
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isUpdating} className="bg-blue-500 text-white px-4 py-2 rounded">
                {isUpdating ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditarInventarioModal;
