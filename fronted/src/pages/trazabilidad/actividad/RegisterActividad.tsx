import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useCreateActividad } from "@/hooks/trazabilidad/actividad/useCreateActividad";
import useFetchActividadMap from "@/hooks/trazabilidad/actividad/ActividadMap";
import { toast } from "react-toastify";
import useAuth from "@/hooks/auth/useAuth";

const RegisterActividadModal = ({ onClose }) => {
  useAuth();
  const { usuarios, bancales, loading, error } = useFetchActividadMap();
  const { mutate: createActividad, isLoading } = useCreateActividad();

  const [formData, setFormData] = useState({
    fk_usuario: "",
    fk_bancal: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    estado: false,
  });

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
    createActividad(formData, {
      onSuccess: () => {
        toast.success("✅ Actividad registrada correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar actividad:", error);
        toast.error("Error al registrar actividad.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Actividad</h2>
        <form onSubmit={handleSubmit}>
          <label>Usuario *</label>
          <select name="fk_usuario" value={formData.fk_usuario} onChange={handleChange} required>
            <option value="">Seleccione un usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.username}
              </option>
            ))}
          </select>

          <label>Bancal *</label>
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

          <label>Fecha Inicio *</label>
          <Input type="date" name="fecha_inicio" value={formData.fecha_inicio} onChange={handleChange} required />

          <label>Fecha Fin *</label>
          <Input type="date" name="fecha_fin" value={formData.fecha_fin} onChange={handleChange} required />

          <label>
            <input type="checkbox" name="estado" checked={formData.estado} onChange={handleChange} /> Estado
          </label>

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

export default RegisterActividadModal;
