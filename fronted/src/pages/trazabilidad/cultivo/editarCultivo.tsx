import { useState, useEffect } from "react";
import { useFetchCultivoById } from "@/hooks/trazabilidad/cultivo/useFetchCultivoById";
import { useUpdateCultivo } from "@/hooks/trazabilidad/cultivo/useUpdateCultivo";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import useAuth from "@/hooks/auth/useAuth";


const EditarCultivoModal = ({ id, onClose }) => {
  useAuth();

  const { data: cultivo, isLoading } = useFetchCultivoById(id);
  const { mutate: updateCultivo, isLoading: isUpdating } = useUpdateCultivo();

  const [formData, setFormData] = useState({
    fk_semillero: "",
    fk_especie: "",
    nombre: "",
    descripcion: "",
    cantidad: "",
    fecha_siembra: "",
  });

  useEffect(() => {
    if (cultivo && !isLoading) {
      setFormData({
        fk_semillero: cultivo.fk_semillero ?? "",
        fk_especie: cultivo.fk_especie ?? "",
        nombre: cultivo.nombre ?? "",
        descripcion: cultivo.descripcion ?? "",
        cantidad: cultivo.cantidad ?? "",
        fecha_siembra: cultivo.fecha_siembra ?? "",
      });
    }
  }, [cultivo, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fk_semillero || !formData.fk_especie || !formData.nombre) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    updateCultivo({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Cultivo actualizado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar cultivo:", error);
        toast.error("Error al actualizar cultivo.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Cultivo</h2>
        {isLoading ? (
          <p className="text-center text-gray-500">Cargando datos...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Semillero *</label>
            <Input type="text" name="fk_semillero" value={formData.fk_semillero} onChange={handleChange} required />

            <label>Especie *</label>
            <Input type="text" name="fk_especie" value={formData.fk_especie} onChange={handleChange} required />

            <label>Nombre *</label>
            <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

            <label>Descripción</label>
            <Input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} />

            <label>Cantidad *</label>
            <Input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />

            <label>Fecha de Siembra *</label>
            <Input type="date" name="fecha_siembra" value={formData.fecha_siembra} onChange={handleChange} required />

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

export default EditarCultivoModal;
