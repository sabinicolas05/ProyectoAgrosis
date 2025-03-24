import { useState } from "react";
import { Button, Input } from "@heroui/react";
import useAuth from "@/hooks/useAuth";
import { useCreatePago } from "@/hooks/finanzas/pagos/useCreatePago";
import { toast } from "react-toastify";

const RegisterPagoModal = ({ onClose }) => {
  useAuth();
  const { mutate: createPago, isLoading } = useCreatePago();

  const [formData, setFormData] = useState({
    cantidad: "",
    fecha: "",
    fk_asignacion_actividad_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!formData.cantidad || !formData.fecha || !formData.fk_asignacion_actividad_id) {
      toast.error("⚠️ Todos los campos con * son obligatorios.");
      return;
    }

    console.log("📤 Enviando datos al backend:", formData);

    createPago(formData, {
      onSuccess: () => {
        toast.success("✅ Pago registrado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar el pago:", error);
        toast.error("❌ Error al registrar el pago.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">💵 Registrar Pago</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <label>Cantidad *</label>
          <Input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />

          <label>Fecha *</label>
          <Input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />

          <label>Asignación de Actividad *</label>
          <Input type="number" name="fk_asignacion_actividad_id" value={formData.fk_asignacion_actividad_id} onChange={handleChange} required />

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>
              ❌ Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded">
              {isLoading ? "Registrando..." : "✅ Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPagoModal;
