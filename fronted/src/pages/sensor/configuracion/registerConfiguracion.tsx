import { useState } from "react";
import { Button, Input } from "@heroui/react";
import useAuth from "@/hooks/useAuth";
import { useCreateConfiguracion } from "@/hooks/sensores/configuracion/useCreateConfiguracion";
import { toast } from "react-toastify";

const RegisterConfiguracionModal = ({ onClose }) => {
  useAuth();
  const { mutate: createConfiguracion, isLoading } = useCreateConfiguracion();

  const [formData, setFormData] = useState({
    tipo_cultivo: "",
    tipo_sensor: "",
    valor_min: "",
    valor_max: "",
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

    if (!formData.tipo_cultivo || !formData.tipo_sensor || !formData.valor_min || !formData.valor_max) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    console.log("📤 Enviando datos al backend:", formData);

    createConfiguracion(formData, {
      onSuccess: () => {
        toast.success("✅ Configuración registrada correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar configuración:", error);
        toast.error("Error al registrar configuración.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Configuración</h2>
        <form onSubmit={handleSubmit}>
          <label>Tipo de Cultivo *</label>
          <Input type="text" name="tipo_cultivo" value={formData.tipo_cultivo} onChange={handleChange} required />

          <label>Tipo de Sensor *</label>
          <Input type="text" name="tipo_sensor" value={formData.tipo_sensor} onChange={handleChange} required />

          <label>Valor Mínimo *</label>
          <Input type="number" name="valor_min" value={formData.valor_min} onChange={handleChange} required />

          <label>Valor Máximo *</label>
          <Input type="number" name="valor_max" value={formData.valor_max} onChange={handleChange} required />

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded">
              {isLoading ? "Registrando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterConfiguracionModal;

