import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useCreateTipoPlaga } from "@/hooks/trazabilidad/tipo_plaga/useCreateTipoPlaga";
import { toast } from "react-toastify";
import useAuth from "@/hooks/auth/useAuth";

const RegisterTipoPlagaModal = ({ onClose }) => {
  useAuth();
  const { mutate: createTipoPlaga, isLoading } = useCreateTipoPlaga();

  const [formData, setFormData] = useState({
    tipo: "",
    descripcion: ""
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

    if (!formData.tipo || !formData.descripcion) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    console.log("📤 Enviando datos al backend:", formData);

    createTipoPlaga(formData, {
      onSuccess: () => {
        toast.success("✅ Tipo de Plaga registrado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar Tipo de Plaga:", error);
        toast.error("Error al registrar Tipo de Plaga.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Tipo de Plaga</h2>
        <form onSubmit={handleSubmit}>
          <label>Tipo de Plaga *</label>
          <Input
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          />

          <label>Descripción *</label>
          <Input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isLoading ? "Registrando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterTipoPlagaModal;
