import { useState, useEffect } from "react";
import { useFetchTipoSensorById } from "@/hooks/sensores/tipo_sensor/useFetchTipoSensorById";
import { useUpdateTipoSensor } from "@/hooks/sensores/tipo_sensor/useUpdateTipoSensor";
import { Button } from "@heroui/react";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const EditarTipoSensorModal = ({ id, onClose }) => {
  useAuth();
  
  const { data: tipoSensor, isLoading } = useFetchTipoSensorById(id);
  const { mutate: updateTipoSensor, isLoading: isUpdating } = useUpdateTipoSensor();

  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
  });

  useEffect(() => {
    if (tipoSensor && !isLoading) {
      setFormData({
        nombre: tipoSensor.nombre ?? "",
        tipo: tipoSensor.tipo ?? "",
      });
    }
  }, [tipoSensor, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    updateTipoSensor({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Tipo de sensor actualizado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar tipo de sensor:", error);
        toast.error("Error al actualizar tipo de sensor.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Tipo de Sensor</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando datos...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />

            <label>Tipo *</label>
            <textarea
              name="tipo"
              value={formData.tipo}
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

export default EditarTipoSensorModal;
