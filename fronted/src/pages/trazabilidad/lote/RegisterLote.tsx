import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useCreateLote } from "@/hooks/trazabilidad/lote/useCreateLote";
import { toast } from "react-toastify";
import useAuth from "@/hooks/auth/useAuth";

const RegisterLoteModal = ({ onClose }) => {
  useAuth();
  const { mutate: createLote, isLoading } = useCreateLote();

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    ubicacion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.descripcion || !formData.ubicacion) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    console.log("📤 Enviando datos al backend:", formData);
    
    createLote(formData, {
      onSuccess: () => {
        toast.success("✅ Lote registrado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar lote:", error);
        toast.error("Error al registrar lote.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Lote</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre *</label>
          <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          
          <label>Descripción *</label>
          <Input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} required />

          <label>Ubicación *</label>
          <Input type="number" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />
          
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

export default RegisterLoteModal;
