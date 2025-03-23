import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useCreateEspecie } from "@/hooks/trazabilidad/especie/useCreateEspecie";
import useFetchTipoEspecieMap from "@/hooks/trazabilidad/especie/mapEspecie";
import { toast } from "react-toastify";
import useAuth from "@/hooks/auth/useAuth";

const RegisterEspecieModal = ({ onClose }) => {
  useAuth();
  const { tiposEspecie, loading, error } = useFetchTipoEspecieMap();
  const { mutate: createEspecie, isLoading } = useCreateEspecie();

  const [formData, setFormData] = useState({
    fk_tipo_especie: "",
    nombre: "",
  });
  console.log("🟢 tiposEspecie:", tiposEspecie); // <-- Aquí

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fk_tipo_especie || !formData.nombre) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    console.log("📤 Enviando datos al backend:", formData);
    
    createEspecie(formData, {
      onSuccess: () => {
        toast.success("✅ Especie registrada correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar especie:", error);
        toast.error("Error al registrar especie.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Especie</h2>
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
            <Button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded">
              {isLoading ? "Registrando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterEspecieModal;