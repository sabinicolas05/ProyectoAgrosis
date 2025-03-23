import { useState, useEffect } from "react";
import { useFetchConfiguracionById } from "@/hooks/sensores/configuracion/useFetchConfiguracionById";
import { useUpdateConfiguracion } from "@/hooks/sensores/configuracion/useUpdateConfiguracion";
import useAuth from "@/hooks/useAuth";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";

const EditarConfiguracionModal = ({ id, onClose }) => {
  useAuth();

  // Obtener datos de la configuración
  const { data: configuracion, isLoading } = useFetchConfiguracionById(id);
  const { mutate: updateConfiguracion, isLoading: isUpdating } = useUpdateConfiguracion();

  const [formData, setFormData] = useState({
    tipo_cultivo: "",
    tipo_sensor: "",
    valor_min: "",
    valor_max: "",
  });

  useEffect(() => {
    if (configuracion && !isLoading) {
      setFormData({
        tipo_cultivo: configuracion.tipo_cultivo ?? "",
        tipo_sensor: configuracion.tipo_sensor ?? "",
        valor_min: configuracion.valor_min ?? "",
        valor_max: configuracion.valor_max ?? "",
      });
    }
  }, [configuracion, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.tipo_cultivo || !formData.tipo_sensor || !formData.valor_min || !formData.valor_max) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    updateConfiguracion({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Configuración actualizada correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar configuración:", error);
        toast.error("Error al actualizar configuración.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Configuración</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando configuración...</p>
        ) : (
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

export default EditarConfiguracionModal;
