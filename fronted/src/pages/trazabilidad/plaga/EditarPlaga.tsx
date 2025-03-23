import { useState, useEffect } from "react";
import { useFetchPlagaById } from "@/hooks/trazabilidad/plaga/useFetchPlagaById";
import { useUpdatePlaga } from "@/hooks/trazabilidad/plaga/useUpdatePlaga";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import useFetchPlagaOptions from "@/hooks/trazabilidad/plaga/Map_plaga"; 
import useAuth from "@/hooks/auth/useAuth";

const EditarPlagaModal = ({ id, onClose }) => {
  useAuth();

  const { data: plaga, isLoading } = useFetchPlagaById(id);
  const { mutate: updatePlaga, isLoading: isUpdating } = useUpdatePlaga();

  const { tiposPlaga } = useFetchPlagaOptions(); 

  const [formData, setFormData] = useState({
    nombre: "",
    fk_tipo_plaga: "",
  });

  useEffect(() => {
    // Verificamos si los datos de la plaga están disponibles
    if (plaga && !isLoading) {
      console.log("Datos de plaga:", plaga);
      setFormData({
        nombre: plaga.nombre ?? "",
        fk_tipo_plaga: plaga.fk_tipo_plaga?.id ?? "",
      });
    }
  }, [plaga, isLoading]);

  useEffect(() => {
    console.log("Estado del formData:", formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.fk_tipo_plaga) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    updatePlaga({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Plaga actualizada correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar plaga:", error);
        toast.error("Error al actualizar plaga.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Plaga</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando plaga...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Nombre *</label>
            <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            <br />
            {/* Select de Tipo de Plaga */}
            <label>Tipo de Plaga *</label>
            <br />
            <select
              name="fk_tipo_plaga"
              value={formData.fk_tipo_plaga}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar tipo de plaga</option>
              {tiposPlaga?.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
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

export default EditarPlagaModal;
