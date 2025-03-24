import { useState, useEffect } from "react";
import { useFetchSensorById } from "@/hooks/sensores/useFetchSensorById";
import { useUpdateSensor } from "@/hooks/sensores/useUpdateSensor";
import useFetchSensorOptions from "@/hooks/sensores/mapSensores";
import { Button } from "@heroui/react";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const EditarSensorModal = ({ id, onClose }) => {
  useAuth();
  
  // Obtener datos del sensor y opciones
  const { data: sensor, isLoading } = useFetchSensorById(id);
  const { bancales, tipoSensores, configuraciones, cultivos } = useFetchSensorOptions();
  const { mutate: updateSensor, isLoading: isUpdating } = useUpdateSensor();

  const [formData, setFormData] = useState({
    fk_bancal: "",
    fk_tipo_sensor: "",
    fk_configuracion: "",
    fk_cultivo: "",
    medicion: "",
  });

  useEffect(() => {
    if (sensor && !isLoading) {
      setFormData({
        fk_bancal: sensor.fk_bancal ?? "",
        fk_tipo_sensor: sensor.fk_tipo_sensor ?? "",
        fk_configuracion: sensor.fk_configuracion ?? "",
        fk_cultivo: sensor.fk_cultivo ?? "",
        medicion: sensor.medicion ?? "",
      });
    }
  }, [sensor, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateSensor({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Sensor actualizado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar sensor:", error);
        toast.error("Error al actualizar sensor.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Sensor</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando sensor...</p>
        ) : (
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
            <input
              type="number"
              step="0.01"
              name="medicion"
              value={formData.medicion}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />

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

export default EditarSensorModal;
