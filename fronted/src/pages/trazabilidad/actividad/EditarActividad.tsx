import { useState, useEffect } from "react";
import { useFetchActividadById } from "@/hooks/trazabilidad/actividad/useFetchActividadById";
import { useUpdateActividad } from "@/hooks/trazabilidad/actividad/useUpdateActividad";
import ActividadMap from "@/hooks/trazabilidad/actividad/ActividadMap";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import useAuth from "@/hooks/auth/useAuth";

const EditarActividadModal = ({ id, onClose }) => {
  useAuth();

  const { data: actividad, isLoading } = useFetchActividadById(id);
  const { usuarios, bancales, loading: loadingMap } = ActividadMap();
  const { mutate: updateActividad, isLoading: isUpdating } = useUpdateActividad();

  const [formData, setFormData] = useState({
    fk_usuario: "",
    fk_bancal: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    estado: false,
  });

  useEffect(() => {
    if (actividad && !isLoading) {
      setFormData({
        fk_usuario: actividad.fk_usuario ?? "",
        fk_bancal: actividad.fk_bancal ?? "",
        descripcion: actividad.descripcion ?? "",
        fecha_inicio: actividad.fecha_inicio ?? "",
        fecha_fin: actividad.fecha_fin ?? "",
        estado: actividad.estado ?? false,
      });
    }
  }, [actividad, isLoading]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fk_usuario || !formData.fk_bancal || !formData.descripcion) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    updateActividad({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Actividad actualizada correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar actividad:", error);
        toast.error("Error al actualizar actividad.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Actividad</h2>
        {isLoading || loadingMap ? (
          <p className="text-center text-gray-500">Cargando datos...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Usuario *</label>
            <br />
            <select name="fk_usuario" value={formData.fk_usuario} onChange={handleChange} required>
              <option value="">Seleccione un usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.username}
                </option>
              ))}
            </select>
              <br />
            <label>Bancal *</label>
            <br />
            <select name="fk_bancal" value={formData.fk_bancal} onChange={handleChange} required>
              <option value="">Seleccione un bancal</option>
              {bancales.map((bancal) => (
                <option key={bancal.id} value={bancal.id}>
                  {bancal.nombre}
                </option>
              ))}
            </select>

            <label>Descripción *</label>
            <Input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} required />

            <label>Fecha de Inicio *</label>
            <Input type="date" name="fecha_inicio" value={formData.fecha_inicio} onChange={handleChange} required />

            <label>Fecha de Fin *</label>
            <Input type="date" name="fecha_fin" value={formData.fecha_fin} onChange={handleChange} required />

            <div className="flex items-center gap-2">
              <label>Estado</label>
              <input type="checkbox" name="estado" checked={formData.estado} onChange={handleChange} />
            </div>

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

export default EditarActividadModal;
