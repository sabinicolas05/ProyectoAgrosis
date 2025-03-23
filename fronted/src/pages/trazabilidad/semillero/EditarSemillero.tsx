import { useState, useEffect } from "react";
import { useFetchSemilleroById } from "@/hooks/trazabilidad/semillero/useFetchSemilleroById";
import { useUpdateSemillero } from "@/hooks/trazabilidad/semillero/useUpdateSemillero";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import useFetchSemilleroOptions from "@/hooks/trazabilidad/semillero/Map.semillero"; // Importa el hook adecuado
import useAuth from "@/hooks/auth/useAuth";

const EditarSemilleroModal = ({ id, onClose }) => {
  useAuth();

  // Obtener datos del semillero
  const { data: semillero, isLoading } = useFetchSemilleroById(id);
  const { mutate: updateSemillero, isLoading: isUpdating } = useUpdateSemillero();

  // Obtener opciones para los selects (especies, lotes, etc.)
  const { especies, lotes } = useFetchSemilleroOptions(); 

  const [formData, setFormData] = useState({
    nombre_semilla: "",
    fecha_siembra: "",
    fecha_estimada: "",
    unidades: "",
    fk_especie: "",
    fk_lote: "",
  });

  useEffect(() => {
    if (semillero && !isLoading) {
      setFormData({
        nombre_semilla: semillero.nombre_semilla ?? "",
        fecha_siembra: semillero.fecha_siembra ?? "",
        fecha_estimada: semillero.fecha_estimada ?? "",
        unidades: semillero.unidades ?? "",
        fk_especie: semillero.fk_especie?.id ?? "", // Asume que tienes el ID de la especie
        fk_lote: semillero.fk_lote?.id ?? "", // Asume que tienes el ID del lote
      });
    }
  }, [semillero, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre_semilla || !formData.fecha_siembra || !formData.fecha_estimada || !formData.unidades) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    updateSemillero({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Semillero actualizado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar semillero:", error);
        toast.error("Error al actualizar semillero.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Semillero</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando semillero...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Nombre de la Semilla *</label>
            <Input type="text" name="nombre_semilla" value={formData.nombre_semilla} onChange={handleChange} required />

            <label>Fecha de Siembra *</label>
            <Input type="date" name="fecha_siembra" value={formData.fecha_siembra} onChange={handleChange} required />

            <label>Fecha Estimada *</label>
            <Input type="date" name="fecha_estimada" value={formData.fecha_estimada} onChange={handleChange} required />

            <label>Unidades *</label>
            <Input type="number" name="unidades" value={formData.unidades} onChange={handleChange} required />
            <br />
            {/* Select de Especie */}
            <label>Especie *</label>
            <br />
            <select
              name="fk_especie"
              value={formData.fk_especie}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar especie</option>
              {especies?.map((especie) => (
                <option key={especie.id} value={especie.id}>
                  {especie.nombre}
                </option>
              ))}
            </select>
                <br />
            {/* Select de Lote */}
            <label>Lote *</label>
            <br />
            <select
              name="fk_lote"
              value={formData.fk_lote}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar lote</option>
              {lotes?.map((lote) => (
                <option key={lote.id} value={lote.id}>
                  {lote.nombre}
                </option>
              ))}
            </select>

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

export default EditarSemilleroModal;
