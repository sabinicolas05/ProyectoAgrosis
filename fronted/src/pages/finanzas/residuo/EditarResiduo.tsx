import { useState, useEffect } from "react";
import { useFetchResiduoById } from "@/hooks/finanzas/residuos/useFetchResiduoById";
import { useUpdateResiduo } from "@/hooks/finanzas/residuos/useUpdateResiduo";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";

const EditarResiduoModal = ({ id, onClose }: { id: string; onClose: () => void }) => {
  const { data: residuo, isLoading } = useFetchResiduoById(id);
  const { mutate: updateResiduo, isLoading: isUpdating } = useUpdateResiduo();

  const [formData, setFormData] = useState({
    cantidad: "",
    tipo_residuo: "",
    fk_cultivo_id: "",
  });

  useEffect(() => {
    if (residuo && !isLoading) {
      setFormData({
        cantidad: residuo.cantidad.toString() ?? "",
        tipo_residuo: residuo.tipo_residuo ?? "",
        fk_cultivo_id: residuo.fk_cultivo_id.toString() ?? "",
      });
    }
  }, [residuo, isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const { cantidad, tipo_residuo, fk_cultivo_id } = formData;

    if (!cantidad || !tipo_residuo || !fk_cultivo_id) {
      toast.error("⚠️ Todos los campos con * son obligatorios.");
      return;
    }

    updateResiduo(
      { id, cantidad: parseInt(cantidad), tipo_residuo, fk_cultivo_id: parseInt(fk_cultivo_id) },
      {
        onSuccess: () => {
          toast.success("✅ Residuo actualizado correctamente");
          onClose(); // Cierra el modal tras éxito
        },
        onError: (error) => {
          console.error("❌ Error al actualizar residuo:", error);
          toast.error("❌ Error al actualizar residuo");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Residuo</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando residuo...</p>
        ) : (
          <form onSubmit={handleUpdate}>
            <label>Cantidad *</label>
            <Input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              required
            />

            <label>Tipo de Residuo *</label>
            <Input
              type="text"
              name="tipo_residuo"
              value={formData.tipo_residuo}
              onChange={handleChange}
              required
            />

            <label>Cultivo *</label>
            <Input
              type="number"
              name="fk_cultivo_id"
              value={formData.fk_cultivo_id}
              onChange={handleChange}
              required
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={isUpdating}
              >
                {isUpdating ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditarResiduoModal;
