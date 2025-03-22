import { useState, useEffect } from "react";
import { useFetchInsumoById } from "@/hooks/inventario/insumos/useFetchInsumoById"; // Cambio aquí
import { useUpdateInsumo } from "@/hooks/inventario/insumos/useUpdateInsumo"; // Cambio aquí
import useAuth from "@/hooks/useAuth";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";

const EditarInsumoModal = ({ id, onClose }) => { // Cambio aquí
  useAuth();
  const { data: insumo, isLoading } = useFetchInsumoById(id); // Cambio aquí
  const { mutate: updateInsumo, isLoading: isUpdating } = useUpdateInsumo(); // Cambio aquí

  const [formData, setFormData] = useState({
    cantidad: "",
    precio: "",
    tipo_empacado: "",
    tipo: "",
    unidadMedida: "",
  });

  useEffect(() => {
    if (insumo && !isLoading) {
      setFormData({
        cantidad: insumo.cantidad ?? "",
        precio: insumo.precio ?? "",
        tipo_empacado: insumo.tipo_empacado ?? "",
        tipo: insumo.tipo ?? "",
        unidadMedida: insumo.unidadMedida ?? "",
      });
    }
  }, [insumo, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.cantidad || !formData.precio || !formData.tipo || !formData.unidadMedida) {
      toast.error("⚠️ Todos los campos con * son obligatorios.");
      return;
    }

    updateInsumo({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Insumo actualizado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar insumo:", error);
        toast.error("❌ Error al actualizar insumo");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Insumo</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando insumo...</p>
        ) : (
          <form onSubmit={handleUpdate}>
            <label>Cantidad *</label>
            <Input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />

            <label>Precio *</label>
            <Input type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange} required />

            <label>Tipo de Empaque</label>
            <Input type="text" name="tipo_empacado" value={formData.tipo_empacado} onChange={handleChange} />

            <label>Tipo *</label>
            <Input type="text" name="tipo" value={formData.tipo} onChange={handleChange} required />

            <label>Unidad de Medida *</label>
            <Input type="text" name="unidadMedida" value={formData.unidadMedida} onChange={handleChange} required />

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

export default EditarInsumoModal; // Cambio aquí
