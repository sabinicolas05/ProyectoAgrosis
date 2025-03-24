import { useState, useEffect } from "react";
import { useFetchPagoById } from "@/hooks/finanzas/pagos/useFetchPagoById";
import { useUpdatePago } from "@/hooks/finanzas/pagos/useUpdatePago";
import useAuth from "@/hooks/useAuth";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";

const EditarPagoModal = ({ id, onClose }) => {
  useAuth();
  const { data: pago, isLoading } = useFetchPagoById(id);
  const { mutate: updatePago, isLoading: isUpdating } = useUpdatePago();

  const [formData, setFormData] = useState({
    cantidad: "",
    fecha: "",
    fk_asignacion_actividad_id: "",
  });

  useEffect(() => {
    if (pago && !isLoading) {
      setFormData({
        cantidad: pago.cantidad ?? "",
        fecha: pago.fecha ?? "",
        fk_asignacion_actividad_id: pago.fk_asignacion_actividad_id ?? "",
      });
    }
  }, [pago, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.cantidad || !formData.fecha || !formData.fk_asignacion_actividad_id) {
      toast.error("⚠️ Todos los campos con * son obligatorios.");
      return;
    }

    updatePago({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Pago actualizado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar pago:", error);
        toast.error("❌ Error al actualizar pago");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Pago</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando pago...</p>
        ) : (
          <form onSubmit={handleUpdate}>
            <label>Cantidad *</label>
            <Input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />

            <label>Fecha *</label>
            <Input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />

            <label>Asignación de Actividad *</label>
            <Input type="number" name="fk_asignacion_actividad_id" value={formData.fk_asignacion_actividad_id} onChange={handleChange} required />

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

export default EditarPagoModal;
