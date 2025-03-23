import { useState, useEffect } from "react";
import { useFetchCultivoById } from "@/hooks/trazabilidad/cultivo/useFetchCultivoById"; // Asegúrate de que esta ruta esté correcta
import { useUpdateCultivo } from "@/hooks/trazabilidad/cultivo/useUpdateCultivo"; // Asegúrate de que esta ruta esté correcta
import CultivoMap from "@/hooks/trazabilidad/cultivo/CultivoMap"; // Asegúrate de que esta ruta esté correcta
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import useAuth from "@/hooks/auth/useAuth";

const EditarCultivoModal = ({ id, onClose }) => {
  useAuth();

  // Traer los datos del cultivo por ID
  const { data: cultivo, isLoading } = useFetchCultivoById(id);
  const { especies, semilleros, loading: loadingMap } = CultivoMap(); // Mapea las especies y semilleros
  const { mutate: updateCultivo, isLoading: isUpdating } = useUpdateCultivo(); // Mutación para actualizar cultivo

  const [formData, setFormData] = useState({
    fk_especie: "",
    fk_semillero: "",
    nombre: "",
    descripcion: "",
    cantidad: "",
    fecha_siembra: "",
  });

  // Actualiza el formulario con los datos de cultivo
  useEffect(() => {
    if (cultivo && !isLoading) {
      setFormData({
        fk_especie: cultivo.fk_especie ?? "",
        fk_semillero: cultivo.fk_semillero ?? "",
        nombre: cultivo.nombre ?? "",
        descripcion: cultivo.descripcion ?? "",
        cantidad: cultivo.cantidad ?? "",
        fecha_siembra: cultivo.fecha_siembra ?? "",
      });
    }
  }, [cultivo, isLoading]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!formData.fk_especie || !formData.fk_semillero || !formData.nombre) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    // Llamada para actualizar el cultivo
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
        {isLoading || loadingMap ? (
          <p className="text-center text-gray-500">Cargando datos...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Especie *</label>
            <br />
            <select name="fk_especie" value={formData.fk_especie} onChange={handleChange} required>
              <option value="">Seleccione una especie</option>
              {especies.map((especie) => (
                <option key={especie.id} value={especie.id}>
                  {especie.nombre}
                </option>
              ))}
            </select>
                <br />
            <label>Semillero *</label>
            <br />
            <select name="fk_semillero" value={formData.fk_semillero} onChange={handleChange} required>
              <option value="">Seleccione un semillero</option>
              {semilleros.map((semillero) => (
                <option key={semillero.id} value={semillero.id}>
                  {semillero.nombre_semilla}
                </option>
              ))}
            </select>
              <br />
            <label>Nombre *</label>
            <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

            <label>Descripción *</label>
            <Input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} required />

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
