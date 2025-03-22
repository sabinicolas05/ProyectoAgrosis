import { useState } from "react";
import { Button, Input } from "@heroui/react";
import useAuth from "@/hooks/useAuth";
import { useCreateHerramienta } from "@/hooks/inventario/herramienta/useCreateHerramienta";
import { toast } from "react-toastify";

const RegisterHerramientaModal = ({ onClose }) => {
  useAuth();
  const { mutate: createHerramienta, isLoading } = useCreateHerramienta();

  const [formData, setFormData] = useState({
    nombre: "",
    unidades: "",
    precioCU: "",
    estado: false, // Ahora es un checkbox (booleano)
    fk_tipo_herramienta: "",
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.unidades || !formData.precioCU || !formData.fk_tipo_herramienta) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    const formattedData = {
      ...formData,
      unidades: Number(formData.unidades),
      precioCU: Number(formData.precioCU),
      fk_tipo_herramienta: Number(formData.fk_tipo_herramienta),
    };

    console.log("📤 Enviando datos al backend:", formattedData);

    createHerramienta(formattedData, {
      onSuccess: () => {
        toast.success("✅ Herramienta registrada correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error en la petición:", error.response?.data || error.message);
        if (error.response?.data) {
          toast.error(`❌ Error: ${JSON.stringify(error.response.data)}`);
        } else {
          toast.error("❌ Error desconocido al registrar la herramienta.");
        }
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Herramienta</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre *</label>
          <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

          <label>Unidades *</label>
          <Input type="number" name="unidades" value={formData.unidades} onChange={handleChange} required />

          <label>Precio Unitario *</label>
          <Input type="number" step="0.01" name="precioCU" value={formData.precioCU} onChange={handleChange} required />

          <label>
            <input type="checkbox" name="estado" checked={formData.estado} onChange={handleChange} /> Activo
          </label>
          <br />
          <label>Tipo de Herramienta *</label>
          <Input type="number" name="fk_tipo_herramienta" value={formData.fk_tipo_herramienta} onChange={handleChange} required />

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

export default RegisterHerramientaModal;