import { useState } from "react";
import { Button, Input } from "@heroui/react";
import useAuth from "@/hooks/useAuth";
import { useCreateSensor } from "@/hooks/sensores/tipo_sensor/useCreateSensor"; 
import useFetchSensorOptions from "@/hooks/sensores/mapSensores";
import { toast } from "react-toastify";

const RegisterSensorModal = ({ onClose }) => {
  useAuth();
  const { bancales, tipoSensores, configuraciones, cultivos } = useFetchSensorOptions();
  const { mutate: createSensor, isLoading } = useCreateSensor();

  const [formData, setFormData] = useState({
    fk_bancal: "",
    fk_tipo_sensor: "",
    fk_configuracion: "",
    fk_cultivo: "",
    medicion: "",
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
    
    if (!formData.fk_bancal || !formData.fk_tipo_sensor || !formData.medicion) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    console.log("📤 Enviando datos al backend:", formData);
    
    createSensor(formData, {
      onSuccess: () => {
        toast.success("✅ Sensor registrado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar sensor:", error);
        toast.error("Error al registrar sensor.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Sensor</h2>
        <form onSubmit={handleSubmit}>
          <label>Tipo de Sensor *</label>
          <select name="fk_tipo_sensor" value={formData.fk_tipo_sensor} onChange={handleChange} required>
            <option value="">Seleccione un tipo de sensor</option>
            {tipoSensores.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.id} - {tipo.nombre}
              </option>
            ))}
          </select>

          <label>Bancal *</label>
          <select name="fk_bancal" value={formData.fk_bancal} onChange={handleChange} required>
            <option value="">Seleccione un bancal</option>
            {bancales.map((bancal) => (
              <option key={bancal.id} value={bancal.id}>
                {bancal.id} - {bancal.nombre}
              </option>
            ))}
          </select>

          <label>Configuración</label>
<select name="fk_configuracion" value={formData.fk_configuracion} onChange={handleChange}>
  <option value="">Seleccione una configuración</option>
  {configuraciones.map((config) => (
    <option key={config.id} value={config.id}>
      {config.id} - Min: {config.valor_min}, Max: {config.valor_max}
    </option>
  ))}
</select>

          <label>Cultivo</label>
          <select name="fk_cultivo" value={formData.fk_cultivo} onChange={handleChange}>
            <option value="">Seleccione un cultivo</option>
            {cultivos.map((cultivo) => (
              <option key={cultivo.id} value={cultivo.id}>
                {cultivo.id} - {cultivo.nombre}
              </option>
            ))}
          </select>

          <label>Medición *</label>
          <Input type="number" step="0.01" name="medicion" value={formData.medicion} onChange={handleChange} required />

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

export default RegisterSensorModal;
