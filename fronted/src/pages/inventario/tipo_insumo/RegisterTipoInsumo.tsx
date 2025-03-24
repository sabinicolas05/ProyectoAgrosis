import { useState } from "react";
import { Button, Input } from "@heroui/react";
import useAuth from "@/hooks/useAuth";
import { useCreateTipoInsumo } from "@/hooks/inventario/tipoinsumo/useCreateTipoInsumo";
import { toast } from "react-toastify";

const RegisterTipoInsumoModal = ({ onClose }) => {
  useAuth();
  const { mutate: createTipoInsumo, isLoading } = useCreateTipoInsumo();

  const [formData, setFormData] = useState({
    tipo: "",
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
    
    if (!formData.tipo) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    console.log("📤 Enviando datos al backend:", formData);
    
    createTipoInsumo(formData, {
      onSuccess: () => {
        toast.success("✅ Tipo de insumo registrado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar un tipo de insumo:", error);
        toast.error("Error al registrar un tipo de insumo.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Tipo de Insumo</h2>
        <form onSubmit={handleSubmit}>
          <label>Tipo *</label>
          <Input type="text" name="tipo" value={formData.tipo} onChange={handleChange} required />
          
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

export default RegisterTipoInsumoModal;