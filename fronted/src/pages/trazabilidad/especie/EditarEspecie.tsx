import { useState, useEffect } from "react";
import { useFetchEspecieById } from "@/hooks/trazabilidad/especie/useFetchEspecieById";
import { useUpdateEspecie } from "@/hooks/trazabilidad/especie/useUpdateEspecie";
import useFetchTipoEspecieMap from "@/hooks/trazabilidad/especie/mapEspecie";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import useAuth from "@/hooks/auth/useAuth";


const EditarEspecieModal = ({ id, onClose }) => {
  useAuth();

  const { data: especie, isLoading } = useFetchEspecieById(id);
  const { tiposEspecie, loading: loadingTipos } = useFetchTipoEspecieMap();
  const { mutate: updateEspecie, isLoading: isUpdating } = useUpdateEspecie();

  const [formData, setFormData] = useState({
    fk_tipo_especie: "",
    nombre: "",
  });

  useEffect(() => {
    if (especie && !isLoading) {
      setFormData({
        fk_tipo_especie: especie.fk_tipo_especie ?? "",
        nombre: especie.nombre ?? "",
      });
    }
  }, [especie, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fk_tipo_especie || !formData.nombre) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    updateEspecie({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Especie actualizada correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar especie:", error);
        toast.error("Error al actualizar especie.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Especie</h2>
        {isLoading || loadingTipos ? (
          <p className="text-center text-gray-500">Cargando datos...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Tipo de Especie *</label>
            <select
              name="fk_tipo_especie"
              value={formData.fk_tipo_especie}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un tipo de especie</option>
              {tiposEspecie.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.tipo}
                </option>
              ))}
            </select>

            <label>Nombre *</label>
            <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

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

export default EditarEspecieModal;
